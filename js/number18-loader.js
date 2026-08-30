// №18. Загрузка задач на клетчатой бумаге.
(function(){
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
  (async()=>{
    try{
      await load('js/number18-data.js?v=20260830-n18-1');
      await load('js/number18-analogs.js?v=20260830-n18-1');
      await load('js/number18-analogs-part2.js?v=20260830-n18-1');
      await load('js/number18-analogs-part3.js?v=20260830-n18-1');
      await load('js/ordinary-print-image-fix.js?v=20260830-print-images-4');
      if(typeof window.hydrateVariant==='function')window.hydrateVariant();
      if(typeof window.renderBank==='function')window.renderBank();
      if(typeof window.renderBuilderBank==='function')window.renderBuilderBank();
      if(typeof window.renderPreview==='function'&&Array.isArray(window.variant)&&window.variant.length)window.renderPreview();
      if(typeof window.typesetMathOGE==='function')window.typesetMathOGE();
      if(typeof window.updateCounters==='function')window.updateCounters();
    }catch(e){console.error('Не удалось загрузить №18',e);}
  })();
})();
