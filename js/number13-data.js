// №13. Неравенства. Прототипы ФИПИ.
(function(){
  const existing=new Set(tasks.map(t=>t.id));
  const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const math=s=>`\\(${s}\\)`;
  const choices=values=>`<span class="number13-options">${values.map((value,index)=>`<span><b>${index+1})</b> ${value==='нет решений'?value:math(value)}${index<values.length-1?';':''}</span>`).join('')}</span>`;
  const diagram=spec=>`<img class="number13-diagram ${spec.prototype===10?'number13-condition-diagram':'number13-choice-diagram'}" src="${esc(spec.diagram)}" alt="${spec.prototype===10?'Решение неравенства':'Варианты ответа'} к заданию ${esc(spec.id)}" loading="lazy">`;
  const textFor=spec=>{
    const p=Number(spec.prototype);
    if(p===10)return `Укажите неравенство, решение которого изображено на рисунке.${diagram(spec)}${choices(spec.choices)}`;
    const formula=p===2||p===3?math(`\\begin{cases}${spec.system[0]},\\\\${spec.system[1]}.\\end{cases}`):math(spec.expression);
    const prompt=p===2||p===3?'Укажите решение системы неравенств':'Укажите решение неравенства';
    return `${prompt} ${formula}.${spec.diagram?diagram(spec):choices(spec.choices)}`;
  };
  const subtopic=p=>p===1?'Линейные неравенства':p<=3?'Линейные системы неравенств':p<=9?'Квадратичные неравенства':'Неравенство по рисунку';
  const add=spec=>{
    if(existing.has(spec.id))return;
    tasks.push({id:spec.id,sourceId:spec.id,fipiId:spec.id,number:13,prototype:spec.prototype,kind:spec.kind,section:'Алгебра',topic:'Неравенства',subtopic:subtopic(Number(spec.prototype)),text:textFor(spec),answer:String(spec.answer),demo:!!spec.demo,latexMath:true,diagram:spec.diagram||null,sourcePage:spec.page,sourceCorrection:spec.sourceCorrection||null,answerCorrection:spec.answerCorrection||null});
    existing.add(spec.id);
  };
  window.MathOGENumber13={add};
  const specs=[{"id":"13.1","prototype":1,"kind":"Прототип","answer":"2","page":55,"expression":"-3-x<4x+7","choices":["(-\\infty;-0{,}8)","(-2;+\\infty)","(-\\infty;-2)","(-0{,}8;+\\infty)"]},{"id":"13.2","prototype":2,"kind":"Прототип","answer":"2","page":55,"system":["x+3 \\ge-2","x+1{,}1 \\ge 0"],"diagram":"assets/number13/diagram-13-2.png"},{"id":"13.3","prototype":3,"kind":"Прототип","answer":"1","page":55,"system":["x-2{,}6 \\le 0","x-1 \\ge 1"],"choices":["[2;2{,}6]","(-\\infty;2{,}6]","(-\\infty;2]\\cup [2{,}6;+\\infty)","[2;+\\infty)"]},{"id":"13.4","prototype":4,"kind":"Прототип","answer":"4","page":56,"expression":"x-x^2 \\ge 0","diagram":"assets/number13/diagram-13-4.png"},{"id":"13.5","prototype":5,"kind":"Прототип","answer":"4","page":56,"expression":"x-x^2<0","choices":["(0;1)","(0;+\\infty)","(1;+\\infty)","(-\\infty;0)\\cup (1;+\\infty)"]},{"id":"13.6","prototype":6,"kind":"Прототип","answer":"1","page":56,"expression":"(x+1)(x-6) \\le 0","diagram":"assets/number13/diagram-13-6.png"},{"id":"13.7","prototype":7,"kind":"Прототип","answer":"3","page":56,"expression":"(x+3)(x-6)>0","choices":["(6;+\\infty)","(-3;+\\infty)","(-\\infty;-3)\\cup (6;+\\infty)","(-3;6)"]},{"id":"13.8","prototype":8,"kind":"Прототип","answer":"1","page":57,"expression":"x^2<9","diagram":"assets/number13/diagram-13-8.png"},{"id":"13.9","prototype":9,"kind":"Прототип","answer":"1","page":57,"expression":"x^2-25>0","choices":["(-\\infty;-5)\\cup (5;+\\infty)","(-5;5)","нет решений","(-\\infty;+\\infty)"]},{"id":"13.10","prototype":10,"kind":"Прототип","answer":"3","page":57,"choices":["x^2-7x<0","x^2-49>0","x^2-7x>0","x^2-49<0"],"diagram":"assets/number13/diagram-13-10.png","demo":true}];
  specs.forEach(add);
})();
