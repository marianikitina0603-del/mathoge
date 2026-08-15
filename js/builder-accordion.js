// Вкладка «Собрать вариант» в той же структуре, что и «Банк заданий».
(function(){
  const style=document.createElement('style');
  style.textContent=`
  #builderBankList{display:grid;gap:14px}
  #builderBankList .number-accordion{margin:0}
  #builderBankList .number-content{padding:12px}
  #builderBankList .prototype-content{padding:0 12px 12px}
  #builderBankList .builder-task-row{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;padding:14px 0;border-top:1px solid var(--line)}
  #builderBankList .builder-task-row:first-child{border-top:0}
  #builderBankList .builder-task-row .task-math{margin:4px 0 0}
  #builderBankList .builder-task-row .add-button{min-width:104px}
  #builderBankList .builder-practical-tasks{display:grid;gap:10px;padding:12px;border-top:1px solid var(--line)}
  #builderBankList .builder-practical-task{padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:#fff}
  #builderBankList .builder-practical-task .task-math{margin:7px 0 0}
  #builderBankList .builder-set-summary .set-add-button{margin-left:auto}
  #builderBankList .builder-analogs{display:grid;gap:10px;padding:10px;border-top:1px solid var(--line)}
  #builderBankList .builder-analog-row{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:11px 12px;background:#fff;border:1px solid var(--line);border-radius:10px}
  #builderBankList .builder-analog-row p{margin:0}
  .random-home-card{display:flex;flex-direction:column;gap:12px;height:100%}
  .random-home-card .random-icon{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:var(--soft);color:var(--primary);font-size:22px;font-weight:800}
  .random-home-card h3{margin:0}
  .random-home-card p{margin:0 0 4px;line-height:1.6}
  .random-home-card .primary-button{margin-top:auto;width:100%}
  @media(max-width:720px){
    #builderBankList .builder-task-row,#builderBankList .builder-analog-row{grid-template-columns:1fr}
    #builderBankList .builder-task-row .add-button,#builderBankList .builder-analog-row .add-button{width:100%}
    #builderBankList .builder-set-summary{flex-wrap:wrap}
    #builderBankList .builder-set-summary .set-add-button{width:100%;margin-left:36px}
  }`;
  document.head.appendChild(style);

  function builderPracticalStructure(){
    return `<details class="number-accordion">
      <summary class="number-summary">
        <span class="accordion-chevron">›</span>
        <span class="number-badge">№1–5</span>
        <span class="number-title">Практические задания</span>
        <span class="number-stats">7 типов</span>
      </summary>
      <div class="number-content">
        ${practicalSetStructure.map(type=>{
          const typeTasks=tasks.filter(t=>t.number>=1&&t.number<=5&&t.practicalType===type.key);
          const sets=[...new Set(typeTasks.map(t=>t.set))].filter(Boolean).sort((a,b)=>a-b);
          return `<details class="prototype-accordion">
            <summary class="prototype-summary">
              <span class="accordion-chevron">›</span>
              <span class="prototype-main"><strong>${type.title}</strong></span>
              <span class="analog-count">${sets.length} комплектов</span>
            </summary>
            <div class="prototype-content">
              ${sets.length?sets.map(setNo=>{
                const setTasks=typeTasks.filter(t=>t.set===setNo).sort((a,b)=>a.number-b.number);
                const added=isPracticalSetAdded(setTasks);
                return `<details class="analogs-accordion">
                  <summary class="analogs-summary builder-set-summary">
                    <span class="accordion-chevron">›</span>
                    <strong>Комплект ${setNo}</strong>
                    <span>${setTasks.length} задач</span>
                    <button type="button" class="add-button set-add-button ${added?'added':''}" data-builder-set="${type.key}:${setNo}">${added?'✓ Добавлено':'+ В вариант'}</button>
                  </summary>
                  <div class="builder-practical-tasks">
                    ${setTasks.map(t=>`<div class="builder-practical-task"><div class="task-meta"><span class="tag number">№${t.number}</span></div><p class="task-math">${typeof formatPracticalText==='function'?formatPracticalText(t):t.text}</p></div>`).join('')}
                  </div>
                </details>`;
              }).join(''):'<div class="empty-bank compact-empty">Комплекты пока не добавлены.</div>'}
            </div>
          </details>`;
        }).join('')}
      </div>
    </details>`;
  }

  function builderStandardNumber(number){
    const numberTasks=tasks.filter(t=>t.number===number);
    const prototypes=numberTasks.filter(t=>t.kind==='Прототип').sort((a,b)=>a.prototype-b.prototype);
    const topic=numberTasks[0]?.topic||'';
    return `<details class="number-accordion">
      <summary class="number-summary">
        <span class="accordion-chevron">›</span>
        <span class="number-badge">№${number}</span>
        <span class="number-title">${topic}</span>
        <span class="number-stats">${prototypes.length} прототипов</span>
      </summary>
      <div class="number-content">
        ${prototypes.map(proto=>{
          const analogs=numberTasks.filter(t=>t.kind==='Аналог'&&t.prototype===proto.prototype).sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
          const added=isAdded(proto.id);
          return `<details class="prototype-accordion">
            <summary class="prototype-summary">
              <span class="accordion-chevron">›</span>
              <span class="prototype-main"><strong>Прототип ${proto.prototype}</strong><span class="prototype-id">${proto.id}</span></span>
              <span class="analog-count">${analogs.length} аналогов</span>
            </summary>
            <div class="prototype-content">
              <div class="builder-task-row">
                <div><div class="task-meta"><span class="tag number">№${number}</span><span class="tag">Прототип</span></div><p class="task-math">${proto.text}</p></div>
                <button class="add-button ${added?'added':''}" data-builder-task="${proto.id}">${added?'✓ Добавлено':'+ В вариант'}</button>
              </div>
              <details class="analogs-accordion">
                <summary class="analogs-summary"><span class="accordion-chevron">›</span><strong>Аналоги прототипа ${proto.prototype}</strong><span>${analogs.length}</span></summary>
                <div class="builder-analogs">
                  ${analogs.length?analogs.map(a=>`<div class="builder-analog-row"><p class="task-math">${a.text}</p><button class="add-button ${isAdded(a.id)?'added':''}" data-builder-task="${a.id}">${isAdded(a.id)?'✓ Добавлено':'+ В вариант'}</button></div>`).join(''):'<div class="empty-bank compact-empty">Аналогов пока нет.</div>'}
                </div>
              </details>
            </div>
          </details>`;
        }).join('')}
      </div>
    </details>`;
  }

  window.renderBuilderBank=function(){
    const root=$('#builderBankList');
    if(!root)return;
    const standardNumbers=[...new Set(tasks.filter(t=>t.number>=6).map(t=>t.number))].sort((a,b)=>a-b);
    $('#builderBankCount').textContent=tasks.length;
    root.innerHTML=builderPracticalStructure()+standardNumbers.map(builderStandardNumber).join('');

    $$('#builderBankList [data-builder-task]').forEach(btn=>btn.onclick=e=>{
      e.preventDefault();e.stopPropagation();
      toggleTask(btn.dataset.builderTask);
    });
    $$('#builderBankList [data-builder-set]').forEach(btn=>btn.onclick=e=>{
      e.preventDefault();e.stopPropagation();
      const [typeKey,setNo]=btn.dataset.builderSet.split(':');
      togglePracticalSet(typeKey,Number(setNo));
    });
  };

  function randomItem(arr){return arr[Math.floor(Math.random()*arr.length)];}

  function getCompletePracticalSets(){
    const groups=new Map();
    tasks.filter(t=>t.number>=1&&t.number<=5&&t.practicalType&&t.set).forEach(t=>{
      const key=`${t.practicalType}:${t.set}`;
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(t);
    });
    return [...groups.values()].map(group=>group.sort((a,b)=>a.number-b.number)).filter(group=>{
      const nums=new Set(group.map(t=>t.number));
      return [1,2,3,4,5].every(n=>nums.has(n));
    });
  }

  window.generateRandomOgeVariant=function(){
    const practicalSets=getCompletePracticalSets();
    if(!practicalSets.length){
      toast('Сначала добавьте хотя бы один полный комплект №1–5');
      return;
    }

    const selected=[...randomItem(practicalSets)];
    const missing=[];
    for(let number=6;number<=25;number++){
      const pool=tasks.filter(t=>t.number===number);
      if(pool.length)selected.push(randomItem(pool));
      else missing.push(number);
    }

    variant=selected;
    localStorage.setItem('mathoge-current',JSON.stringify(variant));
    const name=$('#variantName');
    if(name)name.value='Случайный вариант';
    updateCounters();
    renderBuilder();
    renderBuilderBank();
    renderBank();

    if(missing.length){
      toast(`Вариант создан. Пока нет заданий №${missing.join(', ')}`);
    }else{
      toast('Случайный вариант из 25 заданий создан');
    }
    go('builder');
  };

  function setupHome(){
    const heroText=document.querySelector('#page-home .hero-copy p');
    if(heroText)heroText.remove();

    const firstPanel=document.querySelector('#page-home .overview-grid .panel');
    if(!firstPanel)return;
    firstPanel.innerHTML=`<div class="random-home-card">
      <div class="random-icon">✦</div>
      <span class="eyebrow">Случайный вариант</span>
      <h3>Сгенерировать вариант ОГЭ</h3>
      <p class="muted">Один полный комплект №1–5 и по одному случайному заданию №6–25.</p>
      <button class="primary-button" id="homeRandomVariantBtn">✦ Сгенерировать случайный вариант</button>
    </div>`;
    const btn=$('#homeRandomVariantBtn');
    if(btn)btn.onclick=()=>window.generateRandomOgeVariant();
  }

  setupHome();
})();
