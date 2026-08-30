// №22. Дополнительное место для построения графика в печатной версии.
(function(){
  const style=document.createElement('style');
  style.textContent=`
    #previewList .preview-task[data-task-number="22"] .solution-grid-svg{height:260px}
    @media print{
      #previewList .preview-task[data-task-number="22"] .solution-grid{height:260px!important}
      #previewList .preview-task[data-task-number="22"] .solution-grid-svg{height:260px!important}
    }
  `;
  document.head.appendChild(style);
})();
