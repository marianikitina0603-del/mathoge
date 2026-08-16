// Расширенный предпросмотр: практические комплекты №1–5 с общим условием,
// планом, таблицами и страницей ответов для учителя.
(function(){
  const routeAnswers={"1.1":"142","2.1":"41","3.1":"29","4.1":"116","5.1":"930","1.1.1":"342","2.1.1":"35","3.1.1":"25","4.1.1":"118","5.1.1":"746","1.1.2":"432","2.1.2":"35","3.1.2":"25","4.1.2":"150","5.1.2":"256","1.1.3":"132","2.1.3":"23","3.1.3":"17","4.1.3":"150","5.1.3":"1540","1.1.4":"143","2.1.4":"42","3.1.4":"30","4.1.4":"168","5.1.4":"570","1.1.5":"234","2.1.5":"34","3.1.5":"26","4.1.5":"162","5.1.5":"957","1.1.6":"421","2.1.6":"34","3.1.6":"68","4.1.6":"102","5.1.6":"1096","1.1.7":"243","2.1.7":"56","3.1.7":"40","4.1.7":"87","5.1.7":"1915","1.1.8":"213","2.1.8":"56","3.1.8":"40","4.1.8":"168","5.1.8":"1134","1.1.9":"431","2.1.9":"34","3.1.9":"26","4.1.9":"170","5.1.9":"433","1.1.10":"423","2.1.10":"28","3.1.10":"20","4.1.10":"80","5.1.10":"1246","1.1.11":"132","2.1.11":"17","3.1.11":"13","4.1.11":"85","5.1.11":"1272","1.1.12":"413","2.1.12":"49","3.1.12":"35","4.1.12":"196","5.1.12":"259","1.1.13":"234","2.1.13":"41","3.1.13":"29","4.1.13":"206","5.1.13":"786","1.1.14":"412","2.1.14":"63","3.1.14":"45","4.1.14":"150","5.1.14":"1358","1.1.15":"413","2.1.15":"51","3.1.15":"39","4.1.15":"158,8","5.1.15":"3240","1.1.16":"421","2.1.16":"23","3.1.16":"17","4.1.16":"55,2","5.1.16":"829","1.1.17":"321","2.1.17":"14","3.1.17":"10","4.1.17":"61,6","5.1.17":"1316","1.1.18":"423","2.1.18":"46","3.1.18":"34","4.1.18":"51","5.1.18":"438","1.1.19":"123","2.1.19":"28","3.1.19":"20","4.1.19":"48","5.1.19":"599","1.2":"4625","2.2":"8","3.2":"15","4.2":"57,2","5.2":"9,2","1.2.1":"2435","2.2.1":"8","3.2.1":"17","4.2.1":"55,6","5.2.1":"8,2","1.2.2":"7632","2.2.2":"6","3.2.2":"25","4.2.2":"54","5.2.2":"9,1","1.2.3":"7425","2.2.3":"21","3.2.3":"29","4.2.3":"58","5.2.3":"7,7"};

  const style=document.createElement('style');
  style.textContent=`
    #previewList .preview-practical-block{margin:0 0 24px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}
    #previewList .preview-practical-head{padding:12px 16px;background:#f5f7fb;border-bottom:1px solid var(--line);font-weight:800}
    #previewList .preview-practical-context{padding:16px;line-height:1.42;border-bottom:1px solid var(--line)}
    #previewList .preview-practical-context-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,38%);gap:20px;align-items:start}
    #previewList .preview-practical-context-copy{min-width:0;line-height:1.42}
    #previewList .preview-plan{margin:0;padding:12px;border:1px solid var(--line);border-radius:12px;background:#fff;text-align:center}
    #previewList .preview-plan-title{font-size:12px;font-weight:800;color:var(--muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.04em}
    #previewList .preview-plan img{display:block;width:100%;max-width:100%;height:auto;max-height:460px;object-fit:contain;margin:0 auto}
    #previewList .preview-plan-missing{padding:16px;color:var(--muted);font-size:13px;border:1px dashed var(--line);border-radius:10px}
    #previewList .preview-practical-tasks{padding:0 16px 16px}
    #previewList .preview-practical-tasks .preview-task{padding:16px 0;border-bottom:1px solid var(--line)}
    #previewList .preview-practical-tasks .preview-task:last-child{border-bottom:0}
    #previewList .preview-task .task-math{line-height:1.45!important;margin-top:6px;margin-bottom:10px}
    #previewList .route-data-table{width:100%;max-width:100%;table-layout:auto;margin:10px 0;border-collapse:collapse;background:#fff;font-size:13px}
    #previewList .route-data-table th,#previewList .route-data-table td{border:1.4px solid #3f4652;padding:6px 7px;text-align:center;vertical-align:middle;white-space:normal;overflow-wrap:anywhere;word-break:normal}
    #previewList .route-data-table th{font-weight:800;background:#f5f7fb}
    #previewList .route-task1-table td:first-child{font-weight:700;text-align:left;background:#f5f7fb}
    #previewList .route-task1-table .answer-cell{height:30px;min-width:52px;background:#fff}
    #previewList .preview-table-scroll{overflow-x:auto;max-width:100%}
    #previewList .teacher-answer-page{margin-top:34px;padding:28px;border:2px solid var(--line);border-radius:16px;background:#fff;break-before:page;page-break-before:always}
    #previewList .teacher-answer-kicker{font-size:12px;font-weight:800;color:var(--primary);letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px}
    #previewList .teacher-answer-page h2{margin:0 0 5px;font-size:24px}
    #previewList .teacher-answer-subtitle{margin:0 0 16px;color:var(--muted);font-size:13px;line-height:1.35}
    #previewList .teacher-answer-table{width:100%;border-collapse:collapse;font-size:13px}
    #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{border:1px solid #777f8b;padding:7px 9px;vertical-align:middle}
    #previewList .teacher-answer-table th{background:#f5f7fb;text-align:left;font-weight:800}
    #previewList .teacher-answer-table td:first-child{width:60px;text-align:center;font-weight:800}
    #previewList .teacher-answer-table td:nth-child(2){width:105px;color:var(--muted)}
    #previewList .teacher-answer-value{font-size:15px;font-weight:800}
    #previewList .teacher-answer-missing{color:var(--muted)}
    @media(max-width:850px){#previewList .preview-practical-context-grid{grid-template-columns:1fr}#previewList .preview-plan{margin-top:4px}#previewList .preview-plan img{width:auto}}
    @media print{
      @page{size:A4;margin:10mm}
      #previewList .preview-practical-block{break-inside:auto;border:0;margin-bottom:12px}
      #previewList .preview-practical-head{border:0;padding:4px 0 7px;font-size:12px}
      #previewList .preview-practical-context{padding:6px 0 8px;line-height:1.28}
      #previewList .preview-practical-context-copy{line-height:1.28;font-size:11.5px}
      #previewList .preview-practical-context-grid{grid-template-columns:minmax(0,1fr) 34%;gap:12px}
      #previewList .preview-plan{padding:6px;break-inside:avoid}
      #previewList .preview-plan-title{font-size:9px;margin-bottom:4px}
      #previewList .preview-plan img{max-height:240px}
      #previewList .preview-practical-tasks{padding:0}
      #previewList .preview-practical-tasks .preview-task{padding:8px 0}
      #previewList .preview-task{break-inside:avoid}
      #previewList .preview-task h4{margin:0 0 3px;font-size:11.5px}
      #previewList .preview-task .task-math{font-size:11px!important;line-height:1.28!important;margin:2px 0 5px!important}
      #previewList .preview-table-scroll{overflow:visible!important;width:100%;max-width:100%}
      #previewList .route-data-table{width:100%!important;max-width:100%!important;table-layout:fixed!important;font-size:8.5px!important;margin:5px 0!important}
      #previewList .route-data-table th,#previewList .route-data-table td{padding:3px 3px!important;font-size:8.5px!important;line-height:1.15!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:break-word!important}
      #previewList .route-task1-table .answer-cell{height:20px!important;min-width:0!important}
      #previewList .answer-line{margin-top:4px!important}
      #previewList .teacher-answer-page{margin:0;padding:0;border:0;border-radius:0;break-before:page;page-break-before:always}
      #previewList .teacher-answer-table{font-size:10px}
      #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{border-color:#555;padding:4px 6px}
    }
  `;
  document.head.appendChild(style);

  function esc(s){return String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
  function practicalKey(t){return `${t.practicalType||'practical'}:${t.set||0}`;}
  function planSource(group){const first=group[0]||{};if(first.planImage)return first.planImage;if(first.image)return first.image;if(first.practicalType==='routes'&&first.set)return `assets/routes-data/route-plan-${String(first.set).padStart(2,'0')}.png`;return '';}
  function formattedTaskText(t){const html=(typeof window.formatPracticalText==='function')?window.formatPracticalText(t):(typeof formatPracticalText==='function'?formatPracticalText(t):t.text);return String(html).replace(/(<table class="route-data-table[\s\S]*?<\/table>)/g,'<div class="preview-table-scroll">$1</div>');}
  function answerLine(){return `<div class="answer-line"><span>Ответ:</span><div class="answer-boxes"></div></div>`;}
  function answerFor(t){if(t.answer!==undefined&&t.answer!==null&&String(t.answer).trim()!=='')return String(t.answer);return routeAnswers[t.id]||routeAnswers[t.sourceId]||routeAnswers[t.fipiId]||'';}

  function renderOneTask(t,displayNumber){const text=(t.number>=1&&t.number<=5)?formattedTaskText(t):t.text;return `<article class="preview-task"><div class="preview-task-number">${displayNumber}.</div><div><h4>Задание №${t.number}</h4><p class="task-math">${text}</p>${answerLine()}</div></article>`;}

  function renderPracticalGroup(group,startNumber){
    const sorted=[...group].sort((a,b)=>a.number-b.number),first=sorted[0]||{},context=sorted.find(t=>t.context)?.context||'',src=planSource(sorted);
    const typeTitle=(typeof practicalSetStructure!=='undefined'&&practicalSetStructure.find(x=>x.key===first.practicalType)?.title)||'Практические задания';
    const tasksHtml=sorted.map((t,i)=>renderOneTask(t,startNumber+i)).join('');
    const plan=src?`<div class="preview-plan"><div class="preview-plan-title">План к заданиям 1–5</div><img src="${esc(src)}" alt="План к комплекту ${esc(first.set)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="preview-plan-missing" style="display:none">Изображение не найдено.</div></div>`:'';
    const contextArea=(context||plan)?`<div class="preview-practical-context"><div class="preview-practical-context-grid"><div class="preview-practical-context-copy">${context}</div>${plan}</div></div>`:'';
    return `<section class="preview-practical-block"><div class="preview-practical-head">№1–5 · ${typeTitle} · Комплект ${esc(first.set)}</div>${contextArea}<div class="preview-practical-tasks">${tasksHtml}</div></section>`;
  }

  function renderTeacherPage(){
    const rows=variant.map((t,i)=>{const answer=answerFor(t);return `<tr><td>${i+1}</td><td>${esc(t.id||'')}</td><td>${answer?`<span class="teacher-answer-value">${esc(answer)}</span>`:'<span class="teacher-answer-missing">Ответ не загружен</span>'}</td></tr>`;}).join('');
    return `<section class="teacher-answer-page"><div class="teacher-answer-kicker">Для учителя</div><h2>Ответы</h2><p class="teacher-answer-subtitle">Ключ к тренировочному варианту. Страница печатается отдельно после версии ученика.</p><table class="teacher-answer-table"><thead><tr><th>№</th><th>ID ФИПИ</th><th>Ответ</th></tr></thead><tbody>${rows}</tbody></table></section>`;
  }

  window.renderPreview=function(){
    const name=$('#variantName')?.value.trim()||'Тренировочный вариант';
    $('#previewTitle').textContent=name;$('#previewMeta').textContent=`${variant.length} заданий`;
    if(!variant.length){$('#previewList').innerHTML='<p class="muted">Вариант пуст.</p>';return;}
    const renderedPractical=new Set();let html='',displayNumber=1;
    variant.forEach(t=>{if(t.number>=1&&t.number<=5&&t.practicalType&&t.set){const key=practicalKey(t);if(renderedPractical.has(key))return;renderedPractical.add(key);const group=variant.filter(x=>x.number>=1&&x.number<=5&&practicalKey(x)===key);html+=renderPracticalGroup(group,displayNumber);displayNumber+=group.length;}else html+=renderOneTask(t,displayNumber++);});
    html+=renderTeacherPage();
    $('#previewList').innerHTML=html;
  };
})();
