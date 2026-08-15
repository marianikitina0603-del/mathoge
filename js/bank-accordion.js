// Раскрывающийся банк заданий.
// №1–5: Практические задания → тематические блоки → комплекты по 5 задач.
// №6 и далее: номер ОГЭ → прототип → аналоги.

const practicalSetStructure = [
  { key:'routes', title:'Маршруты' },
  { key:'plots', title:'Участки' },
  { key:'apartments', title:'Квартиры' },
  { key:'sheets', title:'Листы' },
  { key:'stoves', title:'Печки' },
  { key:'tariffs', title:'Тарифы' },
  { key:'tires', title:'Шины' }
];

const practicalStyles=document.createElement('style');
practicalStyles.textContent=`
.practical-set-body{border-top:1px solid var(--line)}
.practical-context{margin:14px;padding:18px;border:1px solid var(--line);border-radius:14px;background:#f8faff;line-height:1.65}
.practical-context-title{font-size:12px;font-weight:800;color:var(--primary);margin-bottom:10px;text-transform:uppercase;letter-spacing:.04em}
.plan-note{margin-top:14px;padding:10px 12px;border-radius:10px;background:#fff7e6;color:#845d12;font-size:12px}
.source-condition{white-space:normal;line-height:1.65}
.practical-set-list{border-top:1px solid var(--line)}
.practical-set-list .task-card h4{display:none}
.route-data-table{width:100%;max-width:760px;margin:14px 0;border-collapse:collapse;background:#fff;font-size:14px}
.route-data-table th,.route-data-table td{border:1px solid #5f6673;padding:7px 10px;text-align:center;vertical-align:middle}
.route-data-table th{font-weight:800;background:#f5f7fb}
.practical-set-summary{gap:12px}
.practical-set-summary .set-add-button{margin-left:auto;flex:0 0 auto}
.practical-set-list .task-side{display:none}
.practical-set-list .task-card{grid-template-columns:1fr}
`;
document.head.appendChild(practicalStyles);

function formatPracticalText(t){
  if(t.number!==5 || !t.text.includes('|')) return t.text;
  const parts=t.text.split('<br>');
  const tableLines=[];
  const before=[];
  const after=[];
  let tableStarted=false,tableEnded=false;
  parts.forEach(line=>{
    if(line.includes('|')&&!tableEnded){tableStarted=true;tableLines.push(line.trim());}
    else if(tableStarted&&!tableEnded){tableEnded=true;after.push(line);}
    else if(tableEnded) after.push(line);
    else before.push(line);
  });
  if(!tableLines.length) return t.text;
  const rows=tableLines.map(line=>line.split('|').map(cell=>cell.trim()));
  const table=`<table class="route-data-table"><thead><tr>${rows[0].map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  return before.join('<br>')+table+after.join('<br>');
}

// Внутри практического комплекта задания показываются без отдельных кнопок добавления.
const standardTaskCard=taskCard;
taskCard=function(t){
  if(!(t.number>=1&&t.number<=5)) return standardTaskCard(t);
  return `<article class="task-card"><div><div class="task-meta"><span class="tag number">№${t.number}</span><span class="tag">${t.kind}</span></div><p class="task-math">${formatPracticalText(t)}</p></div></article>`;
};

function isPracticalSetAdded(setTasks){
  return setTasks.length>0 && setTasks.every(t=>isAdded(t.id));
}

function togglePracticalSet(typeKey,setNo){
  const setTasks=tasks.filter(t=>t.number>=1&&t.number<=5&&t.practicalType===typeKey&&t.set===setNo).sort((a,b)=>a.number-b.number);
  if(!setTasks.length)return;
  const allAdded=isPracticalSetAdded(setTasks);
  if(allAdded){
    const ids=new Set(setTasks.map(t=>t.id));
    variant=variant.filter(t=>!ids.has(t.id));
    toast(`Комплект ${setNo} удалён из варианта`);
  }else{
    const existing=new Set(variant.map(t=>t.id));
    setTasks.forEach(t=>{if(!existing.has(t.id))variant.push(t)});
    toast(`Комплект ${setNo} добавлен в вариант`);
  }
  saveCurrent();
  renderBank();
}

function renderPracticalStructure(){
  return `<details class="number-accordion practical-number-accordion">
    <summary class="number-summary">
      <span class="accordion-chevron">›</span>
      <span class="number-badge">№1–5</span>
      <span class="number-title">Практические задания</span>
      <span class="number-stats">7 типов</span>
    </summary>
    <div class="number-content practical-types">
      ${practicalSetStructure.map(type=>{
        const typeTasks=tasks.filter(t=>t.number>=1&&t.number<=5&&t.practicalType===type.key);
        const setNumbers=[...new Set(typeTasks.map(t=>t.set))].filter(Boolean).sort((a,b)=>a-b);
        return `<details class="prototype-accordion practical-type-accordion">
          <summary class="prototype-summary">
            <span class="accordion-chevron">›</span>
            <span class="prototype-main"><strong>${type.title}</strong></span>
            <span class="analog-count">${setNumbers.length} комплектов</span>
          </summary>
          <div class="prototype-content practical-sets">
            ${setNumbers.length ? setNumbers.map(setNo=>{
              const setTasks=typeTasks.filter(t=>t.set===setNo).sort((a,b)=>a.number-b.number);
              const context=setTasks.find(t=>t.context)?.context||'';
              const setAdded=isPracticalSetAdded(setTasks);
              return `<details class="analogs-accordion practical-set-accordion">
                <summary class="analogs-summary practical-set-summary">
                  <span class="accordion-chevron">›</span>
                  <strong>Комплект ${setNo}</strong>
                  <span>${setTasks.length} задач</span>
                  <button type="button" class="add-button set-add-button ${setAdded?'added':''}" data-add-set="${type.key}:${setNo}">${setAdded?'✓ Добавлено':'+ В вариант'}</button>
                </summary>
                <div class="practical-set-body">
                  ${context?`<div class="practical-context"><div class="practical-context-title">Общее условие к заданиям 1–5</div>${context}<div class="plan-note">План относится к общему условию и будет перенесён из исходного PDF отдельным изображением.</div></div>`:''}
                  <div class="analogs-list practical-set-list">${setTasks.map(t=>taskCard(t)).join('')}</div>
                </div>
              </details>`;
            }).join('') : '<div class="empty-bank compact-empty">Комплекты будут добавлены из банка ФИПИ.</div>'}
          </div>
        </details>`;
      }).join('')}
    </div>
  </details>`;
}

function renderStandardNumber(number){
  const numberTasks=tasks.filter(t=>t.number===number);
  const prototypes=numberTasks.filter(t=>t.kind==='Прототип').sort((a,b)=>a.prototype-b.prototype);
  const topic=numberTasks[0]?.topic||'';
  const prototypeHtml=prototypes.map(proto=>{
    const analogs=numberTasks.filter(t=>t.kind==='Аналог'&&t.prototype===proto.prototype).sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
    const added=isAdded(proto.id);
    return `<details class="prototype-accordion"><summary class="prototype-summary"><span class="accordion-chevron">›</span><span class="prototype-main"><strong>Прототип ${proto.prototype}</strong><span class="prototype-id">${proto.id}</span></span>${proto.demo?'<span class="tag demo">DEMO</span>':''}<span class="analog-count">${analogs.length} аналогов</span></summary><div class="prototype-content"><article class="prototype-task-card"><div class="prototype-task-copy"><div class="task-meta"><span class="tag number">№${number}</span><span class="tag">Прототип</span></div><p class="task-math">${proto.text}</p></div><button class="add-button ${added?'added':''}" data-add="${proto.id}">${added?'✓ Добавлено':'+ В вариант'}</button></article><details class="analogs-accordion"><summary class="analogs-summary"><span class="accordion-chevron">›</span><strong>Аналоги прототипа ${proto.prototype}</strong><span>${analogs.length}</span></summary><div class="analogs-list">${analogs.length?analogs.map(a=>taskCard(a)).join(''):'<div class="empty-bank compact-empty">Аналогов пока нет.</div>'}</div></details></div></details>`;
  }).join('');
  return `<details class="number-accordion"><summary class="number-summary"><span class="accordion-chevron">›</span><span class="number-badge">№${number}</span><span class="number-title">${topic}</span><span class="number-stats">${prototypes.length} прототипов · ${numberTasks.filter(t=>t.kind==='Аналог').length} аналогов</span></summary><div class="number-content">${prototypeHtml||'<div class="empty-bank">Прототипов пока нет.</div>'}</div></details>`;
}

function renderBank(){
  const root=$('#taskList');
  const standardNumbers=[...new Set(tasks.filter(t=>t.number>=6).map(t=>t.number))].sort((a,b)=>a-b);
  $('#resultCount').textContent=tasks.length;
  root.innerHTML=renderPracticalStructure()+standardNumbers.map(renderStandardNumber).join('');
  $$('#taskList [data-add]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();toggleTask(b.dataset.add)});
  $$('#taskList [data-add-set]').forEach(b=>b.onclick=e=>{
    e.preventDefault();e.stopPropagation();
    const [typeKey,setNo]=b.dataset.addSet.split(':');
    togglePracticalSet(typeKey,Number(setNo));
  });
}

function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s)})}
async function initBank(){
  try{
    for(let i=1;i<=6;i++) await loadScript(`js/routes-part-${i}.js`);
  }catch(e){console.error('Не удалось загрузить комплекты Маршруты',e)}
  renderBank();
  updateCounters();
}
initBank();
