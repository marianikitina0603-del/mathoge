// Отложенная загрузка тяжёлой части банка заданий.
(function(){
  const BANK_SRC='js/plots-format.js?v=20260830-perf-4';
  let bankPromise=null;

  function showLoadingHint(){
    const bank=document.querySelector('#taskList');
    if(bank && !document.querySelector('#taskList .mathoge-bank-loading')) bank.insertAdjacentHTML('afterbegin','<div class="empty-bank compact-empty mathoge-bank-loading">Загружаю полный банк заданий…</div>');
    const builder=document.querySelector('#builderBankList');
    if(builder && !document.querySelector('#builderBankList .mathoge-bank-loading')) builder.insertAdjacentHTML('afterbegin','<div class="empty-bank compact-empty mathoge-bank-loading">Загружаю полный банк заданий…</div>');
  }
  function clearLoadingHint(){document.querySelectorAll('.mathoge-bank-loading').forEach(node=>node.remove());}

  window.loadFullMathOGEBank=function(){
    if(bankPromise)return bankPromise;
    showLoadingHint();
    bankPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=BANK_SRC;
      script.async=true;
      script.onload=()=>{clearLoadingHint();resolve();};
      script.onerror=()=>{clearLoadingHint();bankPromise=null;reject(new Error('Не удалось загрузить полный банк'));};
      document.body.appendChild(script);
    });
    return bankPromise;
  };

  function clearHeavyRoot(selector){const root=document.querySelector(selector);if(root?.childNodes.length)root.replaceChildren();}
  function navigationDestination(target){
    if(!target)return '';
    if(target.dataset?.page)return target.dataset.page;
    if(target.dataset?.go)return target.dataset.go;
    if(target.id==='previewFromBuilder')return 'preview';
    if(target.id==='backToBuilder'||target.id==='showVariantBtn')return 'builder';
    return '';
  }

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-page],[data-go],#previewFromBuilder,#backToBuilder,#showVariantBtn');
    const destination=navigationDestination(target);
    if(destination==='preview'){clearHeavyRoot('#taskList');clearHeavyRoot('#builderBankList');}
    else if(destination==='builder')clearHeavyRoot('#taskList');
    else if(destination==='bank')clearHeavyRoot('#builderBankList');
  },true);

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-page="bank"],[data-page="builder"],[data-go="bank"],[data-go="builder"],#generatePart1,#generatePart2,#generateCore,#generateAlgebraFive,#generateGeometryFive');
    if(target)window.loadFullMathOGEBank().catch(console.error);
  },true);

  const observer=new MutationObserver(()=>{
    const bankOpen=document.querySelector('#page-bank.page.active');
    const builderOpen=document.querySelector('#page-builder.page.active');
    if(bankOpen||builderOpen){window.loadFullMathOGEBank().catch(console.error);observer.disconnect();}
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});

  setTimeout(()=>{
    const root=document.querySelector('#builderBankList');
    if(!root || typeof window.renderBuilderBank!=='function' || typeof tasks==='undefined')return;

    const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
    const typeset=node=>{if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise([node]).catch(()=>{});};

    function practicalSkeleton(){
      const count=tasks.filter(t=>t.number>=1&&t.number<=5).length;
      return `<details class="number-accordion builder-lazy-number" data-builder-kind="practical"><summary class="number-summary"><span class="accordion-chevron">›</span><span class="number-badge">№1–5</span><span class="number-title">Практические задания</span><span class="number-stats">${count} заданий</span></summary><div class="builder-lazy-slot"></div></details>`;
    }
    function numberSkeleton(number){
      const list=tasks.filter(t=>t.number===number),protos=list.filter(t=>t.kind==='Прототип'),analogs=list.filter(t=>t.kind==='Аналог'),topic=list[0]?.topic||'';
      return `<details class="number-accordion builder-lazy-number" data-builder-kind="standard" data-number="${number}"><summary class="number-summary"><span class="accordion-chevron">›</span><span class="number-badge">№${number}</span><span class="number-title">${esc(topic)}</span><span class="number-stats">${protos.length} прототипов · ${analogs.length} аналогов</span></summary><div class="builder-lazy-slot"></div></details>`;
    }
    function practicalContent(){
      const types=typeof practicalSetStructure!=='undefined'?practicalSetStructure:[];
      return `<div class="number-content">${types.map(type=>{
        const typeTasks=tasks.filter(t=>t.number>=1&&t.number<=5&&t.practicalType===type.key);
        const sets=[...new Set(typeTasks.map(t=>t.set))].filter(Boolean).sort((a,b)=>a-b);
        return `<details class="prototype-accordion"><summary class="prototype-summary"><span class="accordion-chevron">›</span><span class="prototype-main"><strong>${esc(type.title)}</strong></span><span class="analog-count">${sets.length} комплектов</span></summary><div class="prototype-content">${sets.map(setNo=>{
          const setTasks=typeTasks.filter(t=>t.set===setNo).sort((a,b)=>a.number-b.number);
          const added=typeof isPracticalSetAdded==='function'&&isPracticalSetAdded(setTasks);
          return `<div class="builder-task-row"><div><strong>Комплект ${setNo}</strong><small>${setTasks.length} задач</small></div><button class="add-button ${added?'added':''}" data-builder-lazy-set="${type.key}:${setNo}">${added?'✓ Добавлено':'+ В вариант'}</button></div>`;
        }).join('')}</div></details>`;
      }).join('')}</div>`;
    }
    function standardNumberContent(number){
      const list=tasks.filter(t=>t.number===number);
      const protos=list.filter(t=>t.kind==='Прототип').sort((a,b)=>a.prototype-b.prototype);
      return `<div class="number-content">${protos.map(proto=>{
        const analogs=list.filter(t=>t.kind==='Аналог'&&t.prototype===proto.prototype);
        return `<details class="prototype-accordion builder-lazy-prototype" data-number="${number}" data-prototype="${proto.prototype}"><summary class="prototype-summary"><span class="accordion-chevron">›</span><span class="prototype-main"><strong>Прототип ${proto.prototype}</strong><span class="prototype-id">${esc(proto.id)}</span></span><span class="analog-count">${analogs.length} аналогов</span></summary><div class="builder-lazy-prototype-slot"></div></details>`;
      }).join('')}</div>`;
    }
    function prototypeContent(number,prototype){
      const list=tasks.filter(t=>t.number===number&&t.prototype===prototype);
      const proto=list.find(t=>t.kind==='Прототип'),analogs=list.filter(t=>t.kind==='Аналог').sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
      if(!proto)return '<div class="empty-bank compact-empty">Прототип не найден.</div>';
      const btn=t=>`<button class="add-button ${isAdded(t.id)?'added':''}" data-builder-lazy-task="${t.id}">${isAdded(t.id)?'✓ Добавлено':'+ В вариант'}</button>`;
      return `<div class="prototype-content"><div class="builder-task-row"><div><div class="task-meta"><span class="tag number">№${number}</span><span class="tag">Прототип</span></div><p class="task-math">${proto.text}</p></div>${btn(proto)}</div><details class="analogs-accordion"><summary class="analogs-summary"><span class="accordion-chevron">›</span><strong>Аналоги прототипа ${prototype}</strong><span>${analogs.length}</span></summary><div class="builder-analogs">${analogs.map(a=>`<div class="builder-analog-row"><p class="task-math">${a.text}</p>${btn(a)}</div>`).join('')}</div></details></div>`;
    }

    window.renderBuilderBank=function(){
      const standardNumbers=[...new Set(tasks.filter(t=>t.number>=6).map(t=>t.number))].sort((a,b)=>a-b);
      const counter=document.querySelector('#builderBankCount');if(counter)counter.textContent=tasks.length;
      root.innerHTML=practicalSkeleton()+standardNumbers.map(numberSkeleton).join('');
    };

    root.addEventListener('toggle',event=>{
      const details=event.target;
      if(!details.open)return;
      if(details.matches('.builder-lazy-number')&&details.dataset.rendered!=='1'){
        const slot=details.querySelector(':scope > .builder-lazy-slot');
        slot.innerHTML=details.dataset.builderKind==='practical'?practicalContent():standardNumberContent(Number(details.dataset.number));
        details.dataset.rendered='1';typeset(slot);
      }else if(details.matches('.builder-lazy-prototype')&&details.dataset.rendered!=='1'){
        const slot=details.querySelector(':scope > .builder-lazy-prototype-slot');
        slot.innerHTML=prototypeContent(Number(details.dataset.number),Number(details.dataset.prototype));
        details.dataset.rendered='1';typeset(slot);
      }
    },true);

    root.addEventListener('click',event=>{
      const taskBtn=event.target.closest('[data-builder-lazy-task]');
      if(taskBtn){event.preventDefault();event.stopPropagation();toggleTask(taskBtn.dataset.builderLazyTask);return;}
      const setBtn=event.target.closest('[data-builder-lazy-set]');
      if(setBtn){event.preventDefault();event.stopPropagation();const [typeKey,setNo]=setBtn.dataset.builderLazySet.split(':');if(typeof togglePracticalSet==='function')togglePracticalSet(typeKey,Number(setNo));}
    });

    if(document.querySelector('#page-builder.page.active'))window.renderBuilderBank();
  },0);
})();