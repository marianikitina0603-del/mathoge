// Пустая структура банка для номеров ОГЭ №7–25.
(function(){
  const numbers=Array.from({length:19},(_,i)=>i+7);

  function emptyNumberHtml(number){
    return `<details class="number-accordion empty-number-accordion" data-empty-number="${number}">
      <summary class="number-summary">
        <span class="accordion-chevron">›</span>
        <span class="number-badge">№${number}</span>
        <span class="number-title">Задание №${number}</span>
        <span class="number-stats">0 заданий</span>
      </summary>
      <div class="number-content"><div class="empty-bank compact-empty">Задания ещё не добавлены.</div></div>
    </details>`;
  }

  function appendMissing(root){
    if(!root)return;
    numbers.forEach(number=>{
      const hasReal=tasks.some(t=>t.number===number);
      const existing=root.querySelector(`[data-empty-number="${number}"]`);
      if(hasReal){if(existing)existing.remove();return;}
      if(!existing)root.insertAdjacentHTML('beforeend',emptyNumberHtml(number));
    });
  }

  function wrapRenderer(name,rootSelector){
    const original=window[name];
    if(typeof original!=='function'||original.__emptyNumbersWrapped)return;
    const wrapped=function(...args){
      const result=original.apply(this,args);
      appendMissing(document.querySelector(rootSelector));
      return result;
    };
    wrapped.__emptyNumbersWrapped=true;
    window[name]=wrapped;
  }

  function install(){
    wrapRenderer('renderBank','#taskList');
    wrapRenderer('renderBuilderBank','#builderBankList');
    if(typeof window.renderBank==='function')window.renderBank();else appendMissing(document.querySelector('#taskList'));
    if(typeof window.renderBuilderBank==='function')window.renderBuilderBank();else appendMissing(document.querySelector('#builderBankList'));
  }

  function loadSection(number,src){
    if(document.querySelector(`script[data-number-loader="${number}"]`))return;
    const s=document.createElement('script');
    s.src=src;
    s.async=true;
    s.dataset.numberLoader=String(number);
    document.body.appendChild(s);
  }

  install();
  loadSection(18,'js/number18-loader.js?v=20260830-n18-4');
  loadSection(24,'js/number24-loader.js?v=20260830-n24-1');
  loadSection(25,'js/number25-loader.js?v=20260830-n25-1');
  setTimeout(install,500);
  setTimeout(install,1500);
})();
