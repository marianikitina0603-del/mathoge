// Таблицы для практических заданий «Участки».
(function(){
  const base=window.formatPracticalText;
  window.formatPracticalText=function(t){
    if(t&&t.practicalType==='plots'&&t.number===1){
      const lines=String(t.text||'').split('<br>');
      const rowIndex=lines.findIndex(line=>/^\s*Объекты\s+/i.test(line));
      if(rowIndex>=0){
        const row=lines[rowIndex].trim();
        const objects=row.replace(/^\s*Объекты\s+/i,'').trim().split(/\s+/).filter(Boolean);
        const digitsIndex=lines.findIndex((line,i)=>i>rowIndex&&/^\s*Цифры\s*$/i.test(line));
        const before=lines.slice(0,rowIndex).join('<br>');
        const after=digitsIndex>=0?lines.slice(digitsIndex+1).join('<br>'):'';
        const table=`<table class="route-data-table route-task1-table"><tbody><tr><td>Объекты</td>${objects.map(x=>`<td>${x}</td>`).join('')}</tr><tr><td>Цифры</td>${objects.map(()=>'<td class="answer-cell">&nbsp;</td>').join('')}</tr></tbody></table>`;
        return `${before}${before?'<br>':''}${table}${after?'<br>'+after:''}`;
      }
    }
    return typeof base==='function'?base(t):(t?.text||'');
  };
})();
