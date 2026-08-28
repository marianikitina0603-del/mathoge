// Ответы и две схемы только для задания №5 практического блока «Печки».
(function(){
  const answers={
    '1.6':'312','2.6':'15,4','3.6':'2000','4.6':'16200','5.6':'65',
    '1.6.1':'321','2.6.1':'7,7','3.6.1':'4500','4.6.1':'17550','5.6.1':'50'
  };
  const task5Images={
    1:'assets/stoves-data/stove-task5-01.png',
    2:'assets/stoves-data/stove-task5-02.png'
  };

  function apply(){
    tasks.filter(t=>t.practicalType==='stoves').forEach(t=>{
      if(answers[t.id]!==undefined)t.answer=answers[t.id];
      if(t.number!==5)return;
      const src=task5Images[t.set];
      if(!src)return;
      t.taskImage=src;
      // Картинка является частью именно задания №5, а не общим планом комплекта.
      if(!String(t.text||'').includes('stove-task-diagram')){
        t.text += `<div class="stove-task-diagram" style="margin:16px 0;text-align:center;break-inside:avoid;page-break-inside:avoid"><img src="${src}" alt="Рисунок к заданию №5. Печки, комплект ${t.set}" style="display:block;max-width:620px;width:100%;height:auto;margin:0 auto" loading="lazy" onerror="this.style.display='none'"></div>`;
      }
    });
  }
  apply();
  window.refreshStoveTasks=apply;
})();