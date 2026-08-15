// Расширенный предпросмотр: практические комплекты №1–5 с общим условием,
// планом и таблицами; №6+ — обычные задания.
(function(){
  const style=document.createElement('style');
  style.textContent=`
    #previewList .preview-practical-block{margin:0 0 28px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}
    #previewList .preview-practical-head{padding:14px 18px;background:#f5f7fb;border-bottom:1px solid var(--line);font-weight:800}
    #previewList .preview-practical-context{padding:18px;line-height:1.65;border-bottom:1px solid var(--line)}
    #previewList .preview-plan{margin-top:16px;padding:14px;border:1px solid var(--line);border-radius:12px;background:#fff;text-align:center}
    #previewList .preview-plan-title{font-size:12px;font-weight:800;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.04em}
    #previewList .preview-plan img{display:block;max-width:100%;height:auto;margin:0 auto}
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
    @media print{
      #previewList .preview-practical-block{break-inside:auto;border:0}
      #previewList .preview-practical-head{border:0;padding-left:0;padding-right:0}
      #previewList .preview-practical-context{padding-left:0;padding-right:0}
      #previewList .preview-plan{break-inside:avoid}
      #previewList .preview-task{break-inside:avoid}
    }
  `;
  document.head.appendChild(style);

  function esc(s){return String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
  function practicalKey(t){return `${t.practicalType||'practical'}:${t.set||0}`;}

  function planSource(group){
    const first=group[0]||{};
    if(first.planImage)return first.planImage;
    if(first.image)return first.image;
    if(first.practicalType==='routes'&&first.set){
      return `assets/routes/route-plan-${String(first.set).padStart(2,'0')}.png`;
    }
    return '';
  }

  function formattedTaskText(t){
    const html=(typeof window.formatPracticalText==='function')?window.formatPracticalText(t):
      (typeof formatPracticalText==='function'?formatPracticalText(t):t.text);
    // Позволяем широким таблицам прокручиваться, не меняя их содержимое.
    return String(html).replace(/(<table class="route-data-table[\s\S]*?<\/table>)/g,'<div class="preview-table-scroll">$1</div>');
  }

  function answerLine(){return `<div class="answer-line"><span>Ответ:</span><div class="answer-boxes"></div></div>`;}

  function renderOneTask(t,displayNumber){
    const text=(t.number>=1&&t.number<=5)?formattedTaskText(t):t.text;
    return `<article class="preview-task">
      <div class="preview-task-number">${displayNumber}.</div>
      <div><h4>Задание №${t.number}</h4><p class="task-math">${text}</p>${answerLine()}</div>
    </article>`;
  }

  function renderPracticalGroup(group,startNumber){
    const sorted=[...group].sort((a,b)=>a.number-b.number);
    const first=sorted[0]||{};
    const context=sorted.find(t=>t.context)?.context||'';
    const src=planSource(sorted);
    const typeTitle=(typeof practicalSetStructure!=='undefined'&&practicalSetStructure.find(x=>x.key===first.practicalType)?.title)||'Практические задания';
    const tasksHtml=sorted.map((t,i)=>renderOneTask(t,startNumber+i)).join('');
    const plan=src?`<div class="preview-plan"><div class="preview-plan-title">План к заданиям 1–5</div><img src="${esc(src)}" alt="План к комплекту ${esc(first.set)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="preview-plan-missing" style="display:none">Изображение плана отсутствует в репозитории.</div></div>`:'';
    return `<section class="preview-practical-block">
      <div class="preview-practical-head">№1–5 · ${typeTitle} · Комплект ${esc(first.set)}</div>
      ${context?`<div class="preview-practical-context">${context}${plan}</div>`:plan}
      <div class="preview-practical-tasks">${tasksHtml}</div>
    </section>`;
  }

  window.renderPreview=function(){
    const name=$('#variantName')?.value.trim()||'Тренировочный вариант';
    $('#previewTitle').textContent=name;
    $('#previewMeta').textContent=`${variant.length} заданий`;
    if(!variant.length){$('#previewList').innerHTML='<p class="muted">Вариант пуст.</p>';return;}

    const renderedPractical=new Set();
    let html='';
    let displayNumber=1;
    variant.forEach(t=>{
      if(t.number>=1&&t.number<=5&&t.practicalType&&t.set){
        const key=practicalKey(t);
        if(renderedPractical.has(key))return;
        renderedPractical.add(key);
        const group=variant.filter(x=>x.number>=1&&x.number<=5&&practicalKey(x)===key);
        html+=renderPracticalGroup(group,displayNumber);
        displayNumber+=group.length;
      }else{
        html+=renderOneTask(t,displayNumber++);
      }
    });
    $('#previewList').innerHTML=html;
  };
})();
