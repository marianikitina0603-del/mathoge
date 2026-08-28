// Дополнительные режимы печати: клетка для решения и 2 страницы заданий на листе.
(function(){
  function addPrintableGridFix(){
    const style=document.createElement('style');
    style.textContent=`
      #previewList .solution-grid-svg{display:none;width:100%;height:90px;margin:8px 0 4px;border:1px solid #b8b8b8;background:#fff}
      #previewList .solution-grid-answer{display:none;font:8.5pt 'Times New Roman',serif;margin-top:-21px;margin-left:8px;margin-bottom:8px;background:#fff;width:max-content;padding:0 4px;position:relative;z-index:2}
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

  function setupTwoUp(){
    const btn=document.getElementById('printTasksTwoUp');
    if(!btn)return;
    btn.addEventListener('click',()=>{
      if(typeof window.renderPreview==='function')window.renderPreview();
      const source=document.getElementById('examPaper');
      if(!source)return;
      const clone=source.cloneNode(true);
      clone.querySelectorAll('.teacher-answer-page,.solution-grid,.solution-grid-svg,.solution-grid-answer,.answer-line').forEach(el=>el.remove());
      const content=clone.querySelector('#previewList');
      const head=clone.querySelector('.exam-head');
      const blocks=content?[...content.children]:[];
      const pages=[];let page=document.createElement('section');page.className='two-up-page';
      if(head)page.appendChild(head.cloneNode(true));
      let used=0;
      blocks.forEach(block=>{
        const copy=block.cloneNode(true);
        const weight=Math.max(1,copy.querySelectorAll('.preview-task').length)+(copy.textContent||'').length/1500;
        if(used>0&&used+weight>4.7){pages.push(page);page=document.createElement('section');page.className='two-up-page';used=0;}
        page.appendChild(copy);used+=weight;
      });
      if(page.children.length)pages.push(page);

      const iframe=document.createElement('iframe');
      iframe.setAttribute('aria-hidden','true');
      iframe.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
      document.body.appendChild(iframe);
      const d=iframe.contentDocument;
      const css=`@page{size:A4 landscape;margin:7mm}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#111}body{display:grid;grid-template-columns:1fr 1fr;column-gap:8mm;align-items:start}.two-up-page{width:100%;min-width:0;padding:0 2mm 0 0;break-inside:avoid;page-break-inside:avoid}.two-up-page:nth-child(2n){border-left:1px dashed #aaa;padding-left:6mm;padding-right:0}.two-up-page:nth-child(2n+1):not(:first-child){break-before:page;page-break-before:always}.exam-head{display:flex;justify-content:space-between;gap:8px;border-bottom:1px solid #aaa;padding-bottom:4px;margin-bottom:6px}.exam-kicker{font-size:6.5pt}.exam-head h2{font-size:10pt;margin:1px 0}.exam-meta{font-size:6.5pt}.preview-practical-block{border:0;margin:0 0 5px}.preview-practical-head{font-size:7.2pt;font-weight:bold;padding:2px 0}.preview-practical-context{padding:2px 0 4px}.preview-practical-context-grid{display:grid;grid-template-columns:minmax(0,1fr) 32%;gap:4mm}.preview-practical-context-copy{font-size:6.7pt;line-height:1.18}.preview-plan{padding:2px;border:1px solid #bbb;text-align:center}.preview-plan-title{font-size:5.5pt}.preview-plan img{display:block;max-width:100%;max-height:95px;margin:auto;object-fit:contain}.preview-practical-tasks{padding:0}.preview-task{display:grid;grid-template-columns:15px 1fr;gap:3px;padding:3px 0;border-bottom:1px solid #bbb;break-inside:avoid;page-break-inside:avoid}.preview-task-number{font-size:7pt;font-weight:bold}.preview-task h4{font-size:7pt;margin:0 0 1px}.task-math{font-size:7pt!important;line-height:1.18!important;margin:0!important}.route-data-table,table{width:100%!important;border-collapse:collapse!important;table-layout:fixed!important;font-size:5.8pt!important;margin:2px 0!important}.route-data-table th,.route-data-table td,table th,table td{border:1px solid #555!important;padding:1px 2px!important;font-size:5.8pt!important;line-height:1.05!important;overflow-wrap:anywhere}.preview-table-scroll{overflow:visible}.stove-task-diagram img{max-height:95px!important;width:auto!important;max-width:100%!important}.teacher-answer-page,.solution-grid,.solution-grid-svg,.solution-grid-answer,.answer-line{display:none!important}`;
      d.open();d.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Печать заданий</title><style>${css}</style></head><body>${pages.map(p=>p.outerHTML).join('')}</body></html>`);d.close();
      setTimeout(()=>{try{iframe.contentWindow.focus();iframe.contentWindow.print();}finally{setTimeout(()=>iframe.remove(),1200);}},400);
    });
  }

  addPrintableGridFix();
  setupTwoUp();
})();