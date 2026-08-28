// Таблицы, ответы и изображения для практических заданий «Участки».
(function(){
  const answers={"1.4":"7425","2.4":"7","3.4":"36","4.4":"29","5.4":"500","1.4.1":"3517","2.4.1":"9","3.4.1":"6","4.4.1":"10","5.4.1":"600","1.4.2":"7352","2.4.2":"5","3.4.2":"36","4.4.2":"75","5.4.2":"450","1.4.3":"2473","2.4.3":"7","3.4.3":"108","4.4.3":"300","5.4.3":"500","1.4.4":"3461","2.4.4":"23","3.4.4":"68","4.4.4":"10","5.4.4":"500","1.4.5":"5136","2.4.5":"6","3.4.5":"72","4.4.5":"10","5.4.5":"650","1.4.6":"4235","2.4.6":"32","3.4.6":"31","4.4.6":"4","5.4.6":"400","1.4.7":"5723","2.4.7":"88","3.4.7":"26","4.4.7":"10","5.4.7":"200"};
  const planPath=setNo=>`assets/plots-data/plot-plan-${String(setNo).padStart(2,'0')}.png`;
  tasks.filter(t=>t.practicalType==='plots').forEach(t=>{if(answers[t.id]!==undefined)t.answer=answers[t.id];t.planImage=planPath(t.set);});
  const base=window.formatPracticalText;
  window.formatPracticalText=function(t){if(t&&t.practicalType==='plots'&&t.number===1){const lines=String(t.text||'').split('<br>');const rowIndex=lines.findIndex(line=>/^\s*Объекты\s+/i.test(line));if(rowIndex>=0){const objects=lines[rowIndex].replace(/^\s*Объекты\s+/i,'').trim().split(/\s+/).filter(Boolean);const digitsIndex=lines.findIndex((line,i)=>i>rowIndex&&/^\s*Цифры\s*$/i.test(line));const before=lines.slice(0,rowIndex).join('<br>');const after=digitsIndex>=0?lines.slice(digitsIndex+1).join('<br>'):'';const table=`<table class="route-data-table route-task1-table"><tbody><tr><td>Объекты</td>${objects.map(x=>`<td>${x}</td>`).join('')}</tr><tr><td>Цифры</td>${objects.map(()=>'<td class="answer-cell">&nbsp;</td>').join('')}</tr></tbody></table>`;return `${before}${before?'<br>':''}${table}${after?'<br>'+after:''}`;}}return typeof base==='function'?base(t):(t?.text||'');};
  function bankImageBlock(setNo){return `<div class="route-plan-wrap"><div class="route-plan-label">План к заданиям 1–5</div><img class="route-plan-image" src="${planPath(setNo)}" alt="План. Участки, комплект ${setNo}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="route-plan-missing" style="display:none">Изображение плана отсутствует.</div></div>`;}
  function builderImageBlock(setNo){return `<div class="builder-route-plan-wrap"><div class="builder-route-plan-label">План к заданиям 1–5</div><img class="builder-route-plan" src="${planPath(setNo)}" alt="План. Участки, комплект ${setNo}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="builder-plan-missing" style="display:none">Изображение плана отсутствует.</div></div>`;}
  function injectBankPlans(){document.querySelectorAll('#taskList .practical-type-accordion').forEach(typeBlock=>{if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Участки')return;typeBlock.querySelectorAll('.practical-set-accordion').forEach(setBlock=>{const m=setBlock.querySelector(':scope > summary strong')?.textContent?.match(/Комплект\s+(\d+)/);const setNo=m?Number(m[1]):0;const grid=setBlock.querySelector('.practical-context-grid');if(setNo&&grid&&!grid.querySelector('img[src*="plots-data"]'))grid.insertAdjacentHTML('beforeend',bankImageBlock(setNo));});});}
  function injectBuilderPlans(){document.querySelectorAll('#builderBankList .prototype-accordion').forEach(typeBlock=>{if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Участки')return;typeBlock.querySelectorAll('.analogs-accordion').forEach(setBlock=>{const m=setBlock.querySelector(':scope > summary strong')?.textContent?.match(/Комплект\s+(\d+)/);const setNo=m?Number(m[1]):0;const grid=setBlock.querySelector('.builder-practical-context-grid');if(setNo&&grid&&!grid.querySelector('img[src*="plots-data"]'))grid.insertAdjacentHTML('beforeend',builderImageBlock(setNo));});});}
  const originalRenderBank=window.renderBank;if(typeof originalRenderBank==='function')window.renderBank=function(){originalRenderBank();injectBankPlans();};
  setTimeout(()=>{injectBankPlans();const originalRenderBuilderBank=window.renderBuilderBank;if(typeof originalRenderBuilderBank==='function'&&!originalRenderBuilderBank.__plotsWrapped){const wrapped=function(){originalRenderBuilderBank();injectBuilderPlans();};wrapped.__plotsWrapped=true;window.renderBuilderBank=wrapped;}injectBuilderPlans();},0);

  // Подгружаем «Квартиры», общий план «Листов» и пустые разделы №7–25, затем перерисовываем оба банка.
  const load=(src)=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
  (async()=>{try{
    await load('js/apartments-data.js?v=20260828-1728');
    await load('js/apartments-format.js?v=20260828-1728');
    await load('js/sheets-format.js?v=20260828-1730');
    await load('js/empty-numbers.js?v=20260828-1728');
    if(typeof window.renderBank==='function')window.renderBank();
    if(typeof window.renderBuilderBank==='function')window.renderBuilderBank();
    if(typeof window.refreshApartmentPlans==='function')window.refreshApartmentPlans();
    if(typeof window.refreshSheetPlans==='function')window.refreshSheetPlans();
    if(typeof window.updateCounters==='function')window.updateCounters();
  }catch(e){console.error('Не удалось загрузить дополнительные разделы банка',e);}})();
})();