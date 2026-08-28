// Ответы и схема для практических заданий «Печки».
(function(){
  const answers={
    '1.6':'312','2.6':'15,4','3.6':'2000','4.6':'16200','5.6':'65',
    '1.6.1':'321','2.6.1':'7,7','3.6.1':'4500','4.6.1':'17550','5.6.1':'50'
  };
  const diagram='assets/stoves-data/stove-plan-01.svg';

  function apply(){
    tasks.filter(t=>t.practicalType==='stoves').forEach(t=>{
      if(answers[t.id]!==undefined)t.answer=answers[t.id];
      if(t.number===5&&!String(t.text||'').includes('stove-task-diagram')){
        t.text += `<div class="stove-task-diagram" style="margin:16px 0;text-align:center"><img src="${diagram}" alt="Схема кожуха печи" style="display:block;max-width:520px;width:100%;height:auto;margin:0 auto" loading="lazy"></div>`;
      }
    });
  }
  apply();
  window.refreshStoveTasks=apply;
})();