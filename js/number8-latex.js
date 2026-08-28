// №8: все задания, содержащие корни, переводятся в LaTeX/MathJax.
(function(){
  function stripHtml(s){
    return String(s)
      .replace(/<sup>(.*?)<\/sup>/g,'^{$1}')
      .replace(/<[^>]+>/g,'')
      .replace(/−/g,'-')
      .replace(/·/g,'\\cdot ')
      .replace(/\s+/g,' ')
      .trim();
  }
  function matchingParen(s,start){let d=0;for(let i=start;i<s.length;i++){if(s[i]==='(')d++;else if(s[i]===')'){d--;if(d===0)return i;}}return -1;}
  function roots(s){let out='';for(let i=0;i<s.length;){if(s[i]!=='√'){out+=s[i++];continue;}if(s[i+1]==='('){const e=matchingParen(s,i+1);if(e>i){out+='\\sqrt{'+roots(s.slice(i+2,e))+'}';i=e+1;continue;}}let j=i+1;while(j<s.length&&/[A-Za-zА-Яа-я0-9.,]/.test(s[j]))j++;if(s[j]==='^'&&s[j+1]==='{'){const e=s.indexOf('}',j+2);if(e>=0)j=e+1;}out+='\\sqrt{'+s.slice(i+1,j)+'}';i=j;}return out;}
  const frac=(a,b)=>`\\frac{${a.trim()}}{${b.trim()}}`;
  function fractions(s){
    s=s.replace(/1\s*\/\s*\(([^()]*)\)/g,(_,b)=>frac('1',b));
    s=s.replace(/\(([^()]*)\)\s*\/\s*\(([^()]*)\)(\^\{[^}]+\})?/g,(_,a,b,p)=>frac(`(${a})`,`(${b})${p||''}`));
    s=s.replace(/\(([^()]*)\)(\^\{[^}]+\})?\s*\/\s*([A-Za-z0-9\\]+(?:\{[^}]+\})?(?:\^\{[^}]+\})?)/g,(_,a,p,b)=>frac(`(${a})${p||''}`,b));
    s=s.replace(/((?:\\sqrt\{[^}]+\}|[A-Za-z0-9]+(?:\^\{[^}]+\})?)(?:\s*\\cdot\s*(?:\\sqrt\{[^}]+\}|[A-Za-z0-9]+(?:\^\{[^}]+\})?))+?)\s*\/\s*(\\sqrt\{[^}]+\}|[A-Za-z0-9]+(?:\^\{[^}]+\})?)/g,(_,a,b)=>frac(a,b));
    s=s.replace(/([A-Za-z0-9]+(?:\^\{[^}]+\})?)\s*\/\s*\(([^()]*)\)(\^\{[^}]+\})?/g,(_,a,b,p)=>frac(a,`(${b})${p||''}`));
    s=s.replace(/([A-Za-z0-9]+(?:\^\{[^}]+\})?|\\sqrt\{[^}]+\})\s*\/\s*([A-Za-z0-9]+(?:\^\{[^}]+\})?|\\sqrt\{[^}]+\})/g,(_,a,b)=>frac(a,b));
    return s;
  }
  function toTex(raw){let s=stripHtml(raw);s=roots(s);s=fractions(s);return s.replace(/²/g,'^{2}').replace(/³/g,'^{3}');}
  tasks.filter(t=>t.number===8&&String(t.text||'').includes('√')).forEach(t=>{let text=String(t.text||'');const prefix='Найдите значение выражения ';let body=text.startsWith(prefix)?text.slice(prefix.length):text;if(body.endsWith('.'))body=body.slice(0,-1);const m=body.match(/^(.*?)(\s+при\s+.+)$/i);const expr=m?m[1]:body,tail=m?m[2]:'';t.text=`${prefix}\\(${toTex(expr)}\\)${tail}.`;t.latexMath=true;});

  // MathJax должен обрабатывать формулы после каждого динамического renderBank/renderBuilderBank.
  let queued=false;
  window.typesetMathOGE=function(root=document){
    if(queued)return; queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      if(window.MathJax&&typeof MathJax.typesetPromise==='function'){
        const nodes=root===document?[document.body]:[root];
        MathJax.typesetPromise(nodes).catch(err=>console.warn('MathJax:',err));
      }
    });
  };
  const wrap=name=>{const fn=window[name];if(typeof fn!=='function'||fn.__mathjaxWrapped)return;const w=function(...args){const r=fn.apply(this,args);window.typesetMathOGE();return r;};w.__mathjaxWrapped=true;window[name]=w;};
  wrap('renderBank');wrap('renderBuilderBank');wrap('renderPreview');
  window.typesetMathOGE();
})();