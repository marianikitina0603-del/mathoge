// Финальные размеры рисунков только для обычной печати варианта с решением.
// Скрытый iframe режима «2 задания на листе» этот файл не подключает.
(function(){
  if(document.getElementById('ordinary-print-image-fix'))return;
  const style=document.createElement('style');
  style.id='ordinary-print-image-fix';
  style.textContent=`
    @media print{
      #examPaper .number11-diagram{
        display:block!important;
        float:none!important;
        width:auto!important;
        height:auto!important;
        max-width:90mm!important;
        max-height:48mm!important;
        object-fit:contain!important;
        object-position:center!important;
        margin:2mm auto!important;
        break-inside:avoid!important;
        page-break-inside:avoid!important;
      }

      #examPaper .number15-task-layout,
      #examPaper .number16-task-layout,
      #examPaper .number17-task-layout,
      #examPaper .number18-task-layout{
        display:flow-root!important;
        min-width:0!important;
      }

      #examPaper .number15-diagram,
      #examPaper .number16-diagram,
      #examPaper .number17-diagram,
      #examPaper .number18-diagram{
        float:right!important;
        display:block!important;
        width:42mm!important;
        height:30mm!important;
        max-width:38%!important;
        max-height:30mm!important;
        object-fit:contain!important;
        object-position:center!important;
        margin:0 0 2mm 4mm!important;
        break-inside:avoid!important;
        page-break-inside:avoid!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
