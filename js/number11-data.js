// №11. Графики функций. Прототипы ФИПИ.
(function(){
  const existing=new Set(tasks.map(t=>t.id));
  const labelsLetters=['А','Б','В'];
  const labelsNumbers=['1','2','3'];
  const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const choiceBlock=spec=>{
    const heading=spec.choiceType==='formula'?'ФОРМУЛЫ':'КОЭФФИЦИЕНТЫ';
    const labels=spec.choiceFirst?labelsLetters:labelsNumbers;
    return `<span class="number11-choice-block"><span class="number11-section-title">${heading}</span><span class="number11-options">${spec.choices.map((value,index)=>`<span><b>${labels[index]})</b> \\(${value}\\)${index<2?';':''}</span>`).join('')}</span></span>`;
  };
  const graphBlock=spec=>`<span class="number11-graph-block"><span class="number11-section-title">ГРАФИКИ</span><img class="number11-diagram" src="${esc(spec.asset)}" alt="Графики к заданию ${esc(spec.id)}" loading="lazy"></span>`;
  const answerTable=()=>`<span class="number11-answer-note"><span>В таблице под каждой буквой укажите соответствующий номер.</span><table class="number11-answer-table" aria-label="Таблица ответа"><tbody><tr><th>А</th><th>Б</th><th>В</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></span>`;
  const question=spec=>{
    const p=Number(spec.prototype);
    if(p===1)return 'На рисунках изображены графики функций вида \\(y=kx+b\\). Установите соответствие между знаками коэффициентов \\(k\\) и \\(b\\) и графиками функций.';
    if(p===2)return 'На рисунках изображены графики функций вида \\(y=kx+b\\). Установите соответствие между графиками функций и знаками коэффициентов \\(k\\) и \\(b\\).';
    if(p===5)return 'На рисунках изображены графики функций вида \\(y=ax^2+bx+c\\). Установите соответствие между знаками коэффициентов \\(a\\) и \\(c\\) и графиками функций.';
    if(p===6)return 'На рисунках изображены графики функций вида \\(y=ax^2+bx+c\\). Установите соответствие между графиками функций и знаками коэффициентов \\(a\\) и \\(c\\).';
    return spec.choiceFirst?'Установите соответствие между формулами, задающими функции, и графиками этих функций.':'Установите соответствие между графиками функций и формулами, которые их задают.';
  };
  const subtopic=p=>p<=4?'Линейные функции':p<=6?'Квадратичные функции':'Смешанные задачи';
  const add=spec=>{
    if(existing.has(spec.id))return;
    const choices=choiceBlock(spec),graph=graphBlock(spec);
    const text=`${question(spec)}${spec.choiceFirst?choices+graph:graph+choices}${answerTable()}`;
    tasks.push({id:spec.id,sourceId:spec.id,fipiId:spec.id,number:11,prototype:spec.prototype,kind:spec.kind,section:'Алгебра',topic:'Графики функций',subtopic:subtopic(spec.prototype),text,answer:String(spec.answer),demo:!!spec.demo,latexMath:true,diagram:spec.asset});
    existing.add(spec.id);
  };
  window.MathOGENumber11={add};
  const specs=[{"id":"11.1","prototype":1,"kind":"Прототип","answer":"213","choices":["k<0,\\ b<0","k<0,\\ b>0","k>0,\\ b<0"],"choiceFirst":true,"choiceType":"coefficient","asset":"assets/number11/diagram-11-1.svg","page":46,"demo":false},{"id":"11.2","prototype":2,"kind":"Прототип","answer":"231","choices":["k<0,\\ b<0","k>0,\\ b>0","k>0,\\ b<0"],"choiceFirst":false,"choiceType":"coefficient","asset":"assets/number11/diagram-11-2.svg","page":46,"demo":false},{"id":"11.3","prototype":3,"kind":"Прототип","answer":"231","choices":["y=-2x-1","y=-2x+1","y=2x+1"],"choiceFirst":false,"choiceType":"formula","asset":"assets/number11/diagram-11-3.svg","page":47,"demo":false},{"id":"11.4","prototype":4,"kind":"Прототип","answer":"321","choices":["y=-2x+4","y=2x-4","y=2x+4"],"choiceFirst":true,"choiceType":"formula","asset":"assets/number11/diagram-11-4.svg","page":47,"demo":false},{"id":"11.5","prototype":5,"kind":"Прототип","answer":"321","choices":["a>0,\\ c>0","a<0,\\ c>0","a>0,\\ c<0"],"choiceFirst":true,"choiceType":"coefficient","asset":"assets/number11/diagram-11-5.svg","page":48,"demo":false},{"id":"11.6","prototype":6,"kind":"Прототип","answer":"132","choices":["a>0,\\ c>0","a>0,\\ c<0","a<0,\\ c>0"],"choiceFirst":false,"choiceType":"coefficient","asset":"assets/number11/diagram-11-6.svg","page":48,"demo":false},{"id":"11.7","prototype":7,"kind":"Прототип","answer":"132","choices":["y=\\frac{1}{x}","y=-x^2-2","y=\\frac{1}{2}\\cdot x"],"choiceFirst":false,"choiceType":"formula","asset":"assets/number11/diagram-11-7.svg","page":49,"demo":false},{"id":"11.8","prototype":8,"kind":"Прототип","answer":"321","choices":["y=\\frac{2}{x}","y=-x^2","y=2x"],"choiceFirst":false,"choiceType":"formula","asset":"assets/number11/diagram-11-8.svg","page":49,"demo":false},{"id":"11.9","prototype":9,"kind":"Прототип","answer":"132","choices":["y=2x^2+16x+29","y=\\frac{5}{3}\\cdot x+3","y=-\\frac{4}{x}"],"choiceFirst":true,"choiceType":"formula","asset":"assets/number11/diagram-11-9.svg","page":50,"demo":true},{"id":"11.10","prototype":10,"kind":"Прототип","answer":"132","choices":["y=-x^2-3","y=-2x-4","y=\\sqrt{x}"],"choiceFirst":false,"choiceType":"formula","asset":"assets/number11/diagram-11-10.svg","page":50,"demo":false}];
  specs.forEach(add);
})();
