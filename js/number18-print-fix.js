// №18: компактный рисунок только в режиме «Только задания · 2 на листе».
// В обычный предпросмотр и «Печать с решением» стили не протекают.
(function(){
  let twoUpActive=false;
  let observer=null;

  function patchNumber18ForTwoUp(){
    if(!twoUpActive)return;
    document.querySelectorAll('#previewList .number18-task-layout').forEach(layout=>{
      layout.dataset.twoUpNumber18='1';
      layout.style.setProperty('display','flow-root','important');
      layout.style.setProperty('min-width','0','important');
    });
    document.querySelectorAll('#previewList .number18-diagram').forEach(img=>{
      img.dataset.twoUpNumber18='1';
      img.style.setProperty('float','right','important');
      img.style.setProperty('display','block','important');
      img.style.setProperty('width','26mm','important');
      img.style.setProperty('height','20mm','important');
      img.style.setProperty('max-width','34%','important');
      img.style.setProperty('max-height','20mm','important');
      img.style.setProperty('object-fit','contain','important');
      img.style.setProperty('object-position','center','important');
      img.style.setProperty('margin','0 0 1mm 2mm','important');
      img.style.setProperty('break-inside','avoid','important');
      img.style.setProperty('page-break-inside','avoid','important');
    });
  }

  function cleanup(){
    document.querySelectorAll('#previewList [data-two-up-number18="1"]').forEach(el=>{
      el.removeAttribute('style');
      delete el.dataset.twoUpNumber18;
    });
    twoUpActive=false;
    if(observer){observer.disconnect();observer=null;}
  }

  const originalRenderPreview=window.renderPreview;
  if(typeof originalRenderPreview==='function'&&!originalRenderPreview.__number18TwoUpSafeWrapped){
    const wrapped=function(){
      const result=originalRenderPreview.apply(this,arguments);
      if(twoUpActive)patchNumber18ForTwoUp();
      return result;
    };
    wrapped.__number18TwoUpSafeWrapped=true;
    window.renderPreview=wrapped;
  }

  const btn=document.getElementById('printTasksTwoUp');
  if(btn){
    btn.addEventListener('click',()=>{
      twoUpActive=true;
      // print-two-up.js сначала вызывает renderPreview(), затем клонирует examPaper,
      // после чего создаёт скрытый iframe. Как только iframe появился, копия уже
      // получила компактные размеры №18 — исходный предпросмотр можно восстановить.
      observer=new MutationObserver(records=>{
        const printFrame=records.flatMap(r=>[...r.addedNodes]).find(node=>node?.tagName==='IFRAME'&&node.getAttribute('aria-hidden')==='true');
        if(printFrame)cleanup();
      });
      observer.observe(document.body,{childList:true});
      setTimeout(cleanup,15000);
    },true);
  }
})();
