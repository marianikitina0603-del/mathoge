// Дополнительный режим печати: только задания, две уменьшенные страницы на одном A4 landscape.
(function(){
  const btn=document.getElementById('printTasksTwoUp');
  if(!btn)return;

  function openTwoUpPrint(){
    if(typeof window.renderPreview==='function')window.renderPreview();
    const source=document.getElementById('examPaper');
    if(!source)return;
    const clone=source.cloneNode(true);
    clone.querySelectorAll('.teacher-answer-page,.solution-grid,.answer-line').forEach(el=>el.remove());

    // Формируем две логические страницы A5 portrait, которые браузер размещает рядом на A4 landscape.
    const content=clone.querySelector('#previewList');
    const head=clone.querySelector('.exam-head');
    const blocks=content?[...content.children]:[];
    const pages=[];let page=document.createElement('section');page.className='two-up-page';
    if(head){const h=head.cloneNode(true);page.appendChild(h);}
    let used=0;
    blocks.forEach(block=>{
      const copy=block.cloneNode(true);
      // Оценка высоты нужна только для предварительного разбиения; CSS не допускает разрыва самих заданий.
      const weight=Math.max(1,copy.querySelectorAll('.preview-task').length)+(copy.textContent||'').length/1500;
      if(used>0&&used+weight>4.7){pages.push(page);page=document.createElement('section');page.className='two-up-page';used=0;}
      page.appendChild(copy);used+=weight;
    });
    if(page.children.length)pages.push(page);

    const w=window.open('','_blank','noopener,noreferrer');
    if(!w){alert('Разрешите всплывающие окна для печати.');return;}
    const css=`@page{size:A4 landscape;margin:7mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#111}body{display:grid;grid-template-columns:1fr 1fr;column-gap:8mm;align-items:start}.two-up-page{width:100%;min-width:0;padding:0 2mm 0 0;break-inside:avoid;page-break-inside:avoid}.two-up-page:nth-child(2n){border-left:1px dashed #aaa;padding-left:6mm;padding-right:0}.two-up-page:nth-child(2n+1):not(:first-child){break-before:page;page-break-before:always}.exam-head{display:flex;justify-content:space-between;gap:8px;border-bottom:1px solid #aaa;padding-bottom:4px;margin-bottom:6px}.exam-kicker{font-size:6.5pt}.exam-head h2{font-size:10pt;margin:1px 0}.exam-meta{font-size:6.5pt}.preview-practical-block{border:0;margin:0 0 5px}.preview-practical-head{font-size:7.2pt;font-weight:bold;padding:2px 0}.preview-practical-context{padding:2px 0 4px}.preview-practical-context-grid{display:grid;grid-template-columns:minmax(0,1fr) 32%;gap:4mm}.preview-practical-context-copy{font-size:6.7pt;line-height:1.18}.preview-plan{padding:2px;border:1px solid #bbb;text-align:center}.preview-plan-title{font-size:5.5pt}.preview-plan img{display:block;max-width:100%;max-height:95px;margin:auto;object-fit:contain}.preview-practical-tasks{padding:0}.preview-task{display:grid;grid-template-columns:15px 1fr;gap:3px;padding:3px 0;border-bottom:1px solid #bbb;break-inside:avoid;page-break-inside:avoid}.preview-task-number{font-size:7pt;font-weight:bold}.preview-task h4{font-size:7pt;margin:0 0 1px}.task-math{font-size:7pt!important;line-height:1.18!important;margin:0!important}.route-data-table,table{width:100%!important;border-collapse:collapse!important;table-layout:fixed!important;font-size:5.8pt!important;margin:2px 0!important}.route-data-table th,.route-data-table td,table th,table td{border:1px solid #555!important;padding:1px 2px!important;font-size:5.8pt!important;line-height:1.05!important;overflow-wrap:anywhere}.preview-table-scroll{overflow:visible}.stove-task-diagram img{max-height:95px!important;width:auto!important;max-width:100%!important}.teacher-answer-page,.solution-grid,.answer-line{display:none!important}@media screen{body{width:297mm;min-height:210mm;padding:7mm;background:#eee}.two-up-page{background:#fff;min-height:196mm}}`;
    w.document.open();w.document.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Печать заданий — 2 страницы на листе</title><style>${css}</style></head><body>${pages.map(p=>p.outerHTML).join('')}</body></html>`);w.document.close();
    w.addEventListener('load',()=>setTimeout(()=>w.print(),250));
  }
  btn.addEventListener('click',openTwoUpPrint);
})();