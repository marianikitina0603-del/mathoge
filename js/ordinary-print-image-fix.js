// Изолированная печать варианта с решением.
// Печатаем не живую страницу, а отдельный iframe-клон и нормализуем рисунки прямо в нём.
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

  function important(el,name,value){
    if(el)el.style.setProperty(name,value,'important');
  }

  function normalizePrintedDiagrams(d){
    // №11: графики остаются отдельным компактным блоком.
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

    // №15–18: рисунок всегда первым в блоке и плавает справа.
    d.querySelectorAll('#examPaper .number15-task-layout,#examPaper .number16-task-layout,#examPaper .number17-task-layout,#examPaper .number18-task-layout').forEach(layout=>{
      const img=layout.querySelector('.number15-diagram,.number16-diagram,.number17-diagram,.number18-diagram');
      if(img && layout.firstElementChild!==img)layout.insertBefore(img,layout.firstElementChild);
      important(layout,'display','flow-root');
      important(layout,'min-width','0');
      important(layout,'width','100%');
    });

    d.querySelectorAll('#examPaper .number15-diagram,#examPaper .number16-diagram,#examPaper .number17-diagram,#examPaper .number18-diagram').forEach(img=>{
      // Полностью сбрасываем размеры, которые могли прийти из экранных/grid-стилей.
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

      const overrides=`
        @page{size:A4 portrait;margin:9mm}
        html,body{margin:0!important;padding:0!important;background:#fff!important}
        body{width:auto!important}
        .app-shell,.sidebar,.topbar,.preview-toolbar{display:none!important}
        #examPaper{display:block!important;width:auto!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;background:#fff!important}
        #previewList{display:block!important}
        #previewList .preview-task{break-inside:avoid!important;page-break-inside:avoid!important}
        #examPaper .solution-grid{display:block!important}
        #examPaper .teacher-answer-page{display:block!important}
        #examPaper .answer-line{display:none!important}
      `;

      d.open();
      d.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8">${links}${styles}<style>${overrides}</style></head><body><div style="display:none" aria-hidden="true">${mathCache}</div>${clone.outerHTML}</body></html>`);
      d.close();

      // ВАЖНО: нормализуем уже реальный DOM печатного iframe после подключения всех стилей.
      normalizePrintedDiagrams(d);
      await waitForImages(d);
      // Повторяем после загрузки SVG/PNG: некоторые браузеры пересчитывают intrinsic size.
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
