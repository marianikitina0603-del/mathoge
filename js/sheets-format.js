// Данные отображения, ответы и общий план для практических заданий «Листы».
(function(){
  const planPath='assets/sheets-data/sheet-plan-01.png';
  const answers={
    '1.5':'2413','2.5':'2','3.5':'1250 или 1247,4','4.5':'840','5.5':'1250',
    '1.5.1':'1243','2.5.1':'4','3.5.1':'312,5 или 310,8','4.5.1':'150','5.5.1':'4800',
    '1.5.2':'2143','2.5.2':'4','3.5.2':'840','4.5.2':'0,7','5.5.2':'21',
    '1.5.3':'3124','2.5.3':'8','3.5.3':'210','4.5.3':'1,4','5.5.3':'11'
  };

  function applySheetData(){
    tasks.filter(t=>t.practicalType==='sheets').forEach(t=>{
      t.planImage=planPath;
      if(answers[t.id]!==undefined)t.answer=answers[t.id];
    });
  }
  applySheetData();

  function formatPipeTables(text){
    const lines=String(text||'').split('<br>');
    const out=[];
    for(let i=0;i<lines.length;){
      if(!lines[i].includes('|')){out.push(lines[i]);i++;continue;}
      const rows=[];
      while(i<lines.length&&lines[i].includes('|')){
        rows.push(lines[i].split('|').map(cell=>cell.trim()));
        i++;
      }
      if(rows.length){
        const first=rows[0];
        out.push(`<table class="route-data-table sheet-data-table"><thead><tr>${first.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr>${r.map(c=>`<td>${c||'&nbsp;'}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      }
    }
    return out.join('<br>');
  }

  const baseFormatter=window.formatPracticalText;
  window.formatPracticalText=function(t){
    if(t&&t.practicalType==='sheets')return formatPipeTables(t.text||'');
    return typeof baseFormatter==='function'?baseFormatter(t):(t?.text||'');
  };

  function imageBlock(mode){
    const cls=mode==='builder'?'builder-route-plan':'route-plan-image';
    const wrap=mode==='builder'?'builder-route-plan-wrap':'route-plan-wrap';
    const label=mode==='builder'?'builder-route-plan-label':'route-plan-label';
    const missing=mode==='builder'?'builder-plan-missing':'route-plan-missing';
    return `<div class="${wrap}"><div class="${label}">Схема форматов листов</div><img class="${cls}" src="${planPath}" alt="Схема форматов бумаги A0–A6" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="${missing}" style="display:none">Изображение схемы не найдено.</div></div>`;
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