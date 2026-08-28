// Ответы и единый график для практических заданий «Тарифы».
(function(){
  const plan='assets/tariffs-data/tariff-plan-01.png';
  const answers={
    '1.8':'76108','2.8':'440','3.8':'4','4.8':'40','5.8':'440',
    '1.8.1':'83117','2.8.1':'425','3.8.1':'4','4.8.1':'50','5.8.1':'350',
    '1.8.2':'31242','2.8.2':'575','3.8.2':'2','4.8.2':'75','5.8.2':'430',
    '1.8.3':'3517','2.8.3':'425','3.8.3':'4','4.8.3':'200','5.8.3':'350',
    '1.8.4':'1523','2.8.4':'680','3.8.4':'150','4.8.4':'500','5.8.4':'672',
    '1.8.5':'7325','2.8.5':'500','3.8.5':'1','4.8.5':'40','5.8.5':'880'
  };
  function apply(){tasks.filter(t=>t.practicalType==='tariffs').forEach(t=>{t.planImage=plan;if(answers[t.id]!==undefined)t.answer=answers[t.id];});}
  apply();
  function bankImageBlock(){return `<div class="route-plan-wrap"><div class="route-plan-label">График к заданиям 1–5</div><img class="route-plan-image" src="${plan}" alt="График расхода минут и мобильного интернета" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="route-plan-missing" style="display:none">Изображение графика отсутствует.</div></div>`;}
  function builderImageBlock(){return `<div class="builder-route-plan-wrap"><div class="builder-route-plan-label">График к заданиям 1–5</div><img class="builder-route-plan" src="${plan}" alt="График расхода минут и мобильного интернета" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="builder-plan-missing" style="display:none">Изображение графика отсутствует.</div></div>`;}
  function injectBank(){document.querySelectorAll('#taskList .practical-type-accordion').forEach(type=>{if(type.querySelector(':scope > summary strong')?.textContent?.trim()!=='Тарифы')return;type.querySelectorAll('.practical-set-accordion').forEach(set=>{const grid=set.querySelector('.practical-context-grid');if(grid&&!grid.querySelector('img[src*="tariffs-data"]'))grid.insertAdjacentHTML('beforeend',bankImageBlock());});});}
  function injectBuilder(){document.querySelectorAll('#builderBankList .prototype-accordion').forEach(type=>{if(type.querySelector(':scope > summary strong')?.textContent?.trim()!=='Тарифы')return;type.querySelectorAll('.analogs-accordion').forEach(set=>{const grid=set.querySelector('.builder-practical-context-grid');if(grid&&!grid.querySelector('img[src*="tariffs-data"]'))grid.insertAdjacentHTML('beforeend',builderImageBlock());});});}
  const rb=window.renderBank;if(typeof rb==='function'&&!rb.__tariffsWrapped){const w=function(){rb();injectBank();};w.__tariffsWrapped=true;window.renderBank=w;}
  setTimeout(()=>{injectBank();const rbb=window.renderBuilderBank;if(typeof rbb==='function'&&!rbb.__tariffsWrapped){const w=function(){rbb();injectBuilder();};w.__tariffsWrapped=true;window.renderBuilderBank=w;}injectBuilder();},0);
  const obs=new MutationObserver(()=>{injectBank();injectBuilder();});
  ['taskList','builderBankList'].forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el,{childList:true,subtree:true});});
  window.refreshTariffPlans=function(){apply();injectBank();injectBuilder();};
})();