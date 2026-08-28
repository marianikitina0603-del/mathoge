// Общий план для всех практических заданий «Листы».
(function(){
  const planPath='assets/sheets-data/sheet-plan-01.png';

  function applySheetData(){
    tasks.filter(t=>t.practicalType==='sheets').forEach(t=>{t.planImage=planPath;});
  }

  function imageBlock(mode){
    const cls=mode==='builder'?'builder-route-plan':'route-plan-image';
    const wrap=mode==='builder'?'builder-route-plan-wrap':'route-plan-wrap';
    const label=mode==='builder'?'builder-route-plan-label':'route-plan-label';
    const missing=mode==='builder'?'builder-plan-missing':'route-plan-missing';
    return `<div class="${wrap}"><div class="${label}">План к заданиям 1–5</div><img class="${cls}" src="${planPath}" alt="План. Листы" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="${missing}" style="display:none">Изображение плана не найдено.</div></div>`;
  }

  function injectBank(){
    document.querySelectorAll('#taskList .practical-type-accordion').forEach(typeBlock=>{
      if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Листы')return;
      typeBlock.querySelectorAll('.practical-set-accordion').forEach(setBlock=>{
        const grid=setBlock.querySelector('.practical-context-grid');
        if(grid&&!grid.querySelector('img[src*="sheets-data/sheet-plan-01"]'))grid.insertAdjacentHTML('beforeend',imageBlock('bank'));
      });
    });
  }

  function injectBuilder(){
    document.querySelectorAll('#builderBankList .prototype-accordion').forEach(typeBlock=>{
      if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Листы')return;
      typeBlock.querySelectorAll('.analogs-accordion').forEach(setBlock=>{
        const grid=setBlock.querySelector('.builder-practical-context-grid');
        if(grid&&!grid.querySelector('img[src*="sheets-data/sheet-plan-01"]'))grid.insertAdjacentHTML('beforeend',imageBlock('builder'));
      });
    });
  }

  function refreshSheetPlans(){applySheetData();injectBank();injectBuilder();}
  window.refreshSheetPlans=refreshSheetPlans;

  const bankRender=window.renderBank;
  if(typeof bankRender==='function'&&!bankRender.__sheetsWrapped){
    const wrapped=function(){const r=bankRender.apply(this,arguments);queueMicrotask(refreshSheetPlans);return r;};
    wrapped.__sheetsWrapped=true;
    window.renderBank=wrapped;
  }

  function wrapBuilderWhenReady(){
    const builderRender=window.renderBuilderBank;
    if(typeof builderRender==='function'&&!builderRender.__sheetsWrapped){
      const wrapped=function(){const r=builderRender.apply(this,arguments);queueMicrotask(refreshSheetPlans);return r;};
      wrapped.__sheetsWrapped=true;
      window.renderBuilderBank=wrapped;
    }
  }
  wrapBuilderWhenReady();

  let scheduled=false;
  const observer=new MutationObserver(()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;refreshSheetPlans();wrapBuilderWhenReady();});
  });
  [document.getElementById('taskList'),document.getElementById('builderBankList')].filter(Boolean).forEach(root=>observer.observe(root,{childList:true,subtree:true}));

  setTimeout(()=>{wrapBuilderWhenReady();refreshSheetPlans();},0);
  setTimeout(()=>{wrapBuilderWhenReady();refreshSheetPlans();},300);
})();