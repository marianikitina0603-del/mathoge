// Расширенный предпросмотр: практические комплекты №1–5 с общим условием,
// планом, таблицами и страницей ответов для учителя.
(function(){
  const routeAnswers={"1.1":"142","2.1":"41","3.1":"29","4.1":"116","5.1":"930","1.1.1":"342","2.1.1":"35","3.1.1":"25","4.1.1":"118","5.1.1":"746","1.1.2":"432","2.1.2":"35","3.1.2":"25","4.1.2":"150","5.1.2":"256","1.1.3":"132","2.1.3":"23","3.1.3":"17","4.1.3":"150","5.1.3":"1540","1.1.4":"143","2.1.4":"42","3.1.4":"30","4.1.4":"168","5.1.4":"570","1.1.5":"234","2.1.5":"34","3.1.5":"26","4.1.5":"162","5.1.5":"957","1.1.6":"421","2.1.6":"34","3.1.6":"68","4.1.6":"102","5.1.6":"1096","1.1.7":"243","2.1.7":"56","3.1.7":"40","4.1.7":"87","5.1.7":"1915","1.1.8":"213","2.1.8":"56","3.1.8":"40","4.1.8":"168","5.1.8":"1134","1.1.9":"431","2.1.9":"34","3.1.9":"26","4.1.9":"170","5.1.9":"433","1.1.10":"423","2.1.10":"28","3.1.10":"20","4.1.10":"80","5.1.10":"1246","1.1.11":"132","2.1.11":"17","3.1.11":"13","4.1.11":"85","5.1.11":"1272","1.1.12":"413","2.1.12":"49","3.1.12":"35","4.1.12":"196","5.1.12":"259","1.1.13":"234","2.1.13":"41","3.1.13":"29","4.1.13":"206","5.1.13":"786","1.1.14":"412","2.1.14":"63","3.1.14":"45","4.1.14":"150","5.1.14":"1358","1.1.15":"413","2.1.15":"51","3.1.15":"39","4.1.15":"158,8","5.1.15":"3240","1.1.16":"421","2.1.16":"23","3.1.16":"17","4.1.16":"55,2","5.1.16":"829","1.1.17":"321","2.1.17":"14","3.1.17":"10","4.1.17":"61,6","5.1.17":"1316","1.1.18":"423","2.1.18":"46","3.1.18":"34","4.1.18":"51","5.1.18":"438","1.1.19":"123","2.1.19":"28","3.1.19":"20","4.1.19":"48","5.1.19":"599","1.2":"4625","2.2":"8","3.2":"15","4.2":"57,2","5.2":"9,2","1.2.1":"2435","2.2.1":"8","3.2.1":"17","4.2.1":"55,6","5.2.1":"8,2","1.2.2":"7632","2.2.2":"6","3.2.2":"25","4.2.2":"54","5.2.2":"9,1","1.2.3":"7425","2.2.3":"21","3.2.3":"29","4.2.3":"58","5.2.3":"7,7"};

  const style=document.createElement('style');
  style.textContent=`
    #previewList .preview-practical-block{margin:0 0 28px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}
    #previewList .preview-practical-head{padding:14px 18px;background:#f5f7fb;border-bottom:1px solid var(--line);font-weight:800}
    #previewList .preview-practical-context{padding:18px;line-height:1.65;border-bottom:1px solid var(--line)}
    #previewList .preview-practical-context-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,38%);gap:24px;align-items:start}
    #previewList .preview-practical-context-copy{min-width:0}
    #previewList .preview-plan{margin:0;padding:14px;border:1px solid var(--line);border-radius:12px;background:#fff;text-align:center}
    #previewList .preview-plan-title{font-size:12px;font-weight:800;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.04em}
    #previewList .preview-plan img{display:block;width:100%;max-width:100%;height:auto;max-height:480px;object-fit:contain;margin:0 auto}
    #previewList .preview-plan-missing{padding:18px;color:var(--muted);font-size:13px;border:1px dashed var(--line);border-radius:10px}
    #previewList .preview-practical-tasks{padding:0 18px 18px}
    #previewList .preview-practical-tasks .preview-task{padding:20px 0;border-bottom:1px solid var(--line)}
    #previewList .preview-practical-tasks .preview-task:last-child{border-bottom:0}
    #previewList .route-data-table{width:100%;max-width:760px;margin:14px 0;border-collapse:collapse;background:#fff;font-size:14px}
    #previewList .route-data-table th,#previewList .route-data-table td{border:1.5px solid #3f4652;padding:8px 10px;text-align:center;vertical-align:middle}
    #previewList .route-data-table th{font-weight:800;background:#f5f7fb}
    #previewList .route-task1-table td:first-child{font-weight:700;text-align:left;background:#f5f7fb}
    #previewList .route-task1-table .answer-cell{height:36px;min-width:74px;background:#fff}
    #previewList .preview-table-scroll{overflow-x:auto;max-width:100%}
    #previewList .teacher-answer-page{margin-top:38px;padding:30px;border:2px solid var(--line);border-radius:16px;background:#fff;break-before:page;page-break-before:always}
    #previewList .teacher-answer-kicker{font-size:12px;font-weight:800;color:var(--primary);letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
    #previewList .teacher-answer-page h2{margin:0 0 6px;font-size:25px}
    #previewList .teacher-answer-subtitle{margin:0 0 20px;color:var(--muted);font-size:13px}
    #previewList .teacher-answer-table{width:100%;border-collapse:collapse;font-size:14px}
    #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{border:1px solid #777f8b;padding:9px 12px;vertical-align:middle}
    #previewList .teacher-answer-table th{background:#f5f7fb;text-align:left;font-weight:800}
    #previewList .teacher-answer-table td:first-child{width:70px;text-align:center;font-weight:800}
    #previewList .teacher-answer-table td:nth-child(2){width:115px;color:var(--muted)}
    #previewList .teacher-answer-value{font-size:16px;font-weight:800}
    #previewList .teacher-answer-missing{color:var(--muted)}
    @media(max-width:850px){#previewList .preview-practical-context-grid{grid-template-columns:1fr}#previewList .preview-plan{margin-top:4px}#previewList .preview-plan img{width:auto}}
    @media print{
      #previewList .preview-practical-block{break-inside:auto;border:0}
      #previewList .preview-practical-head{border:0;padding-left:0;padding-right:0}
      #previewList .preview-practical-context{padding-left:0;padding-right:0}
      #previewList .preview-practical-context-grid{grid-template-columns:minmax(0,1fr) 36%;gap:18px}
      #previewList .preview-plan{break-inside:avoid}
      #previewList .preview-task{break-inside:avoid}
      #previewList .teacher-answer-page{margin:0;padding:0;border:0;border-radius:0;break-before:page;page-break-before:always}
      #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{border-color:#555}
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
    const plan=src?`<div class="preview-plan"><div class="preview-plan-title">План к заданиям 1–5</div><img src="${esc(src)}" alt="План к комплекту ${esc(first.set)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="preview-plan-missing" style="display:none">Изображение не найдено в assets/routes-data.</div></div>`:'';
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
