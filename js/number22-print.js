// №22. Дополнительное место для построения графика в печатной версии.
// После загрузки №22 этот файл также подключает банк задания №23.
(function(){
  const style=document.createElement('style');
  style.textContent=`
    #previewList .preview-task[data-task-number="22"] .solution-grid-svg{height:260px}
    @media print{
      #previewList .preview-task[data-task-number="22"] .solution-grid{height:260px!important}
      #previewList .preview-task[data-task-number="22"] .solution-grid-svg{height:260px!important}
    }
  `;
  document.head.appendChild(style);

  const load=src=>new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=src;
    s.async=true;
    s.onload=resolve;
    s.onerror=reject;
    document.body.appendChild(s);
  });

  (async()=>{
    try{
      const files=[
        'js/number23-data.js?v=20260830-n23-1',
        'js/number23-analogs.js?v=20260830-n23-1',
        'js/number23-analogs-part2.js?v=20260830-n23-1',
        'js/number23-analogs-part3.js?v=20260830-n23-1',
        'js/number23-analogs-part4.js?v=20260830-n23-1',
        'js/number23-analogs-part5.js?v=20260830-n23-1'
      ];
      for(const src of files)await load(src);
      if(typeof window.hydrateVariant==='function')window.hydrateVariant();
      if(typeof window.renderBank==='function')window.renderBank();
      if(typeof window.renderBuilderBank==='function')window.renderBuilderBank();
      if(typeof window.typesetMathOGE==='function')window.typesetMathOGE();
      if(typeof window.updateCounters==='function')window.updateCounters();
    }catch(e){
      console.error('Не удалось загрузить №23',e);
    }
  })();
})();
