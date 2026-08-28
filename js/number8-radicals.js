// Математическое отображение квадратного корня в №8: черта корня над всем подкоренным выражением.
(function(){
  const R=x=>`<span class="mroot"><span class="mroot-sign">√</span><span class="mroot-body">${x}</span></span>`;

  function findClosingParen(s,start){
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

  function convert(s){
    s=String(s||'');
    if(!s.includes('√')) return s;
    let out='';
    for(let i=0;i<s.length;){
      if(s[i]!=='√'){out+=s[i++];continue;}
      if(s[i+1]==='('){
        const end=findClosingParen(s,i+1);
        if(end>i){
          const body=s.slice(i+2,end);
          out+=R(body);
          i=end+1;
          continue;
        }
      }
      // Корень из одного числа/переменной со степенью.
      let j=i+1;
      if(/[A-Za-zА-Яа-я0-9]/.test(s[j]||'')){
        while(j<s.length&&/[A-Za-zА-Яа-я0-9.,]/.test(s[j])) j++;
        if(s.slice(j).startsWith('<sup>')){
          const e=s.indexOf('</sup>',j);
          if(e>=0) j=e+6;
        }else while(j<s.length&&/[⁰¹²³⁴⁵⁶⁷⁸⁹]/.test(s[j])) j++;
        out+=R(s.slice(i+1,j));
        i=j;
        continue;
      }
      out+='√'; i++;
    }
    return out;
  }

  tasks.filter(t=>t.number===8).forEach(t=>{t.text=convert(t.text);});
})();