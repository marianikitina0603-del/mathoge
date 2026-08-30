// Быстрые генераторы на главной странице.
(function(){
  const byId=id=>document.getElementById(id);
  const ranges={
    part1:Array.from({length:19},(_,i)=>i+1),
    part2:Array.from({length:6},(_,i)=>i+20),
    core:Array.from({length:14},(_,i)=>i+6),
    algebra:[6,7,8,9,10,11,12,13,14,20,21,22],
    geometry:[15,16,17,18,19,23,24,25]
  };

  function uniqueNumbers(items){return [...new Set(items)].sort((a,b)=>a-b)}
  function randomOf(items){return items[Math.floor(Math.random()*items.length)]}
  function realTasksForNumber(number){
    return tasks.filter(t=>t && Number(t.number)===number && t.text && !t.placeholder);
  }
  function selectRandomTasks(numbers){
    const selected=[]; const missing=[];
    uniqueNumbers(numbers).forEach(number=>{
      const pool=realTasksForNumber(number);
      if(pool.length)selected.push(randomOf(pool)); else missing.push(number);
    });
    return {selected,missing};
  }
  function setVariant(selected,title){
    variant=[...selected];
    localStorage.setItem('mathoge-current',JSON.stringify(variant));
    const name=byId('variantName'); if(name)name.value=title;
    if(typeof updateCounters==='function')updateCounters();
    if(typeof renderBuilder==='function')renderBuilder();
    if(typeof renderBuilderBank==='function')renderBuilderBank();
    if(typeof renderBank==='function')renderBank();
  }
  async function ensureBank(){
    if(typeof window.loadFullMathOGEBank==='function'){
      await window.loadFullMathOGEBank();
      // №18, 24 и 25 загружаются дополнительными loader-скриптами.
      await new Promise(resolve=>setTimeout(resolve,650));
    }
  }
  function missingText(missing){return missing.length?` Пока нет заданий №${missing.join(', ')}.`:''}
  async function generate(numbers,title){
    try{
      await ensureBank();
      const {selected,missing}=selectRandomTasks(numbers);
      if(!selected.length){
        if(typeof toast==='function')toast('Для выбранных номеров пока нет заданий');
        return;
      }
      setVariant(selected,title);
      if(typeof toast==='function')toast(`Сгенерировано: ${selected.length} заданий.${missingText(missing)}`);
      if(typeof go==='function')go('preview');
    }catch(e){console.error(e); if(typeof toast==='function')toast('Не удалось загрузить банк заданий')}
  }

  function chips(containerId,numbers){
    const root=byId(containerId); if(!root)return;
    root.innerHTML=numbers.map(n=>`<label class="home-number-chip"><input type="checkbox" value="${n}" checked><span>№${n}</span></label>`).join('');
  }
  function checked(containerId){
    const root=byId(containerId); if(!root)return [];
    return [...root.querySelectorAll('input[type="checkbox"]:checked')].map(x=>Number(x.value));
  }
  function bindSelectionTools(prefix,numbers){
    byId(prefix+'All')?.addEventListener('click',()=>{
      const root=byId(prefix+'Numbers'); if(root)root.querySelectorAll('input').forEach(x=>x.checked=true);
    });
    byId(prefix+'None')?.addEventListener('click',()=>{
      const root=byId(prefix+'Numbers'); if(root)root.querySelectorAll('input').forEach(x=>x.checked=false);
    });
  }

  // DEMO — служебный признак в данных. На сайте эта подпись пользователю не показывается.
  function removeDemoLabels(root=document.body){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(/\bDEMO\b/i.test(node.nodeValue||'')){
        node.nodeValue=node.nodeValue.replace(/\bDEMO\b/gi,'').replace(/\s{2,}/g,' ');
      }
    });
  }
  function installDemoCleaner(){
    removeDemoLabels();
    let queued=false;
    const observer=new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;removeDemoLabels();});
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  function install(){
    chips('algebraNumbers',ranges.algebra); chips('geometryNumbers',ranges.geometry);
    bindSelectionTools('algebra',ranges.algebra); bindSelectionTools('geometry',ranges.geometry);
    byId('generatePart1')?.addEventListener('click',()=>generate(ranges.part1,'Случайная часть 1'));
    byId('generatePart2')?.addEventListener('click',()=>generate(ranges.part2,'Случайная часть 2'));
    byId('generateCore')?.addEventListener('click',()=>generate(ranges.core,'Случайные задания №6–19'));
    byId('generateAlgebraFive')?.addEventListener('click',()=>{
      const nums=checked('algebraNumbers');
      if(!nums.length){if(typeof toast==='function')toast('Выберите хотя бы один номер');return;}
      generate(nums,'Пятиминутка по алгебре');
    });
    byId('generateGeometryFive')?.addEventListener('click',()=>{
      const nums=checked('geometryNumbers');
      if(!nums.length){if(typeof toast==='function')toast('Выберите хотя бы один номер');return;}
      generate(nums,'Пятиминутка по геометрии');
    });
    installDemoCleaner();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install); else install();
})();
