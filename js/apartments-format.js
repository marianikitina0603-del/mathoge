// Таблицы, ответы и изображения для практических заданий «Квартиры».
(function(){
  const answers={
    '1.7':'2346','2.7':'3,2','3.7':'12','4.7':'680','5.7':'29700',
    '1.7.1':'2347','2.7.1':'4,8','3.7.1':'32','4.7.1':'200','5.7.1':'28800',
    '1.7.2':'2341','2.7.2':'20','3.7.2':'2','4.7.2':'125','5.7.2':'1000',
    '1.7.3':'2316','2.7.3':'4,8','3.7.3':'9','4.7.3':'200','5.7.3':'28800',
    '1.7.4':'2476','2.7.4':'7,04','3.7.4':'11','4.7.4':'50','5.7.4':'29300',
    '1.7.5':'2376','2.7.5':'15,84','3.7.5':'7','4.7.5':'50','5.7.5':'820',
    '1.7.6':'2146','2.7.6':'24,96','3.7.6':'8','4.7.6':'525','5.7.6':'820',
    '1.7.7':'1346','2.7.7':'14,4','3.7.7':'3','4.7.7':'350','5.7.7':'950'
  };
  const planPath=setNo=>`assets/apartments-data/apartment-plan-${String(setNo).padStart(2,'0')}.png`;
  tasks.filter(t=>t.practicalType==='apartments').forEach(t=>{
    if(answers[t.id]!==undefined)t.answer=answers[t.id];
    t.planImage=planPath(t.set);
  });

  const base=window.formatPracticalText;
  window.formatPracticalText=function(t){
    if(t&&t.practicalType==='apartments'&&t.number===1){
      const lines=String(t.text||'').split('<br>');
      const rowIndex=lines.findIndex(line=>/^\s*Объекты\s+/i.test(line));
      if(rowIndex>=0){
        const objects=lines[rowIndex].replace(/^\s*Объекты\s+/i,'').trim().split(/\s+/).filter(Boolean);
        const digitsIndex=lines.findIndex((line,i)=>i>rowIndex&&/^\s*Цифры\s*$/i.test(line));
        const before=lines.slice(0,rowIndex).join('<br>');
        const after=digitsIndex>=0?lines.slice(digitsIndex+1).join('<br>'):'';
        const table=`<table class="route-data-table route-task1-table"><tbody><tr><td>Объекты</td>${objects.map(x=>`<td>${x}</td>`).join('')}</tr><tr><td>Цифры</td>${objects.map(()=>'<td class="answer-cell">&nbsp;</td>').join('')}</tr></tbody></table>`;
        return `${before}${before?'<br>':''}${table}${after?'<br>'+after:''}`;
      }
    }
    return typeof base==='function'?base(t):(t?.text||'');
  };

  function bankPlan(setNo){return `<div class="route-plan-wrap"><div class="route-plan-label">План к заданиям 1–5</div><img class="route-plan-image" src="${planPath(setNo)}" alt="План квартиры, комплект ${setNo}" loading="lazy"><div class="route-plan-missing" style="display:none">Изображение плана отсутствует.</div></div>`;}
  function builderPlan(setNo){return `<div class="builder-route-plan-wrap"><div class="builder-route-plan-label">План к заданиям 1–5</div><img class="builder-route-plan" src="${planPath(setNo)}" alt="План квартиры, комплект ${setNo}" loading="lazy"><div class="builder-plan-missing" style="display:none">Изображение плана отсутствует.</div></div>`;}

  function injectBank(){
    document.querySelectorAll('#taskList .practical-type-accordion').forEach(typeBlock=>{
      if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Квартиры')return;
      typeBlock.querySelectorAll('.practical-set-accordion').forEach(setBlock=>{
        const m=setBlock.querySelector(':scope > summary strong')?.textContent?.match(/Комплект\s+(\d+)/); const setNo=m?Number(m[1]):0;
        const grid=setBlock.querySelector('.practical-context-grid');
        if(setNo&&grid&&!grid.querySelector('img[src*="apartments-data"]'))grid.insertAdjacentHTML('beforeend',bankPlan(setNo));
      });
    });
  }
  function injectBuilder(){
    document.querySelectorAll('#builderBankList .prototype-accordion').forEach(typeBlock=>{
      if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Квартиры')return;
      typeBlock.querySelectorAll('.analogs-accordion').forEach(setBlock=>{
        const m=setBlock.querySelector(':scope > summary strong')?.textContent?.match(/Комплект\s+(\d+)/); const setNo=m?Number(m[1]):0;
        const grid=setBlock.querySelector('.builder-practical-context-grid');
        if(setNo&&grid&&!grid.querySelector('img[src*="apartments-data"]'))grid.insertAdjacentHTML('beforeend',builderPlan(setNo));
      });
    });
  }

  window.refreshApartmentPlans=function(){injectBank();injectBuilder();};
  setTimeout(()=>{injectBank();injectBuilder();},0);
})();