// №25. Загрузка задач повышенной сложности и увеличенное поле для развёрнутого решения.
(function(){
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
  const style=document.createElement('style');
  style.textContent=`
    @media print{
      #previewList .preview-task[data-task-number="25"] .solution-grid{height:330px!important;margin-top:12px!important}
      #previewList .preview-task[data-task-number="25"] .solution-grid:after{content:'Решение';top:1.5mm;bottom:auto;left:2mm;font:8.5pt 'Times New Roman',serif;background:#fff;padding:0 1mm}
    }
  `;
  document.head.appendChild(style);
  (async()=>{
    try{
      await load('js/number25-data.js?v=20260830-n25-1');
      await load('js/number25-analogs.js?v=20260830-n25-1');
      await load('js/number25-analogs-part2.js?v=20260830-n25-1');
      await load('js/number25-analogs-part3.js?v=20260830-n25-1');
      await load('js/number25-analogs-part4.js?v=20260830-n25-1');
      await load('js/number25-analogs-part5.js?v=20260830-n25-1');
      await load('js/number25-analogs-part6.js?v=20260830-n25-1');
      if(typeof window.hydrateVariant==='function')window.hydrateVariant();
      if(typeof window.renderBank==='function')window.renderBank();
      if(typeof window.renderBuilderBank==='function')window.renderBuilderBank();
      if(typeof window.renderPreview==='function'&&Array.isArray(window.variant)&&window.variant.length)window.renderPreview();
      if(typeof window.typesetMathOGE==='function')window.typesetMathOGE();
      if(typeof window.updateCounters==='function')window.updateCounters();
    }catch(e){console.error('Не удалось загрузить №25',e);}
  })();
})();
