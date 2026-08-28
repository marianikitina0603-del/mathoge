// Таблицы, ответы и планы для практических заданий «Квартиры».
(function(){
  const answers={"1.7":"2346","2.7":"3,2","3.7":"12","4.7":"680","5.7":"29 700","1.7.1":"2347","2.7.1":"4,8","3.7.1":"32","4.7.1":"200","5.7.1":"28 800","1.7.2":"2341","2.7.2":"20","3.7.2":"2","4.7.2":"125","5.7.2":"1000","1.7.3":"2316","2.7.3":"4,8","3.7.3":"9","4.7.3":"200","5.7.3":"28 800","1.7.4":"2476","2.7.4":"7,04","3.7.4":"11","4.7.4":"50","5.7.4":"29 300","1.7.5":"2376","2.7.5":"15,84","3.7.5":"7","4.7.5":"50","5.7.5":"820","1.7.6":"2146","2.7.6":"24,96","3.7.6":"8","4.7.6":"525","5.7.6":"820","1.7.7":"1346","2.7.7":"14,4","3.7.7":"3","4.7.7":"350","5.7.7":"950"};
  const planPath=setNo=>`assets/apartments-data/apartment-plan-${String(setNo).padStart(2,'0')}.png`;
  function applyApartmentData(){
    tasks.filter(t=>t.practicalType==='apartments').forEach(t=>{
      if(answers[t.id]!==undefined)t.answer=answers[t.id];
      t.planImage=planPath(t.set);
    });
  }
  applyApartmentData();

  const style=document.createElement('style');
  style.id='mathoge-print-table-fix';
  style.textContent=`
    @media print{
      @page{size:A4 portrait;margin:8mm!important}
      #page-preview,.preview-shell,#examPaper,.exam-paper,#previewList,.preview-practical-block,.preview-practical-tasks,.preview-task,.preview-task>div,.task-math,.preview-table-scroll{max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
      #page-preview{width:100%!important;margin:0!important;padding:0!important}
      .preview-shell{width:100%!important;margin:0!important;padding:0!important}
      #examPaper,.exam-paper{width:100%!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important}
      #previewList{width:100%!important;display:block!important}
      #previewList .preview-task{display:grid!important;grid-template-columns:22px minmax(0,1fr)!important;gap:7px!important;width:100%!important;padding:7px 0!important}
      #previewList .preview-task>div:last-child{width:100%!important;min-width:0!important;max-width:100%!important;overflow:hidden!important}
      #previewList .task-math{display:block!important;width:100%!important;min-width:0!important;max-width:100%!important;overflow:visible!important;font-size:9.7pt!important;line-height:1.22!important}
      #previewList .preview-table-scroll{display:block!important;width:100%!important;min-width:0!important;max-width:100%!important;overflow:hidden!important;margin:5px 0!important;padding:0!important}
      #previewList table,#previewList .route-data-table{display:table!important;width:99.2%!important;max-width:99.2%!important;min-width:0!important;margin:5px 0!important;border-collapse:collapse!important;border-spacing:0!important;table-layout:fixed!important;box-sizing:border-box!important}
      #previewList table th,#previewList table td,#previewList .route-data-table th,#previewList .route-data-table td{box-sizing:border-box!important;min-width:0!important;max-width:none!important;width:auto!important;padding:2.5px 2px!important;font-size:7.2pt!important;line-height:1.08!important;white-space:normal!important;overflow:hidden!important;text-overflow:clip!important;overflow-wrap:anywhere!important;word-break:break-word!important;hyphens:auto!important}
      #previewList .route-task1-table{width:82%!important;max-width:82%!important;min-width:0!important}
      #previewList .route-task1-table .answer-cell{min-width:0!important;width:auto!important;height:24px!important}
      #previewList .preview-practical-context{padding:8px 0!important;line-height:1.22!important}
      #previewList .preview-practical-context-grid{grid-template-columns:minmax(0,1fr) 34%!important;gap:10px!important;width:100%!important;min-width:0!important}
      #previewList .preview-practical-context-copy{min-width:0!important;max-width:100%!important;font-size:9.7pt!important;line-height:1.22!important}
      #previewList .preview-plan{min-width:0!important;max-width:100%!important;padding:5px!important}
      #previewList .preview-plan img{max-width:100%!important;height:auto!important}
      #previewList .teacher-answer-table{width:100%!important;max-width:100%!important;table-layout:fixed!important}
      #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{font-size:8pt!important;padding:3px 4px!important}
    }
  `;
  document.head.appendChild(style);

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

  function imageBlock(setNo,mode){
    const cls=mode==='builder'?'builder-route-plan':'route-plan-image';
    const wrap=mode==='builder'?'builder-route-plan-wrap':'route-plan-wrap';
    const label=mode==='builder'?'builder-route-plan-label':'route-plan-label';
    const missing=mode==='builder'?'builder-plan-missing':'route-plan-missing';
    return `<div class="${wrap}"><div class="${label}">План к заданиям 1–5</div><img class="${cls}" src="${planPath(setNo)}" alt="План квартиры, комплект ${setNo}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="${missing}" style="display:none">Изображение плана не найдено.</div></div>`;
  }

  function injectBank(){
    document.querySelectorAll('#taskList .practical-type-accordion').forEach(typeBlock=>{
      if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Квартиры')return;
      typeBlock.querySelectorAll('.practical-set-accordion').forEach(setBlock=>{
        const m=setBlock.querySelector(':scope > summary strong')?.textContent?.match(/Комплект\s+(\d+)/);
        const setNo=m?Number(m[1]):0;
        const grid=setBlock.querySelector('.practical-context-grid');
        if(setNo&&grid&&!grid.querySelector('img[src*="apartments-data"]'))grid.insertAdjacentHTML('beforeend',imageBlock(setNo,'bank'));
      });
    });
  }

  function injectBuilder(){
    document.querySelectorAll('#builderBankList .prototype-accordion').forEach(typeBlock=>{
      if(typeBlock.querySelector(':scope > summary strong')?.textContent?.trim()!=='Квартиры')return;
      typeBlock.querySelectorAll('.analogs-accordion').forEach(setBlock=>{
        const m=setBlock.querySelector(':scope > summary strong')?.textContent?.match(/Комплект\s+(\d+)/);
        const setNo=m?Number(m[1]):0;
        const grid=setBlock.querySelector('.builder-practical-context-grid');
        if(setNo&&grid&&!grid.querySelector('img[src*="apartments-data"]'))grid.insertAdjacentHTML('beforeend',imageBlock(setNo,'builder'));
      });
    });
  }

  function refreshApartmentPlans(){applyApartmentData();injectBank();injectBuilder();}
  window.refreshApartmentPlans=refreshApartmentPlans;

  // Восстанавливаем планы после каждой перерисовки банка.
  const bankRender=window.renderBank;
  if(typeof bankRender==='function'&&!bankRender.__apartmentsWrapped){
    const wrappedBank=function(){const r=bankRender.apply(this,arguments);queueMicrotask(refreshApartmentPlans);return r;};
    wrappedBank.__apartmentsWrapped=true;
    window.renderBank=wrappedBank;
  }

  function wrapBuilderWhenReady(){
    const builderRender=window.renderBuilderBank;
    if(typeof builderRender==='function'&&!builderRender.__apartmentsWrapped){
      const wrappedBuilder=function(){const r=builderRender.apply(this,arguments);queueMicrotask(refreshApartmentPlans);return r;};
      wrappedBuilder.__apartmentsWrapped=true;
      window.renderBuilderBank=wrappedBuilder;
    }
  }
  wrapBuilderWhenReady();

  // Дополнительная защита от динамических перерисовок другими скриптами.
  let scheduled=false;
  const observer=new MutationObserver(()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;refreshApartmentPlans();wrapBuilderWhenReady();});
  });
  const roots=[document.getElementById('taskList'),document.getElementById('builderBankList')].filter(Boolean);
  roots.forEach(root=>observer.observe(root,{childList:true,subtree:true}));

  setTimeout(()=>{wrapBuilderWhenReady();refreshApartmentPlans();},0);
  setTimeout(()=>{wrapBuilderWhenReady();refreshApartmentPlans();},300);
})();