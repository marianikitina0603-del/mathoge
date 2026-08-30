// Жёсткая фиксация размеров рисунков только для обычной печати варианта с решением.
// Режим «2 задания на листе» печатает собственный iframe и этим кодом не затрагивается.
(function(){
  if(window.__ordinaryPrintImageFixInstalled)return;
  window.__ordinaryPrintImageFixInstalled=true;

  let backups=[];

  function remember(el){
    if(backups.some(x=>x.el===el))return;
    backups.push({el,style:el.getAttribute('style')});
  }

  function setImportant(el,name,value){
    remember(el);
    el.style.setProperty(name,value,'important');
  }

  function applyOrdinaryPrintSizes(){
    const paper=document.getElementById('examPaper');
    if(!paper)return;

    paper.querySelectorAll('.number11-diagram').forEach(img=>{
      setImportant(img,'display','block');
      setImportant(img,'float','none');
      setImportant(img,'width','auto');
      setImportant(img,'height','auto');
      setImportant(img,'max-width','65mm');
      setImportant(img,'max-height','37mm');
      setImportant(img,'object-fit','contain');
      setImportant(img,'object-position','center');
      setImportant(img,'margin','2mm auto');
    });

    paper.querySelectorAll('.number15-task-layout,.number16-task-layout,.number17-task-layout,.number18-task-layout').forEach(layout=>{
      setImportant(layout,'display','flow-root');
      setImportant(layout,'min-width','0');
    });

    paper.querySelectorAll('.number15-diagram,.number16-diagram,.number17-diagram,.number18-diagram').forEach(img=>{
      setImportant(img,'float','right');
      setImportant(img,'display','block');
      setImportant(img,'width','42mm');
      setImportant(img,'height','30mm');
      setImportant(img,'max-width','38%');
      setImportant(img,'max-height','30mm');
      setImportant(img,'object-fit','contain');
      setImportant(img,'object-position','center');
      setImportant(img,'margin','0 0 2mm 4mm');
    });
  }

  function restore(){
    backups.forEach(({el,style})=>{
      if(!el?.isConnected)return;
      if(style===null)el.removeAttribute('style');
      else el.setAttribute('style',style);
    });
    backups=[];
  }

  // Срабатывает непосредственно перед стандартным window.print().
  window.addEventListener('beforeprint',applyOrdinaryPrintSizes);
  window.addEventListener('afterprint',restore);

  // Дополнительно применяем раньше обработчика print-two-up.js,
  // чтобы размеры точно успели попасть в браузерный предпросмотр печати.
  document.addEventListener('click',event=>{
    const btn=event.target.closest('#printVariant');
    if(btn)applyOrdinaryPrintSizes();
  },true);
})();
