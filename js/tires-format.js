// Ответы и единое изображение для практических заданий «Шины».
(function(){
  const plan='assets/tires-data/tire-plan-01.png';
  const answers={
'1.3':'235','2.3':'192,5','3.3':'6,3','4.3':'685,9','5.3':'1,9',
'1.3.1':'185','2.3.1':'112,75','3.3.1':'13,3','4.3.1':'603','5.3.1':'2,2',
'1.3.2':'275','2.3.2':'178,75','3.3.2':'17,8','4.3.2':'775,2','5.3.2':'2,3',
'1.3.3':'215','2.3.3':'137,5','3.3.3':'1,7','4.3.3':'652,4','5.3.3':'1,8',
'1.3.4':'245','2.3.4':'132','3.3.4':'0,3','4.3.4':'737,3','5.3.4':'1,8',
'1.3.5':'185','2.3.5':'115,5','3.3.5':'9,1','4.3.5':'591','5.3.5':'0,8',
'1.3.6':'275','2.3.6':'117','3.3.6':'7,7','4.3.6':'802,8','5.3.6':'1,7',
'1.3.7':'195','2.3.7':'101,25','3.3.7':'15,2','4.3.7':'652,4','5.3.7':'2,3',
'1.3.8':'195','2.3.8':'90','3.3.8':'0,4','4.3.8':'614,6','5.3.8':'2,3',
'1.3.9':'235','2.3.9':'135','3.3.9':'14,8','4.3.9':'653,9','5.3.9':'1,7',
'1.3.10':'205','2.3.10':'102,5','3.3.10':'12,9','4.3.10':'621,4','5.3.10':'1,6',
'1.3.11':'225','2.3.11':'120,25','3.3.11':'6,8','4.3.11':'614,6','5.3.11':'1,3',
'1.3.12':'185','2.3.12':'107,25','3.3.12':'14,8','4.3.12':'561,2','5.3.12':'0,8',
'1.3.13':'265','2.3.13':'132,5','3.3.13':'15,8','4.3.13':'677,7','5.3.13':'2,7',
'1.3.14':'215','2.3.14':'118,25','3.3.14':'2,4','4.3.14':'631,9','5.3.14':'1,7',
'1.3.15':'205','2.3.15':'112,75','3.3.15':'17,9','4.3.15':'577,6','5.3.15':'5,9',
'1.3.16':'195','2.3.16':'113,75','3.3.16':'14,4','4.3.16':'549,8','5.3.16':'1,4',
'1.3.17':'225','2.3.17':'117,5','3.3.17':'7,6','4.3.17':'664,4','5.3.17':'1,1',
'1.3.18':'245','2.3.18':'147','3.3.18':'0,8','4.3.18':'701,8','5.3.18':'0,7',
'1.3.19':'225','2.3.19':'129,25','3.3.19':'7,7','4.3.19':'727,2','5.3.19':'1,1',
'1.3.20':'185','2.3.20':'14,8','3.3.20':'561,2','4.3.20':'5,5','5.3.20':'0,8'};
  function apply(){tasks.filter(t=>t.practicalType==='tires').forEach(t=>{t.planImage=plan;if(answers[t.id]!==undefined)t.answer=answers[t.id];});}
  apply();
  function bankImageBlock(){return `<div class="route-plan-wrap"><div class="route-plan-label">Схема маркировки шины</div><img class="route-plan-image" src="${plan}" alt="Схема автомобильной шины и её маркировки" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="route-plan-missing" style="display:none">Изображение схемы отсутствует.</div></div>`;}
  function builderImageBlock(){return `<div class="builder-route-plan-wrap"><div class="builder-route-plan-label">Схема маркировки шины</div><img class="builder-route-plan" src="${plan}" alt="Схема автомобильной шины и её маркировки" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="builder-plan-missing" style="display:none">Изображение схемы отсутствует.</div></div>`;}
  function injectBank(){document.querySelectorAll('#taskList .practical-type-accordion').forEach(type=>{if(type.querySelector(':scope > summary strong')?.textContent?.trim()!=='Шины')return;type.querySelectorAll('.practical-set-accordion').forEach(set=>{const grid=set.querySelector('.practical-context-grid');if(grid&&!grid.querySelector('img[src*="tires-data"]'))grid.insertAdjacentHTML('beforeend',bankImageBlock());});});}
  function injectBuilder(){document.querySelectorAll('#builderBankList .prototype-accordion').forEach(type=>{if(type.querySelector(':scope > summary strong')?.textContent?.trim()!=='Шины')return;type.querySelectorAll('.analogs-accordion').forEach(set=>{const grid=set.querySelector('.builder-practical-context-grid');if(grid&&!grid.querySelector('img[src*="tires-data"]'))grid.insertAdjacentHTML('beforeend',builderImageBlock());});});}
  const rb=window.renderBank;if(typeof rb==='function'&&!rb.__tiresWrapped){const w=function(){rb();injectBank();};w.__tiresWrapped=true;window.renderBank=w;}
  setTimeout(()=>{injectBank();const rbb=window.renderBuilderBank;if(typeof rbb==='function'&&!rbb.__tiresWrapped){const w=function(){rbb();injectBuilder();};w.__tiresWrapped=true;window.renderBuilderBank=w;}injectBuilder();},0);
  const obs=new MutationObserver(()=>{injectBank();injectBuilder();});
  ['taskList','builderBankList'].forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el,{childList:true,subtree:true});});
  window.refreshTirePlans=function(){apply();injectBank();injectBuilder();};
})();