// №8: математические выражения со степенями и корнями через LaTeX/MathJax.
(function(){
  function stripHtml(s){
    return String(s)
      .replace(/<sup>(.*?)<\/sup>/g,'^{$1}')
      .replace(/<[^>]+>/g,'')
      .replace(/−/g,'-')
      .replace(/·/g,'\\cdot ')
      .replace(/:/g,'\\div ')
      // Весь надстрочный показатель — одна степень: ¹⁰ → ^{10}, а не отдельные цифры.
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g,p=>`^{${Array.from(p,c=>'0123456789-+'['⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺'.indexOf(c)]).join('')}}`)
      .replace(/\s+/g,' ')
      .trim();
  }
  function matchingParen(s,start){let d=0;for(let i=start;i<s.length;i++){if(s[i]==='(')d++;else if(s[i]===')'){d--;if(d===0)return i;}}return -1;}
  function roots(s){let out='';for(let i=0;i<s.length;){if(s[i]!=='√'){out+=s[i++];continue;}if(s[i+1]==='('){const e=matchingParen(s,i+1);if(e>i){out+='\\sqrt{'+roots(s.slice(i+2,e))+'}';i=e+1;continue;}}let j=i+1;while(j<s.length&&/[A-Za-zА-Яа-я0-9.,]/.test(s[j]))j++;if(s[j]==='^'&&s[j+1]==='{'){const e=s.indexOf('}',j+2);if(e>=0)j=e+1;}out+='\\sqrt{'+s.slice(i+1,j)+'}';i=j;}return out;}
  function fractionPart(s){
    s=s.trim();
    // Убираем только скобки, охватывающие аргумент дроби ЦЕЛИКОМ.
    // (a^3)^4 и (-a)^4 не проходят это условие: степень стоит после скобок.
    while(s[0]==='('&&matchingParen(s,0)===s.length-1)s=s.slice(1,-1).trim();
    return s;
  }
  const frac=(a,b)=>`\\frac{${fractionPart(a)}}{${fractionPart(b)}}`;

  function splitTopLevelSlash(s){
    let round=0,curly=0;
    for(let i=0;i<s.length;i++){
      if(s[i]==='(')round++; else if(s[i]===')')round--;
      else if(s[i]==='{')curly++; else if(s[i]==='}')curly--;
      else if(s[i]==='/'&&round===0&&curly===0)return i;
    }
    return -1;
  }

  function specialFraction(expr,prototype){
    // Семейства, где дробная черта в ФИПИ охватывает всё выражение целиком.
    if([8,17,18,28,29].includes(Number(prototype))){
      const k=splitTopLevelSlash(expr);
      if(k>=0)return frac(expr.slice(0,k),expr.slice(k+1));
    }
    return expr;
  }

  function fractionInsideRoot(s,prototype){
    if(![32,33].includes(Number(prototype)))return s;
    const start=s.indexOf('\\sqrt{');
    if(start<0)return s;
    const bodyStart=start+6;
    let depth=1,end=-1;
    for(let i=bodyStart;i<s.length;i++){
      if(s[i]==='{')depth++;else if(s[i]==='}'){depth--;if(depth===0){end=i;break;}}
    }
    if(end<0)return s;
    let body=s.slice(bodyStart,end).trim();
    // В прототипе 8.32 исходник имеет лишние круглые скобки вокруг числителя — убираем только внешнюю пару.
    if(body.startsWith('(')){
      const e=matchingParen(body,0);
      if(e>0&&body.slice(e+1).trim().startsWith('/'))body=body.slice(1,e)+body.slice(e+1);
    }
    const k=splitTopLevelSlash(body);
    if(k<0)return s;
    return s.slice(0,bodyStart)+frac(body.slice(0,k),body.slice(k+1))+s.slice(end);
  }

  function fractions(s){
    s=s.replace(/1\s*\/\s*\(([^()]*)\)/g,(_,b)=>frac('1',b));
    s=s.replace(/\(([^()]*)\)\s*\/\s*\(([^()]*)\)(\^\{[^}]+\})?/g,(_,a,b,p)=>frac(`(${a})`,`(${b})${p||''}`));
    s=s.replace(/\(([^()]*)\)(\^\{[^}]+\})?\s*\/\s*([A-Za-z0-9\\]+(?:\{[^}]+\})?(?:\^\{[^}]+\})?)/g,(_,a,p,b)=>frac(`(${a})${p||''}`,b));
    s=s.replace(/((?:\\sqrt\{[^}]+\}|[A-Za-z0-9]+(?:\^\{[^}]+\})?)(?:\s*\\cdot\s*(?:\\sqrt\{[^}]+\}|[A-Za-z0-9]+(?:\^\{[^}]+\})?))+?)\s*\/\s*(\\sqrt\{[^}]+\}|[A-Za-z0-9]+(?:\^\{[^}]+\})?)/g,(_,a,b)=>frac(a,b));
    s=s.replace(/([A-Za-z0-9]+(?:\^\{[^}]+\})?)\s*\/\s*\(([^()]*)\)(\^\{[^}]+\})?/g,(_,a,b,p)=>frac(a,`(${b})${p||''}`));
    s=s.replace(/([A-Za-z0-9]+(?:\^\{[^}]+\})?|\\sqrt\{[^}]+\})\s*\/\s*([A-Za-z0-9]+(?:\^\{[^}]+\})?|\\sqrt\{[^}]+\})/g,(_,a,b)=>frac(a,b));
    return s;
  }

  function toTex(raw,prototype){
    let s=stripHtml(raw);
    s=specialFraction(s,prototype);
    s=roots(s);
    s=fractionInsideRoot(s,prototype);
    s=fractions(s);
    // В 8.31 скобки вокруг положительной числовой дроби служат лишь для записи
    // коэффициента через '/'. Дробь как основание степени оставляем в скобках.
    if(Number(prototype)===31)s=s.replace(/\(\\frac\{(\d+)\}\{(\d+)\}\)(?!\s*\^)/g,(_,a,b)=>frac(a,b));
    return s;
  }
  function hasMath(t){const s=String(t.text||'');return s.includes('√')||s.includes('<sup>')||/[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(s);}
  tasks.filter(t=>t.number===8&&hasMath(t)).forEach(t=>{
    let text=String(t.text||'');const prefix='Найдите значение выражения ';let body=text.startsWith(prefix)?text.slice(prefix.length):text;if(body.endsWith('.'))body=body.slice(0,-1);
    const m=body.match(/^(.*?)(\s+при\s+.+)$/i);const expr=m?m[1]:body;let tail=m?m[2]:'';
    if(tail){const cond=tail.replace(/^\s+при\s+/i,'');tail=` при \\(${toTex(cond,t.prototype)}\\)`;}
    t.text=`${prefix}\\(${toTex(expr,t.prototype)}\\)${tail}.`;t.latexMath=true;
  });

  let queued=false;
  window.typesetMathOGE=function(root=document){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;if(window.MathJax&&typeof MathJax.typesetPromise==='function'){const nodes=root===document?[document.body]:[root];MathJax.typesetPromise(nodes).catch(err=>console.warn('MathJax:',err));}});};
  const wrap=name=>{const fn=window[name];if(typeof fn!=='function'||fn.__mathjaxWrapped)return;const w=function(...args){const r=fn.apply(this,args);window.typesetMathOGE();return r;};w.__mathjaxWrapped=true;window[name]=w;};
  wrap('renderBank');wrap('renderBuilderBank');wrap('renderPreview');window.typesetMathOGE();
})();
