// Изолированная печать варианта с решением.
// Печатаем отдельный iframe-клон: MathJax готовим до клонирования,
// а для решения оставляем только одно SVG-поле в клетку.
(function(){
  if(window.__ordinaryPrintIframeInstalled)return;
  window.__ordinaryPrintIframeInstalled=true;

  function waitForImages(root){
    const images=[...root.querySelectorAll('img')];
    return Promise.all(images.map(img=>new Promise(resolve=>{
      img.loading='eager';
      if(img.complete)return resolve();
      const done=()=>{img.removeEventListener('load',done);img.removeEventListener('error',done);resolve();};
      img.addEventListener('load',done,{once:true});
      img.addEventListener('error',done,{once:true});
      setTimeout(done,10000);
    })));
  }

  async function prepareMath(root){
    if(!root)return;
    const mj=window.MathJax;
    if(!mj)return;
    if(mj.startup&&mj.startup.promise){
      try{await mj.startup.promise;}catch(e){}
    }
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    if(typeof mj.typesetPromise==='function'){
      try{await mj.typesetPromise([root]);}catch(e){console.warn('MathJax print typeset',e);}
    }
    await new Promise(resolve=>requestAnimationFrame(resolve));
  }

  function ensureSolutionSvgs(root){
    if(!root)return;
    root.querySelectorAll('.solution-grid').forEach(grid=>{
      let svg=grid.nextElementSibling;
      if(svg?.classList?.contains('solution-grid-svg'))return;
      svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','solution-grid-svg');
      svg.setAttribute('viewBox','0 0 180 45');
      svg.setAttribute('preserveAspectRatio','none');
      let lines='';
      for(let x=0;x<=180;x+=5)lines+=`<line x1="${x}" y1="0" x2="${x}" y2="45" stroke="#c8c8c8" stroke-width="0.35"/>`;
      for(let y=0;y<=45;y+=5)lines+=`<line x1="0" y1="${y}" x2="180" y2="${y}" stroke="#c8c8c8" stroke-width="0.35"/>`;
      svg.innerHTML=lines;
      const answer=document.createElement('div');
      answer.className='solution-grid-answer';
      answer.textContent='Ответ: ____________________';
      grid.insertAdjacentElement('afterend',svg);
      svg.insertAdjacentElement('afterend',answer);
    });
  }

  function important(el,name,value){
    if(el)el.style.setProperty(name,value,'important');
  }

  function normalizePrintedDiagrams(d){
    d.querySelectorAll('#examPaper .number11-diagram').forEach(img=>{
      important(img,'display','block');
      important(img,'float','none');
      important(img,'width','auto');
      important(img,'height','auto');
      important(img,'max-width','68mm');
      important(img,'max-height','35mm');
      important(img,'object-fit','contain');
      important(img,'object-position','center');
      important(img,'margin','2mm auto');
    });

    d.querySelectorAll('#examPaper .number15-task-layout,#examPaper .number16-task-layout,#examPaper .number17-task-layout,#examPaper .number18-task-layout').forEach(layout=>{
      const img=layout.querySelector('.number15-diagram,.number16-diagram,.number17-diagram,.number18-diagram');
      if(img && layout.firstElementChild!==img)layout.insertBefore(img,layout.firstElementChild);
      important(layout,'display','flow-root');
      important(layout,'min-width','0');
      important(layout,'width','100%');
    });

    d.querySelectorAll('#examPaper .number15-diagram,#examPaper .number16-diagram,#examPaper .number17-diagram,#examPaper .number18-diagram').forEach(img=>{
      img.removeAttribute('width');
      img.removeAttribute('height');
      important(img,'float','right');
      important(img,'display','block');
      important(img,'width','38mm');
      important(img,'height','28mm');
      important(img,'min-width','0');
      important(img,'min-height','0');
      important(img,'max-width','38mm');
      important(img,'max-height','28mm');
      important(img,'object-fit','contain');
      important(img,'object-position','center');
      important(img,'margin','0 0 2mm 4mm');
      important(img,'break-inside','avoid');
      important(img,'page-break-inside','avoid');
    });
  }

  async function printWithSolutions(){
    const source=document.getElementById('examPaper');
    if(!source)return;

    try{
      await prepareMath(source);
      ensureSolutionSvgs(source);
    }catch(e){console.warn('Подготовка предпросмотра к печати',e);}

    const iframe=document.createElement('iframe');
    iframe.setAttribute('aria-hidden','true');
    iframe.style.cssText='position:fixed;left:-400mm;top:0;width:210mm;height:297mm;border:0;visibility:hidden;pointer-events:none;';
    document.body.appendChild(iframe);

    try{
      const d=iframe.contentDocument;
      const clone=source.cloneNode(true);
      const styles=[...document.querySelectorAll('style')].map(s=>s.outerHTML).join('');
      const links=[...document.querySelectorAll('link[rel="stylesheet"]')].map(l=>l.outerHTML).join('');
      const mathCache=document.getElementById('MJX-SVG-global-cache')?.outerHTML||'';
      const mathStyles=document.getElementById('MJX-SVG-styles')?.outerHTML||'';

      const overrides=`
        @page{size:A4 portrait;margin:9mm}
        html,body{margin:0!important;padding:0!important;background:#fff!important}
        body{width:auto!important}
        .app-shell,.sidebar,.topbar,.preview-toolbar{display:none!important}
        #examPaper{display:block!important;width:auto!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;background:#fff!important}
        #previewList{display:block!important}
        #previewList .preview-task{break-inside:avoid!important;page-break-inside:avoid!important}

        #examPaper .solution-grid{display:none!important}
        #examPaper .solution-grid-svg{
          display:block!important;
          width:100%!important;
          height:90px!important;
          margin:8px 0 4px!important;
          border:1px solid #b8b8b8!important;
          background:#fff!important;
          break-inside:avoid!important;
          page-break-inside:avoid!important;
        }
        #examPaper .preview-task[data-task-number="21"] .solution-grid-svg{height:180px!important}

        /* №20–25: каждое задание получает отдельную страницу с большим полем для решения. */
        #examPaper .preview-task[data-task-number="20"],
        #examPaper .preview-task[data-task-number="21"],
        #examPaper .preview-task[data-task-number="22"],
        #examPaper .preview-task[data-task-number="23"],
        #examPaper .preview-task[data-task-number="24"],
        #examPaper .preview-task[data-task-number="25"]{
          break-before:page!important;
          page-break-before:always!important;
          break-after:page!important;
          page-break-after:always!important;
          break-inside:auto!important;
          page-break-inside:auto!important;
        }
        #examPaper .preview-task[data-task-number="20"] .solution-grid-svg,
        #examPaper .preview-task[data-task-number="21"] .solution-grid-svg,
        #examPaper .preview-task[data-task-number="22"] .solution-grid-svg,
        #examPaper .preview-task[data-task-number="23"] .solution-grid-svg,
        #examPaper .preview-task[data-task-number="24"] .solution-grid-svg,
        #examPaper .preview-task[data-task-number="25"] .solution-grid-svg{
          height:225mm!important;
          margin-top:5mm!important;
        }

        #examPaper .solution-grid-answer{
          display:block!important;
          font-size:8.5pt!important;
          margin-top:-21px!important;
          margin-left:8px!important;
          margin-bottom:8px!important;
          background:#fff!important;
          width:max-content!important;
          padding:0 4px!important;
          position:relative!important;
          z-index:2!important;
        }
        #examPaper .teacher-answer-page{display:block!important}
        #examPaper .answer-line{display:none!important}

        #examPaper mjx-container{visibility:visible!important;opacity:1!important}
        #examPaper mjx-container[jax="SVG"]{display:inline-block!important;max-width:100%!important}
        #examPaper mjx-container[display="true"]{display:block!important}
      `;

      d.open();
      d.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8">${links}${styles}${mathStyles}<style>${overrides}</style></head><body><div style="display:none" aria-hidden="true">${mathCache}</div>${clone.outerHTML}</body></html>`);
      d.close();

      normalizePrintedDiagrams(d);
      await waitForImages(d);
      normalizePrintedDiagrams(d);

      if(d.fonts&&d.fonts.ready){try{await d.fonts.ready;}catch(e){}}
      await new Promise(resolve=>(iframe.contentWindow.requestAnimationFrame||requestAnimationFrame)(()=>resolve()));
      normalizePrintedDiagrams(d);

      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(()=>iframe.remove(),1500);
    }catch(err){
      iframe.remove();
      console.error('Не удалось подготовить печать с решением',err);
      if(typeof toast==='function')toast('Не удалось подготовить печать. Повторите ещё раз.');
    }
  }

  document.addEventListener('click',event=>{
    const btn=event.target.closest('#printVariant');
    if(!btn)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    printWithSolutions();
  },true);
})();
