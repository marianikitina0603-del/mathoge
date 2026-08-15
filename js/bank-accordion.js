// Двухуровневый раскрывающийся банк: номер ОГЭ → прототип → аналоги.
function renderBank(){
  const root=$('#taskList');
  const numbers=[...new Set(tasks.map(t=>t.number))].sort((a,b)=>a-b);
  $('#resultCount').textContent=tasks.length;

  root.innerHTML=numbers.map(number=>{
    const numberTasks=tasks.filter(t=>t.number===number);
    const prototypes=numberTasks.filter(t=>t.kind==='Прототип').sort((a,b)=>a.prototype-b.prototype);
    const topic=numberTasks[0]?.topic||'';

    const prototypeHtml=prototypes.map(proto=>{
      const analogs=numberTasks.filter(t=>t.kind==='Аналог'&&t.prototype===proto.prototype)
        .sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
      const added=isAdded(proto.id);

      return `<details class="prototype-accordion">
        <summary class="prototype-summary">
          <span class="accordion-chevron">›</span>
          <span class="prototype-main">
            <strong>Прототип ${proto.prototype}</strong>
            <span class="prototype-id">${proto.id}</span>
          </span>
          ${proto.demo?'<span class="tag demo">DEMO</span>':''}
          <span class="analog-count">${analogs.length} аналогов</span>
        </summary>
        <div class="prototype-content">
          <article class="prototype-task-card">
            <div class="prototype-task-copy">
              <div class="task-meta"><span class="tag number">№${number}</span><span class="tag">Прототип</span></div>
              <p class="task-math">${proto.text}</p>
            </div>
            <button class="add-button ${added?'added':''}" data-add="${proto.id}">${added?'✓ Добавлено':'+ В вариант'}</button>
          </article>
          <details class="analogs-accordion">
            <summary class="analogs-summary">
              <span class="accordion-chevron">›</span>
              <strong>Аналоги прототипа ${proto.prototype}</strong>
              <span>${analogs.length}</span>
            </summary>
            <div class="analogs-list">
              ${analogs.length?analogs.map(a=>taskCard(a)).join(''):'<div class="empty-bank compact-empty">Аналогов пока нет.</div>'}
            </div>
          </details>
        </div>
      </details>`;
    }).join('');

    return `<details class="number-accordion">
      <summary class="number-summary">
        <span class="accordion-chevron">›</span>
        <span class="number-badge">№${number}</span>
        <span class="number-title">${topic}</span>
        <span class="number-stats">${prototypes.length} прототипов · ${numberTasks.filter(t=>t.kind==='Аналог').length} аналогов</span>
      </summary>
      <div class="number-content">${prototypeHtml||'<div class="empty-bank">Прототипов пока нет.</div>'}</div>
    </details>`;
  }).join('')||'<div class="empty-bank">Заданий пока нет.</div>';

  $$('#taskList [data-add]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();toggleTask(b.dataset.add)});
}

renderBank();
