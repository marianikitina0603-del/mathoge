// Страница для учителя с ответами к текущему варианту.
(function(){
  const style=document.createElement('style');
  style.textContent=`
    #previewList .teacher-answer-page{margin-top:34px;padding:28px;border:2px solid var(--line);border-radius:16px;background:#fff;page-break-before:always;break-before:page}
    #previewList .teacher-answer-kicker{font-size:12px;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
    #previewList .teacher-answer-page h2{margin:0 0 6px;font-size:24px}
    #previewList .teacher-answer-subtitle{margin:0 0 20px;color:var(--muted);font-size:13px}
    #previewList .teacher-answer-table{width:100%;border-collapse:collapse;font-size:14px}
    #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{border:1px solid #8a909a;padding:9px 12px;text-align:left;vertical-align:middle}
    #previewList .teacher-answer-table th{background:#f5f7fb;font-weight:800}
    #previewList .teacher-answer-table td:first-child{width:76px;text-align:center;font-weight:800}
    #previewList .teacher-answer-table td:nth-child(2){width:120px;color:var(--muted)}
    #previewList .teacher-answer-value{font-size:16px;font-weight:800}
    #previewList .teacher-answer-missing{color:var(--muted);font-weight:500}
    @media print{
      #previewList .teacher-answer-page{margin-top:0;border:0;border-radius:0;padding:0;page-break-before:always;break-before:page}
      #previewList .teacher-answer-table th,#previewList .teacher-answer-table td{border-color:#555}
    }
  `;
  document.head.appendChild(style);

  function esc(s){return String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}
  function answerFor(t){
    if(t.answer!==undefined&&t.answer!==null&&String(t.answer).trim()!=='')return String(t.answer).replace(/^−/,'−');
    const map=window.fipiAnswers||{};
    return map[t.id]??map[t.sourceId]??map[t.fipiId]??'';
  }
  function teacherPage(){
    if(!Array.isArray(variant)||!variant.length)return '';
    const rows=variant.map((t,i)=>{
      const answer=answerFor(t);
      const source=t.id||t.sourceId||t.fipiId||'';
      return `<tr><td>${i+1}</td><td>${esc(source)}</td><td>${answer?`<span class="teacher-answer-value">${esc(answer)}</span>`:'<span class="teacher-answer-missing">Ответ не загружен</span>'}</td></tr>`;
    }).join('');
    return `<section class="teacher-answer-page"><div class="teacher-answer-kicker">Для учителя</div><h2>Ответы</h2><p class="teacher-answer-subtitle">Ключ к текущему тренировочному варианту.</p><table class="teacher-answer-table"><thead><tr><th>№</th><th>ID ФИПИ</th><th>Ответ</th></tr></thead><tbody>${rows}</tbody></table></section>`;
  }

  const baseRender=window.renderPreview;
  window.renderPreview=function(){
    if(typeof baseRender==='function')baseRender();
    const root=document.querySelector('#previewList');
    if(root&&variant.length)root.insertAdjacentHTML('beforeend',teacherPage());
  };
})();
