// Единое математическое отображение дробей в №8: числитель над знаменателем.
(function(){
  const F=(a,b)=>`<span class="mfrac"><span>${a}</span><span>${b}</span></span>`;

  function splitTopLevelSlash(s){
    let round=0, angle=0;
    for(let i=0;i<s.length;i++){
      if(s[i]==='<'){ angle++; continue; }
      if(s[i]==='>'&&angle){ angle--; continue; }
      if(angle) continue;
      if(s[i]==='(') round++;
      else if(s[i]===')') round=Math.max(0,round-1);
      else if(s[i]==='/'&&round===0) return i;
    }
    return -1;
  }

  function matchingParen(s,start){
    let depth=0;
    for(let i=start;i<s.length;i++){
      if(s[i]==='(') depth++;
      else if(s[i]===')'){
        depth--;
        if(depth===0) return i;
      }
    }
    return -1;
  }

  function convertParenFractions(s){
    let out='', i=0;
    while(i<s.length){
      if(s[i]!=='('){ out+=s[i++]; continue; }
      const end=matchingParen(s,i);
      if(end<0){ out+=s[i++]; continue; }
      const inner=s.slice(i+1,end);
      const slash=splitTopLevelSlash(inner);
      if(slash>=0){
        const a=convert(inner.slice(0,slash).trim());
        const b=convert(inner.slice(slash+1).trim());
        out+=`(${F(a,b)})`;
      }else out+=`(${convert(inner)})`;
      i=end+1;
    }
    return out;
  }

  function convert(s){
    s=String(s||'');
    if(!s.includes('/')) return s;

    // Сначала преобразуем дроби внутри скобок, включая сложные знаменатели.
    s=convertParenFractions(s);

    // 1/(...) после обработки скобок: знаменатель может содержать корни и знаки.
    s=s.replace(/\b1\s*\/\s*\(([^()]*)\)/g,(_,b)=>F('1',b));

    // Обычные числовые дроби, в том числе коэффициенты под корнем.
    s=s.replace(/\b(\d+)\s*\/\s*(\d+)\b/g,(_,a,b)=>F(a,b));

    // Деление на скобочное выражение со степенью: 54/(3√2)².
    s=s.replace(/([^\s+−=]+)\s*\/\s*(\([^()]+\)(?:<sup>[^<]+<\/sup>|²)?)/g,(_,a,b)=>F(a,b));

    // Дроби с корнями/степенями: √a·√b/√c, a^m/a^n и аналогичные.
    s=s.replace(/((?:[\w√−]+(?:<sup>[^<]+<\/sup>|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)(?:\s*·\s*[\w√−]+(?:<sup>[^<]+<\/sup>|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)*)\s*\/\s*([\w√−]+(?:<sup>[^<]+<\/sup>|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)/g,(_,a,b)=>F(a,b));

    return s;
  }

  tasks.filter(t=>t.number===8).forEach(t=>{t.text=convert(t.text);});
})();