// Пустая структура банка №7–25.
// Пункты отображаются заранее и автоматически перестают быть заглушками,
// когда для соответствующего номера появятся реальные задания.
(function(){
  function existingNumbers(root){
    return new Set([...root.querySelectorAll(':scope > .number-accordion > .number-summary .number-badge')]
      .map(el=>Number(String(el.textContent).replace(/[^0-9]/g,'')))
      .filter(Number.isFinite));
  }

  function emptyNumberHtml(number){
    return `<details class="number-accordion empty-number-accordion" data-empty-number="${number}">
      <summary class="number-summary">
        <span class="accordion-chevron">›</span>
        <span class="number-badge">№${number}</span>
        <span class="number-title">Задание №${number}</span>
        <span class="number-stats">0 заданий</span>
      </summary>
      <div class="number-content">
        <div class="empty-bank compact-empty">Задания ещё не добавлены.</div>
      </div>
    </details>`;
  }

  function ensureEmptyNumbers(rootSelector){
    const root=document.querySelector(rootSelector);
    if(!root)return;
    const present=existingNumbers(root);
    for(let number=7;number<=25;number++){
      if(!present.has(number))root.insertAdjacentHTML('beforeend',emptyNumberHtml(number));
    }
  }

  function refresh(){
    ensureEmptyNumbers('#taskList');
    ensureEmptyNumbers('#builderBankList');
  }

  const originalRenderBank=window.renderBank;
  if(typeof originalRenderBank==='function'){
    window.renderBank=function(){
      const result=originalRenderBank.apply(this,arguments);
      ensureEmptyNumbers('#taskList');
      return result;
    };
  }

  const originalRenderBuilderBank=window.renderBuilderBank;
  if(typeof originalRenderBuilderBank==='function'){
    window.renderBuilderBank=function(){
      const result=originalRenderBuilderBank.apply(this,arguments);
      ensureEmptyNumbers('#builderBankList');
      return result;
    };
  }

  refresh();
  setTimeout(refresh,100);
})();
