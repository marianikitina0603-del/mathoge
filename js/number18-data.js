// №18. Задачи на клетчатой бумаге. Прототипы ФИПИ.
(function(){
  const existing=new Set(tasks.map(task=>task.id));
  const subtopics={"1":"Длина отрезка по клеткам","2":"Длина отрезка по клеткам","3":"Длина отрезка по клеткам","4":"Длина отрезка по клеткам","5":"Длина отрезка по клеткам","6":"Отношение отрезков по клеткам","7":"Расстояние по клеткам","8":"Площадь фигуры по клеткам","9":"Площадь фигуры по клеткам","10":"Площадь фигуры по клеткам","11":"Площадь фигуры по клеткам","12":"Отношение площадей кругов","13":"Отношение площадей кругов"};
  const imageFor=spec=>{
    const m=String(spec.id).match(/^18\.(\d+)(?:\.(\d+))?$/);
    if(!m)return null;
    return m[2]?`assets/number18/cell-а18_${m[1]}_${m[2]}.png`:`assets/number18/cell-p18_${m[1]}.png`;
  };
  const esc=v=>String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const twoUpStyle='<style>.two-up-grid .number18-task-layout{display:flow-root!important;min-width:0}.two-up-grid .number18-diagram{float:right!important;display:block!important;width:26mm!important;height:20mm!important;max-width:34%!important;max-height:20mm!important;object-fit:contain!important;object-position:center!important;margin:0 0 1mm 2mm!important;break-inside:avoid!important;page-break-inside:avoid!important}</style>';
  const diagram=(image,id)=>image?`${twoUpStyle}<img class="number18-diagram" src="${esc(image)}" alt="Рисунок на клетчатой бумаге к заданию ${esc(id)}" loading="lazy" decoding="async">`:'';
  const taskLayout=(text,image,id)=>`<span class="number18-task-layout"><span class="number18-task-copy">${text}</span>${diagram(image,id)}</span>`;
  const add=spec=>{
    if(existing.has(spec.id))return;
    const image=imageFor(spec);
    tasks.push({id:spec.id,sourceId:spec.id,fipiId:spec.id,number:18,prototype:Number(spec.prototype),kind:spec.kind,section:'Геометрия',topic:'Задачи на клетчатой бумаге',subtopic:subtopics[String(spec.prototype)]||'',text:taskLayout(spec.text,image,spec.id),image,diagram:image,answer:String(spec.answer),demo:!!spec.demo,latexMath:true,sourcePage:spec.page});
    existing.add(spec.id);
  };
  if(!document.getElementById('number18-styles')){const style=document.createElement('style');style.id='number18-styles';style.textContent=`
    .number18-task-layout{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:center;min-width:0}
    .number18-task-copy{min-width:0}
    .number18-diagram{display:block;width:auto;height:auto;max-width:210px;max-height:170px;object-fit:contain!important;object-position:center;break-inside:avoid;page-break-inside:avoid}
    @media(max-width:620px){.number18-task-layout{grid-template-columns:1fr}.number18-diagram{max-width:min(100%,220px);max-height:180px;margin:8px auto 0}}
    @media print{.number18-task-layout{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:4mm!important;align-items:center!important}.number18-diagram{width:auto!important;height:auto!important;max-width:42mm!important;max-height:34mm!important;object-fit:contain!important}}
  `;document.head.appendChild(style);}
  window.MathOGENumber18={add};
  const specs=[{"id":"18.1","prototype":1,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображён ромб. Найдите длину его большей диагонали.","answer":"6","page":98,"demo":false},{"id":"18.2","prototype":2,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображён прямоугольный треугольник. Найдите длину его большего катета.","answer":"4","page":98,"demo":false},{"id":"18.3","prototype":3,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображён треугольник \\(ABC\\). Найдите длину его средней линии, параллельной стороне \\(AC\\).","answer":"2","page":98,"demo":false},{"id":"18.4","prototype":4,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображена изображена трапеция. Найдите длину её средней линии.","answer":"3","page":99,"demo":false},{"id":"18.5","prototype":5,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображена фигура. Найдите длину отрезка \\(AB\\) по данным чертежа.","answer":"1","page":99,"demo":false},{"id":"18.6","prototype":6,"kind":"Прототип","text":"На клетчатой бумаге изображён треугольник \\(ABC\\). Во сколько раз отрезок \\(AM\\) короче отрезка \\(CM\\)?","answer":"4","page":99,"demo":false},{"id":"18.7","prototype":7,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображены две точки. Найдите расстояние между ними.","answer":"13","page":100,"demo":false},{"id":"18.8","prototype":8,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображён треугольник. Найдите его площадь.","answer":"9","page":100,"demo":false},{"id":"18.9","prototype":9,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображён параллелограмм. Найдите его площадь.","answer":"10","page":100,"demo":false},{"id":"18.10","prototype":10,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображён ромб. Найдите его площадь.","answer":"6","page":101,"demo":false},{"id":"18.11","prototype":11,"kind":"Прототип","text":"На клетчатой бумаге с размером клетки \\(1\\times1\\) изображена трапеция. Найдите её площадь.","answer":"10","page":101,"demo":false},{"id":"18.12","prototype":12,"kind":"Прототип","text":"На клетчатой бумаге изображены два круга. Во сколько раз площадь большего круга больше площади меньшего?","answer":"2","page":101,"demo":true},{"id":"18.13","prototype":13,"kind":"Прототип","text":"На клетчатой бумаге изображены два круга. Во сколько раз площадь большего круга больше площади меньшего?","answer":"16","page":102,"demo":false}];
  specs.forEach(add);
})();
