// №24. Загрузка доказательных задач и специальное оформление предпросмотра/печати.
(function(){
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
  const style=document.createElement('style');
  style.textContent=`
    #previewList .preview-task[data-task-number="24"] .answer-line{display:none!important}
    @media print{
      #previewList .preview-task[data-task-number="24"] .solution-grid{height:330px!important;margin-top:12px!important}
      #previewList .preview-task[data-task-number="24"] .solution-grid:after{content:'Доказательство';top:1.5mm;bottom:auto;left:2mm;font:8.5pt 'Times New Roman',serif;background:#fff;padding:0 1mm}
    }
  `;
  document.head.appendChild(style);

  function adaptPreview(){
    document.querySelectorAll('#previewList .preview-task[data-task-number="24"]').forEach(card=>{
      card.classList.add('proof-task');
      card.querySelector('.answer-line')?.remove();
    });
    const page=document.querySelector('#previewList .teacher-answer-page');
    if(page){
      page.querySelectorAll('tbody tr').forEach(row=>{
        const id=row.cells?.[1]?.textContent?.trim()||'';
        if(/^24\./.test(id)&&row.cells?.[2])row.cells[2].textContent='Развёрнутое доказательство';
      });
    }
  }

  function installPreviewHook(){
    const base=window.renderPreview;
    if(typeof base!=='function'||base.__number24Wrapped)return;
    const wrapped=function(){const result=base.apply(this,arguments);adaptPreview();return result;};
    wrapped.__number24Wrapped=true;
    window.renderPreview=wrapped;
  }

  installPreviewHook();
  setTimeout(installPreviewHook,0);
  setTimeout(installPreviewHook,500);

  (async()=>{
    try{
      await load('js/number24-data.js?v=20260830-n24-1');
      await load('js/number24-analogs.js?v=20260830-n24-1');
      installPreviewHook();
      if(typeof window.hydrateVariant==='function')window.hydrateVariant();
      if(typeof window.renderBank==='function')window.renderBank();
      if(typeof window.renderBuilderBank==='function')window.renderBuilderBank();
      if(typeof window.renderPreview==='function'&&Array.isArray(window.variant)&&window.variant.length)window.renderPreview();
      if(typeof window.typesetMathOGE==='function')window.typesetMathOGE();
      if(typeof window.updateCounters==='function')window.updateCounters();
      adaptPreview();
    }catch(e){console.error('Не удалось загрузить №24',e);}
  })();
})();