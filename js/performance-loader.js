// Отложенная загрузка тяжёлой части банка заданий.
// Главная страница остаётся лёгкой; полный банк подгружается только тогда,
// когда пользователь действительно открывает банк, конструктор или запускает генерацию.
(function(){
  const BANK_SRC='js/plots-format.js?v=20260830-perf-2';
  let bankPromise=null;

  function showLoadingHint(){
    const bank=document.querySelector('#taskList');
    if(bank && !document.querySelector('#taskList .mathoge-bank-loading')){
      bank.insertAdjacentHTML('afterbegin','<div class="empty-bank compact-empty mathoge-bank-loading">Загружаю полный банк заданий…</div>');
    }
    const builder=document.querySelector('#builderBankList');
    if(builder && !document.querySelector('#builderBankList .mathoge-bank-loading')){
      builder.insertAdjacentHTML('afterbegin','<div class="empty-bank compact-empty mathoge-bank-loading">Загружаю полный банк заданий…</div>');
    }
  }

  function clearLoadingHint(){
    document.querySelectorAll('.mathoge-bank-loading').forEach(node=>node.remove());
  }

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

  // Загружаем тяжёлые данные только по реальному намерению пользователя.
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-page="bank"],[data-page="builder"],[data-go="bank"],[data-go="builder"],#generatePart1,#generatePart2,#generateCore,#generateAlgebraFive,#generateGeometryFive');
    if(target)window.loadFullMathOGEBank().catch(console.error);
  },true);

  // Если страница была открыта сразу на банке/конструкторе сторонним кодом — подстрахуемся.
  const observer=new MutationObserver(()=>{
    const bankOpen=document.querySelector('#page-bank.page.active');
    const builderOpen=document.querySelector('#page-builder.page.active');
    if(bankOpen||builderOpen){window.loadFullMathOGEBank().catch(console.error);observer.disconnect();}
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
})();
