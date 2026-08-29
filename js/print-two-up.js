// Дополнительные режимы печати: клетка для решения и 2 страницы заданий на листе.
(function(){
  const FONT_STORAGE_KEY='mathoge-selected-font';

  function getSelectedFont(){
    const select=document.getElementById('fontSelect');
    return (select&&select.value)||getComputedStyle(document.body).fontFamily||'Arial, sans-serif';
  }

  function applySelectedFont(font){
    if(!font)return;
    document.documentElement.style.setProperty('--selected-font',font);
    document.body.style.fontFamily=font;
    try{localStorage.setItem(FONT_STORAGE_KEY,font);}catch(e){}
  }

  function setupFontSelection(){
    const select=document.getElementById('fontSelect');
    if(!select)return;

    // Noto Sans JP предназначен прежде всего для японского набора и в этом проекте
    // отдельно не подключён. Убираем его, чтобы в списке оставались надёжные
    // кириллические варианты.
    [...select.options].forEach(option=>{
      if(/Noto Sans JP/i.test(option.textContent)||/Noto Sans JP/i.test(option.value))option.remove();
    });

    let saved='';
    try{saved=localStorage.getItem(FONT_STORAGE_KEY)||'';}catch(e){}
    if(saved&&[...select.options].some(option=>option.value===saved))select.value=saved;

    applySelectedFont(select.value);
    select.addEventListener('change',()=>applySelectedFont(select.value));

    const printStyle=document.createElement('style');
    printStyle.textContent=`
      @media print{
        html,body,#examPaper,#examPaper *{font-family:var(--selected-font, Arial, sans-serif)!important}
        #examPaper mjx-container,#examPaper mjx-container *{font-family:initial!important}
      }
    `;
    document.head.appendChild(printStyle);
  }

  async function preparePrintMath(root){
    if(!root||(!root.textContent.includes('\\(')&&!root.querySelector('mjx-container')))return;
    // Даём запланированному typeset после renderPreview начать обработку.
    await new Promise(resolve=>requestAnimationFrame(resolve));
    const mj=window.MathJax;
    if(mj&&mj.startup&&mj.startup.promise)await mj.startup.promise;
    if(!mj||typeof mj.typesetPromise!=='function')throw new Error('MathJax ещё не загружен');
    await mj.typesetPromise([root]);
    if(root.querySelector('[data-mml-node="merror"],mjx-merror'))throw new Error('Ошибка математической формулы');
  }
  async function prepareSourceDiagrams(root){
    if(!root)return;
    await Promise.all([...root.querySelectorAll('img.number10-diagram,img.number11-diagram,img.number13-diagram')].map(async img=>{
      img.loading='eager';
      if(!img.complete)await new Promise((resolve,reject)=>{
        const finish=err=>{clearTimeout(timer);img.removeEventListener('load',loaded);img.removeEventListener('error',failed);err?reject(err):resolve();};
        const loaded=()=>finish();
        const failed=()=>finish(new Error('Не загружен рисунок задания: '+img.getAttribute('src')));
        const timer=setTimeout(failed,15000);
        img.addEventListener('load',loaded,{once:true});img.addEventListener('error',failed,{once:true});
        if(img.complete)loaded();
      });
      if(!img.naturalWidth)throw new Error('Рисунок задания недоступен: '+img.getAttribute('src'));
      if(typeof img.decode==='function')await img.decode();
    }));
  }
  function printError(err){
    console.error('Не удалось подготовить задания к печати',err);
    if(typeof toast==='function')toast('Формулы или рисунки ещё не готовы к печати. Дождитесь загрузки и повторите.');
  }

  function addPrintableGridFix(){
    const style=document.createElement('style');
    style.textContent=`
      #previewList .solution-grid-svg{display:none;width:100%;height:90px;margin:8px 0 4px;border:1px solid #b8b8b8;background:#fff}
      #previewList .solution-grid-answer{display:none;font-family:var(--selected-font, Arial, sans-serif);font-size:8.5pt;margin-top:-21px;margin-left:8px;margin-bottom:8px;background:#fff;width:max-content;padding:0 4px;position:relative;z-index:2}
      @media print{
        #previewList .solution-grid{display:none!important}
        #previewList .solution-grid-svg{display:block!important;break-inside:avoid!important;page-break-inside:avoid!important}
        #previewList .solution-grid-answer{display:block!important}
      }
    `;
    document.head.appendChild(style);

    function patch(){
      document.querySelectorAll('#previewList .solution-grid').forEach(grid=>{
        if(grid.dataset.printGridPatched)return;
        grid.dataset.printGridPatched='1';
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('class','solution-grid-svg');
        svg.setAttribute('viewBox','0 0 180 45');
        svg.setAttribute('preserveAspectRatio','none');
        let lines='';
        for(let x=0;x<=180;x+=5)lines+=`<line x1="${x}" y1="0" x2="${x}" y2="45" stroke="#c8c8c8" stroke-width="0.35"/>`;
        for(let y=0;y<=45;y+=5)lines+=`<line x1="0" y1="${y}" x2="180" y2="${y}" stroke="#c8c8c8" stroke-width="0.35"/>`;
        svg.innerHTML=lines;
        const answer=document.createElement('div');answer.className='solution-grid-answer';answer.textContent='Ответ: ____________________';
        grid.insertAdjacentElement('afterend',svg);svg.insertAdjacentElement('afterend',answer);
      });
    }
    patch();
    new MutationObserver(patch).observe(document.getElementById('previewList')||document.body,{childList:true,subtree:true});
  }

  function compactPracticalPrintLayout(root){
    if(!root)return;
    root.querySelectorAll('.preview-practical-context-grid').forEach(grid=>{
      const plan=grid.querySelector('.preview-plan');
      const copy=grid.querySelector('.preview-practical-context-copy');
      // Для печати рисунок должен идти первым: тогда float позволяет тексту
      // заполнить место слева от картинки и продолжиться на всю ширину ниже неё.
      if(plan&&copy&&plan.nextElementSibling!==copy)grid.insertBefore(plan,copy);
      else if(plan&&copy&&grid.firstElementChild!==plan)grid.insertBefore(plan,copy);
    });
  }

  function setupTwoUp(){
    const btn=document.getElementById('printTasksTwoUp');
    if(!btn)return;
    btn.addEventListener('click',async()=>{
      if(btn.disabled)return;
      btn.disabled=true;
      try{
      if(typeof window.renderPreview==='function')window.renderPreview();
      const source=document.getElementById('examPaper');
      if(!source)return;
      await preparePrintMath(source);
      await prepareSourceDiagrams(source);
      const clone=source.cloneNode(true);
      clone.querySelectorAll('.teacher-answer-page,.solution-grid,.solution-grid-svg,.solution-grid-answer,.answer-line').forEach(el=>el.remove());
      compactPracticalPrintLayout(clone);
      const content=clone.querySelector('#previewList');
      const head=clone.querySelector('.exam-head');
      const blocks=content?[...content.children]:[];
      const pages=[];let page=document.createElement('section');page.className='two-up-page';
      if(head)page.appendChild(head.cloneNode(true));
      let used=0;
      blocks.forEach(block=>{
        const copy=block.cloneNode(true);
        // Исходные рисунки №10–11 и координатные прямые №13 занимают дополнительное место.
        const weight=Math.max(1,copy.querySelectorAll('.preview-task').length)+(copy.textContent||'').length/1500+2*copy.querySelectorAll('img.number10-diagram,img.number11-diagram,img.number13-diagram').length;
        if(used>0&&used+weight>4.7){pages.push(page);page=document.createElement('section');page.className='two-up-page';used=0;}
        page.appendChild(copy);used+=weight;
      });
      if(page.children.length)pages.push(page);

      const iframe=document.createElement('iframe');
      iframe.setAttribute('aria-hidden','true');
      iframe.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
      document.body.appendChild(iframe);
      const d=iframe.contentDocument;
      const printFont=getSelectedFont();
      const css=`@page{size:A4 landscape;margin:7mm}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:${printFont};color:#111}body{display:grid;grid-template-columns:1fr 1fr;column-gap:8mm;align-items:start}.two-up-page{width:100%;min-width:0;padding:0 2mm 0 0;break-inside:avoid;page-break-inside:avoid}.two-up-page:nth-child(2n){border-left:1px dashed #aaa;padding-left:6mm;padding-right:0}.two-up-page:nth-child(2n+1):not(:first-child){break-before:page;page-break-before:always}.exam-head{display:flex;justify-content:space-between;gap:8px;border-bottom:1px solid #aaa;padding-bottom:4px;margin-bottom:6px}.exam-kicker{font-size:6.5pt}.exam-head h2{font-size:10pt;margin:1px 0}.exam-meta{font-size:6.5pt}.preview-practical-block{border:0;margin:0 0 5px}.preview-practical-head{font-size:7.2pt;font-weight:bold;padding:2px 0}.preview-practical-context{padding:2px 0 4px;display:flow-root}.preview-practical-context-grid{display:block}.preview-practical-context-grid::after{content:'';display:block;clear:both}.preview-practical-context-copy{display:block;font-size:6.7pt;line-height:1.18;min-width:0}.preview-plan{float:right;width:max-content;max-width:34%;margin:0 0 2mm 4mm;padding:2px;border:1px solid #bbb;text-align:center;break-inside:avoid;page-break-inside:avoid}.preview-plan-title{font-size:5.5pt;white-space:normal}.preview-plan img{display:block;width:auto;height:auto;max-width:100%;max-height:95px;margin:auto;object-fit:contain}.preview-practical-context-copy .route-data-table,.preview-practical-context-copy table{clear:both}.preview-practical-tasks{padding:0;clear:both}.preview-task{display:grid;grid-template-columns:15px 1fr;gap:3px;padding:3px 0;border-bottom:1px solid #bbb;break-inside:avoid;page-break-inside:avoid}.preview-task-number{font-size:7pt;font-weight:bold}.preview-task h4{font-size:7pt;margin:0 0 1px}.task-math{font-size:7pt!important;line-height:1.18!important;margin:0!important}.route-data-table,table{width:100%!important;border-collapse:collapse!important;table-layout:fixed!important;font-size:5.8pt!important;margin:2px 0!important}.route-data-table th,.route-data-table td,table th,table td{border:1px solid #555!important;padding:1px 2px!important;font-size:5.8pt!important;line-height:1.05!important;overflow-wrap:anywhere}.preview-table-scroll{overflow:visible}.stove-task-diagram img{max-height:95px!important;width:auto!important;max-width:100%!important}.teacher-answer-page,.solution-grid,.solution-grid-svg,.solution-grid-answer,.answer-line{display:none!important}`;
      // SVG-формулы с fontCache:'global' ссылаются на определения в родительском
      // документе. Переносим их и стили MathJax вместе с готовыми формулами.
      const mathStyles=document.getElementById('MJX-SVG-styles')?.outerHTML||'';
      const mathCache=document.getElementById('MJX-SVG-global-cache')?.outerHTML||'';
      const diagramCss='.number10-diagram,.number11-diagram,.number13-diagram{display:block;width:auto;height:auto;max-width:65mm;max-height:37mm;object-fit:contain;margin:2mm auto;break-inside:avoid;page-break-inside:avoid}.number13-condition-diagram{max-height:13mm}.number13-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 3mm;margin:1mm 0;font-size:6.5pt}.number11-options{display:flex;gap:3mm;justify-content:space-between;flex-wrap:wrap}.number11-section-title{font-weight:700;font-size:6.5pt;margin:1mm 0}.number11-answer-note{margin:1mm 0 0}';
      d.open();d.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Печать заданий</title><style>${css}${diagramCss}</style>${mathStyles}</head><body><div style="display:none" aria-hidden="true">${mathCache}</div>${pages.map(p=>p.outerHTML).join('')}</body></html>`);d.close();
      try{await prepareSourceDiagrams(d);}catch(err){iframe.remove();throw err;}
      setTimeout(()=>{try{iframe.contentWindow.focus();iframe.contentWindow.print();}finally{setTimeout(()=>iframe.remove(),1200);}},400);
      }catch(err){printError(err);}finally{btn.disabled=false;}
    });
  }

  setupFontSelection();
  addPrintableGridFix();
  setupTwoUp();
  const printButton=document.getElementById('printVariant');
  if(printButton)printButton.onclick=async()=>{
    if(printButton.disabled)return;
    printButton.disabled=true;
    try{const source=document.getElementById('examPaper');await preparePrintMath(source);await prepareSourceDiagrams(source);window.print();}
    catch(err){printError(err);}finally{printButton.disabled=false;}
  };
})();
