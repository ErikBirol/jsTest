data=JSON.parse(data); //парсим данные json, чтобы можно было с ними работать
ss=tableTake(); //вызов функции
tableSort=tableSort(); //вызов функции
tE=tableEditing();//вызов функции
dT=divTable();//вызов функции

function divTable(){ //создает таблицу в див контейнере левее от основной
    var findDiv=document.querySelector('#divClass table'); //находим нужный нам элемент, расположенный в файле index.html
    var editT="<tr><th>Редактировать строку</th></tr>" //добавляем первую строку
    for (var i = 0; i < data.length; i++) { //цикл, чтоб создать нужное нам количество строк, для редактирования (длина массива data)
      editT+="<tr><td id='tdedit'>Редактировать строку "+(i+1)+"</td></tr>"; //добавляем строку с номером
    }
    findDiv.innerHTML=editT; //выводим на страницу все добавленные элементы
}

function tableTake(){ //создание основной таблицы
  document.write("<table id='table'><tr id='firstTr'>"+ //заполняем html для создания шапки и таблички
    "<th id='th1' title=' Сортировать по столбцу: '>Имя (firstName) <span class='delete' onclick='tdHide(1)' title=' Удалить этот столбец'>&times;</span></th>"+ //столбец, название, добавляем титл-подсказку, крестик для удаления
    "<th id='th2' title=' Сортировать по столбцу: '>Фамилия (lastName) <span class='delete' onclick='tdHide(2)' title=' Удалить этот столбец'>&times;</span></th>"+//столбец, название, добавляем титл-подсказку, крестик для удаления
    "<th id='th3' title=' Сортировать по столбцу: '>Описание (about) <span class='delete' onclick='tdHide(3)' title=' Удалить этот столбец'>&times;</span></th>"+//столбец, название, добавляем титл-подсказку, крестик для удаления
    "<th id='th4' title=' Сортировать по столбцу: '>Цвет глаз (eyeColor) <span class='delete' onclick='tdHide(4)' title=' Удалить этот столбец'>&times;</span></th>"+//столбец, название, добавляем титл-подсказку, крестик для удаления
  "</tr>");//закрываем первую строку
  for (var i = 0; i < data.length; i++) { //создаем цикл для переборки объектов из массива данных
    document.write('<tr>');//новая строка
    var newdata=data[i];//этот элемент нужен, чтоб перебрать свойства новых объектов
    for (var key in newdata) {//цикл для переборки свойств объекта
      if(key=='id' || key=='phone')//проверяем на нужность данных
      {
        continue;
      }
      if (key=='name') {//разбиваем на Имя и Фамилию

          document.write('<td id="td1">');//добавляем id, чтоб потом обращаться к ячейкам
          document.write(newdata.name.firstName);//вывод данных внутрь ячейки
          document.write('</td>');
          document.write('<td id="td2">');
          document.write(newdata.name.lastName);
          document.write('</td>');
          continue;
      }
      if (key=='about') {
        var el = document.getElementById('td1');//находим элемент в таблице
        var fontSize = Math.ceil(parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'))); //узнаем размер шрифта в нем
        var windowSize = parseFloat(document.getElementById('th3').clientWidth); //узнаем размер нужной нам ячейки
        newdata[key]=newdata[key].slice(0,(4*windowSize/(fontSize*0.9)-3))+'...';//удаляем все лишние символы (делим размер нашей ячейки на разм
        document.write('<td id="td3">');                                         //ер шрифта в ширину и умножаем на 2, т.к. нужно чтоб было заполнено
        document.write(newdata[key])                                             //2 строчки, не зыбваем удалить последние три символа)
        document.write('</td>');
        continue
      }
      if (key=="eyeColor")//проверка на цвета
      {
        col=eyeColor(newdata[key]);//вызываем функцию для сопосотовления цвета
        {document.write('<td id="td4" style="background-color:'+col+'	;font-size:0	;">');//закрашиваем ячейку в цвет и убираем надпись
        document.write(newdata[key])
        document.write('</td>');}
      }
    }
    document.write('</tr>');//закрываем строчку
  }
  document.write("</table>");//закрываем таблицу
  }

function eyeColor(per){//проверка цвета
  if (per=='blue')//если цвет соответствует данному
  {
    col="#4682B4";//то это его код
  }
  else if (per=='brown')
  {col="#A0522D";}
  else if (per=='green')
  {col="#6B8E23";}
  else if (per=='red')
  {col="#A52A2A	";}
  return col;
}


function tableSort(){//сортировка таблицы
  document.querySelector('#firstTr').onclick = (event) => {//если нажимается первая строка таблицы появляется событие
    var cell = event.target;//узнаем ячейку
    var i = cell.parentNode.rowIndex;//строка ячейки
    var j = cell.cellIndex;//номер ячейки
    var sortedRows = Array.from(table.rows)//сортируем таблицу
          .slice(1)//первая строка нам не нужна, так как там название
          .sort((rowA, rowB) => rowA.cells[j].innerHTML > rowB.cells[j].innerHTML ? 1 : -1);//сортируем от больше к меньшему
        table.tBodies[0].append(...sortedRows);
        for (var i = 1; i < data.length; i++) { //обновляем табличку для редактирования, чтоб она закрывалась при сортировке
          tableDiv.rows[i].cells[0].innerHTML="Редактировать строку "+i;
        }
      }
  }

  function tableEditing(){ //редактируем таблицу
    document.querySelector('#divClass table').onclick = (event) => {//как и в предыдущей функции
      var cell = event.target;
      var i = cell.parentNode.rowIndex;
      var j = cell.cellIndex;
      if (tableDiv.rows[i].cells[0].innerHTML==("Редактировать строку "+i)){ //чтоб не закрывалась при повторном нажатии
      // dT=divTable();
      tableDiv.rows[i].cells[0].innerHTML='<form id="editForm" autocomplete="off">'+ //добавляем форму для редактирования данных
        '<input type="text" name="firstName" value="'+table.rows[i].cells[0].innerHTML+'">'+ //редактируем имя, значение по умолчанию - значение в редактируемой страке
        '<input type="text" name="lastName" value="'+table.rows[i].cells[1].innerHTML+'">'+
        '<input type="text" name="about" value="'+table.rows[i].cells[2].innerHTML+'">'+
        '<select name="eyeColor"><option>red</option><option>green</option><option>blue</option><option>brown</option></select>'+//выбор из нескольких вариантов цвета глаз
        '<button type="button" name="button" id="divButton">Редактировать</button>'+
      '</form>';
      var btnForm=document.querySelector('#divButton');
      btnForm.onclick=function(){//проверяем нажатие на кнопку редактировать
      table.rows[i].cells[0].innerHTML=editForm.firstName.value; //заменяем значения в таблице полученными
      table.rows[i].cells[1].innerHTML=editForm.lastName.value;
      table.rows[i].cells[2].innerHTML=editForm.about.value;
      table.rows[i].cells[3].innerHTML=editForm.eyeColor.value;
      table.rows[i].cells[3].style.backgroundColor=eyeColor(editForm.eyeColor.value);//вызываем функцию для получения кода цвета, закрашиваем значения в таблице полученным цветом
      tableDiv.rows[i].cells[0].innerHTML="Редактировать строку "+i;//закрываем форму
    }

  }
}
  }

  function tdHide(num){ //функция для скрытия колонок функция вызывается прямо из html кода
    for (var i = 0; i < data.length; i++) {
      document.querySelectorAll('#td'+num)[i].style.display="none"; //выбираем функцию вывода для всех ячеек таблицы
    }
  document.querySelector('#th'+num).style.display="none"//убираем вывод первой ячейки таблицы
  }

  function tdUnhide(){//отображение скрытых ячеек, запускается прямо из html кода
    for (var i = 0; i <4; i++) {
      document.querySelector('#th'+(i+1)).style.display="table-cell";//показываем все ячейки первой строки
      for (var j = 0; j<data.length; j++) {
      document.querySelectorAll('#td'+(i+1))[j].style.display="table-cell";//показываем все ячейки следующих строк
      }
    }
  }
