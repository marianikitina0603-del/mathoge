// Точечная правка №18 для режима «Только задания · 2 на листе».
(function(){
  function patchNumber18ForTwoUp(){
    document.querySelectorAll('#previewList .number18-task-layout').forEach(layout=>{
      layout.style.setProperty('display','flow-root','important');
      layout.style.setProperty('min-width','0','important');
    });
    document.querySelectorAll('#previewList .number18-diagram').forEach(img=>{
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

  const originalRenderPreview=window.renderPreview;
  if(typeof originalRenderPreview==='function'&&!originalRenderPreview.__number18TwoUpWrapped){
    const wrapped=function(){
      const result=originalRenderPreview.apply(this,arguments);
      if(window.__mathogeNumber18TwoUpPrint)patchNumber18ForTwoUp();
      return result;
    };
    wrapped.__number18TwoUpWrapped=true;
    window.renderPreview=wrapped;
  }

  const btn=document.getElementById('printTasksTwoUp');
  if(btn){
    btn.addEventListener('click',()=>{
      window.__mathogeNumber18TwoUpPrint=true;
      setTimeout(()=>{window.__mathogeNumber18TwoUpPrint=false;},100);
    },true);
  }
})();
