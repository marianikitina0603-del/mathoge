// Единое математическое отображение дробей в №8: числитель над знаменателем.
(function(){
  const F=(a,b)=>`<span class="mfrac"><span>${a}</span><span>${b}</span></span>`;

  function splitTopLevelSlash(s){
    let round=0, inTag=false;
    for(let i=0;i<s.length;i++){
      if(s[i]==='<'){inTag=true;continue;}
      if(s[i]==='>'&&inTag){inTag=false;continue;}
      if(inTag) continue;
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

  // Для семейств 25–29 дробная черта относится ко всему произведению в числителе.
  function convertWholeAlgebraFraction(text){
    const prefix='Найдите значение выражения ';
    if(!text.startsWith(prefix)) return null;
    const rest=text.slice(prefix.length);
    const marker=' при ';
    const mi=rest.indexOf(marker);
    if(mi<0) return null;
    const expr=rest.slice(0,mi).trim();
    const tail=rest.slice(mi);
    const slash=splitTopLevelSlash(expr);
    if(slash<0) return null;
    const numerator=expr.slice(0,slash).trim();
    const denominator=expr.slice(slash+1).trim();
    return `${prefix}${F(numerator,denominator)}${tail}`;
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

    s=convertParenFractions(s);
    s=s.replace(/\b1\s*\/\s*\(([^()]*)\)/g,(_,b)=>F('1',b));
    s=s.replace(/\b(\d+)\s*\/\s*(\d+)\b/g,(_,a,b)=>F(a,b));
    s=s.replace(/([^\s+−=]+)\s*\/\s*(\([^()]+\)(?:<sup>[^<]+<\/sup>|²)?)/g,(_,a,b)=>F(a,b));
    s=s.replace(/((?:[\w√−]+(?:<sup>[^<]+<\/sup>|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)(?:\s*·\s*[\w√−]+(?:<sup>[^<]+<\/sup>|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)*)\s*\/\s*([\w√−]+(?:<sup>[^<]+<\/sup>|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)/g,(_,a,b)=>F(a,b));
    return s;
  }

  tasks.filter(t=>t.number===8).forEach(t=>{
    // 25–29: числитель должен включать всё произведение, а знаменатель — всё выражение после черты.
    if(t.prototype>=25 && t.prototype<=29){
      const whole=convertWholeAlgebraFraction(String(t.text||''));
      if(whole){t.text=whole;return;}
    }
    t.text=convert(t.text);
  });
})();