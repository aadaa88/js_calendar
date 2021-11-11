// WeDataLab Inc.,
// Created by E. Bat-Amgalan
// Created date: 2021.11.2

// jshint는 vscode 확장 기능이명 자바스크립트 형식을 맞춰서 코딩 하는 습관에 도움을 주는 것이다.
/* jshint esversion: 6 */
/* jshint browser: true */
/* jslint node: true */
/* jshint strict: false */

"use strict";


///////////////// ** JS Calendar Main section ** /////////////////

// task 데이터를 저장할 객체
// task 객체를 생성하기 위해서 필수적으로 다음 정보를 argument으로 입력해야 합니다.ㄴ
//
//      정보        데이터형         기본값(값을 입력 안 했을 시)
//      날짜        Date 객체형      현재를 가리키는 Date형 객체
//      제목        String          ''
//      내용        String          ''
//      진행사항     Boolean         false

class Task {
    constructor(date = new Date, title = '', description = '', status = false, author = 'anonymous') {
        this.date = date;
        this.title = title;
        this.description = description;
        this.status = status;
        this.author = author;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value instanceof Date ? value : new Date;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = typeof value === 'string' && value ? value : '';
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = typeof value === 'string' && value ? value : '';
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value ? value : null;
    }
    get author() {
        return this._author;
    }
    set author(value) {
        this._author = typeof value === 'string' && value ? value : '';
    }
}

class SimpleCalendar {
    constructor(currentDate = new Date, tasks = [new Task]) {
        this.currentDate = currentDate;
        // tasks가 리스트를 가지고 있고 그 리스트 안의 객체를 가지며 날짜와 해당 태스크를 담고 있는 리스트가 있습니다.
        this.tasks = tasks;

        // this.calendar = this.createCalendar();
        // this.calendarFrame = this.getCalendarFrame();
    }

    get currentDate() {
        return this._currentDate;
    }

    set currentDate(date) {
        this._currentDate = date instanceof Date ? date : new Date;

        this._currentYear = this._currentDate.getFullYear();
        this._currentMonth = this._currentDate.getMonth();
        // 해당 월의 첫번째 요일을 구하기
        this._firstWeekDay = new Date(this._currentYear, this._currentMonth, 1).getDay();
        // 해당 월의 마지막 날을 구하기
        this._lastDateOfMonth = new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
    }

    get selectedTask() {
        return this._selectedTask;
    }

    set selectedTask(selectTask) {
        this._selectedTask = selectTask instanceof Task ? selectTask : {}
    }

    // 한달에 해당 되는 달력을 Date 객체로 생성
    createCalendar(date = this._currentDate) {
        this._currentDate = date instanceof Date ? date : this._currentDate;
        this.calendar = {};
        // 한달을 가리키는 객체 생성
        for (let i = 0; i < this._lastDateOfMonth; i++) {
            this.calendar[`${i}`] = new Date(this._currentYear, this._currentMonth, i + 1);
        }
        return this.calendar;
    }

    getCalendarFrame(date = this._currentDate) {
        this._currentDate = date instanceof Date ? date : this._currentDate;
        this.calendarFrame = {};

        for (let i = 0; i < 42; i++) {
            this.calendarFrame[`${i}`] = new Date(this._currentYear, this._currentMonth, 1 - this._firstWeekDay + i);
        }
        return this.calendarFrame;
    }

    addTask(tasks = new Task) {
        this.tasks.push(tasks);
    }

    getTask(selectTask = this._selectedTask) {
        return this.tasks.find(item => item == selectTask);
    }

    getAllTasks(_date, index) {
        return this.tasks;
    }

    updateTask() {

    }

    deleteTask() {

    }
}

let sample_datas;
sample_datas = generateSampleDate(5, 5, 20);
const cal1 = new SimpleCalendar();
cal1.addTask(sample_datas);
cal1.getTask(sample_datas); ///
console.log(cal1);
// cal1.addTask(cu;e, ['task1', 'task2', 'task3']);
// console.log(cal1.getTask(currentDate));

const main = document.querySelector('.main');

function myCalendar() {
    //   입력으로 Data() 받으며 날짜 정보 받을 수 있음
    // 1. 날짜정보를 통해 해당 년, 월, 요일 정보 추출
    // 2. 해당 월이 몇 일날이 있는지 추출
    // 3. 한달 전체를 표현 할 수 있는 테이블 생성 6x7(42cell)
    // 4. 날짜 데이터 프레임 생성
    // 5. 테이블을 채우기 
    // 6. 화면 출력
    // 7. encapsulation
    const currentDate = new Date();

    // html 페이지의 버디 선택

    const frameOfCalendar = createFrameOld(currentDate);
    const calTable = createTable(currentDate, frameOfCalendar, 'ko');

    calTable.className = 'calendar';
    // calTable.style.width = '100%';

    main.appendChild(calTable);
}

function createTable(currentDate, frameOfCalendar, locale = 'ko-KR') {
    const calTable = document.createElement('table');
    const calTableBody = document.createElement('tbody');
    const thead = document.createElement('thead');

    for (let h = 0; h < 7; h++) {
        const headCell = document.createElement('th');
        const headText = document.createTextNode(new Date(0, 0, h).toLocaleDateString(locale, { weekday: 'long' }));
        headCell.setAttribute('class', 'tHeadCell');
        headCell.appendChild(headText);
        thead.appendChild(headCell);
    }

    let idx = 0;
    for (let i = 0; i < 6; i++) {
        const row = calTableBody.insertRow(); // document객채가 공식적으로 html table 택을 다루는 기능을 지원해 주고 있으로 이것을 사용하는 것을 선호합니다.
        row.setAttribute('class', 'tRow');
        // var row = document.createElement('tr'); // insertRow()를 사용 안하고도 테이블 생성이 가능함.
        for (let j = 0; j < 7; j++) {
            let cell = row.insertCell();
            // var cell = document.createElement('td');
            // let cellText = document.createTextNode('{cell ' + idx + '} col: ' + j + ', row: ' + i);
            let cellText = document.createTextNode(`${frameOfCalendar[idx]}`);
            idx++;
            cell.setAttribute('class', 'tCell');
            cell.appendChild(cellText);
            // row.appendChild(cell); // insertCell()를 사용하게 되면 이런씩으로 코드 줄 주릴 수 있음
        }
        // calTableBody.appendChild(row); // insertRow(),insertCell()을 통해 코드량 벌써 2줄씩이나 줄임!
    }

    let title = document.createElement('caption');
    let caption = document.createElement('div');


    caption.appendChild(document.createTextNode('Generating The Calendar using <table> tag in javascript!'));
    caption.appendChild(document.createElement('br'));
    caption.appendChild(document.createTextNode(currentDate));

    title.appendChild(caption);
    calTable.appendChild(title);
    calTable.appendChild(thead);
    calTable.appendChild(calTableBody);

    return calTable;
}




///////////////// ** Experiment section ** /////////////////
// 이 부분에 달력을 만들면서 기능 혹은 동적 실습 했던 것들을 모아 두는 곳임.


// 달력 틀을 만들기 위한 데이터 생성해 주는 함수
function createFrameOld(currentDate) {
    const _currentYear = currentDate.getFullYear();
    const _currentMonth = currentDate.getMonth();

    let _frameOfCalendar = [];
    const _firstWeekDay = new Date(_currentYear, _currentMonth, 1).getDay(); // 해당 월의 첫번째 요일을 추출

    for (let i = 0; i < 42; i++) {
        _frameOfCalendar.push(new Date(_currentYear, _currentMonth, 1 - _firstWeekDay + i).getDate());
    }
    return _frameOfCalendar;
}

// 달력에 샘플 테스크 생성하는 함수
// 사용 방법
// (모든  argument를 Number 형으로 입력) 
// function([데이터 갯수], [재목 단어 갯수], [내용 단어 갯수], [년], [월], [날])
// argument를 정해진 순서 대로 입력하여야 함.
function generateSampleDate(dataLength = 10, titleLength = 5, descLength = 20, year, month, day) {
    // let dataLength = 10;
    // let titleLength = 10;
    // let descLength = 20;


    let title = 'Lorem velit ea nostrud sunt reprehenderit mollit sint dolore elit'.split(' ');
    title = title.map(item => item.charAt(0).toUpperCase() + item.slice(1));

    let description = 'Id mollit non excepteur, amet cupidatat. Proident consequat eiusmod sint consequat. Ullamco aliquip sint ipsum irure quis. Irure eu ullamco, aliquip et, magna mollit. Commodo mollit pariatur, sit, aliqua sit aute Lorem ex. Do eiusmod id commodo eiusmod nostrud consectetur tempor ut occaecat ad occaecat sint ad amet.'.split(' ');

    let author = 'Ad ad aliquip occaecat elit irure qui elit sit elit qui pariatur'.split(' ');
    author = author.map(item => item.toUpperCase());

    // year = typeof year !== 'undefined' ? year : new Date().getFullYear();
    // month = typeof month !== 'undefined' ? month : new Date().getMonth();
    // day = typeof day !== 'undefined' ? day : new Date().getDate();

    let hour, minute;

    var sampleTasks = [];
    for (let i = 0; i < dataLength; i++) {
        hour = Math.floor(Math.random() * 24);
        minute = Math.round(Math.random() * 60);

        sampleTasks[i] = new Task(
            new Date(
                typeof year !== 'undefined' ? year : 2018 + Math.floor(Math.random() * 5),
                typeof month !== 'undefined' ? month : Math.floor(Math.random() * 11),
                typeof day !== 'undefined' ? day : Math.floor(Math.random() * 31),
                hour, minute),
            // generate random title that has length of 0 ~ 10.
            Array.from(Array(Math.floor(Math.random() * titleLength)), item => item = title[Math.floor(Math.random() * title.length)]).join(' '),
            // generate random description that has length of 0 ~ 20.
            Array.from(Array(Math.floor(Math.random() * descLength)), item => item = description[Math.floor(Math.random() * description.length)]).join(' '),
            Boolean(Math.round(Math.random())),
            Array.from(Array(2), item => item = author[Math.floor(Math.random() * author.length)]).join(' ')
        );
    }
    console.log(sampleTasks)
}



///////////////// ** Learning section ** /////////////////

// 모든 스크립트를 스트릭트 모드 syntax에 맞춰서 한다
// 자바스크립트는 아주 유영한(flexible) 프로그래밍 언어다.
// flexible == dangerous (개인적으로 "flexible === dangerous"이런 표현은 적합하지 않음)

var DateDiff = {
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },
    inYears: function(d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};

var dString = "May, 20, 1984";

var d1 = new Date(dString);
var d2 = new Date();

// console.log("Number of <b>days</b> since " + dString + ": " + DateDiff.inDays(d1, d2));
// console.log("Number of <b>weeks</b> since " + dString + ": " + DateDiff.inWeeks(d1, d2));
// // console.log("Number of <b>months</b> since " + dString + ": " + DateDiff.inMonths(d1, d2));
// console.log("Number of <b>years</b> since " + dString + ": " + DateDiff.inYears(d1, d2));

/* Scoping rules
The main difference is scoping rules. Variables declared by var keyword are scoped to the immediate function body (hence the function scope) while let variables are scoped to the immediate enclosing block denoted by { } (hence the block scope).
*/

/* function run() {
    var foo = "Foo";
    let bar = "Bar";

    console.log(foo, bar); // Foo Bar

    {
    var moo = "Mooo"
    let baz = "Bazz";
    console.log(moo, baz); // Mooo Bazz
    }

    console.log(moo); // Mooo
    console.log(baz); // ReferenceError
}

run(); */

///////////////// ** Creating table ** /////////////////

function tableCreate() {
    const body = document.body,
        tbl = document.createElement('table');
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';

    for (let i = 0; i < 3; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 2; j++) {
            if (i === 2 && j === 1) {
                break;
            } else {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
                td.style.border = '1px solid black';
                if (i === 1 && j === 1) {
                    td.setAttribute('rowSpan', '2');
                }
            }
        }
    }
    body.appendChild(tbl);
}

///////////////// ** Style Covering ** /////////////////

// {/* <html> */}
// {/* <head> */}
// {/* <style type="text/css"> */}
// {/* * { */}
margin: 0;
padding: 0;
}
// {/* .container { */}
min - height: 100 vh;
display: flex;
justify - content: center;
align - items: center;
scroll - behavior: smooth;
background: #131313;
                font-family: 'Helvetica Neue', sans-serif;
            }
            // {/* h1 a { */}
                font-size: 80px;
                color: # BF2E97;
text - decoration: none;
text - transform: uppercase;
}
// {/* .popover { */}
display: none;
box - shadow: 0 px 6 px 8 px rgba(19, 19, 19, .7);
}
// {/* .popover:target { */}
position: absolute;
right: 0;
top: 0;
width: 100 % ;
height: 100 % ;
display: flex;
align - items: center;
justify - content: center;
}
// {/* .popover .content { */}
display: flex;
align - items: center;
justify - content: center;
position: relative;
width: 0;
height: 0;
color: #fff;
background - color: #191919;
                animation: 1s grow ease forwards;
                text-align: center;
            }
            // {/* .nav_list { */}
                list-style-type: none;
            }
            // {/* .nav_list a { */}
                text-decoration: none;
                font-size: 50px;
                color: # fff;
}
// {/* .nav_list_item { */}
height: 100 % ;
overflow: hidden;
}
// {/* .nav_list li { */}
padding: 15 px 0;
text - transform: uppercase;
transform: translateY(200 px);
opacity: 0;
animation: 2 s slideUp ease forwards .5 s;
position: relative;
}
// {/* .nav_list li::before { */}
content: '';
position: absolute;
height: 2 px;
width: 0 px;
left: 0;
bottom: 10 px;
background: #BF2E97;
transition: all .5 s ease;
}
// {/* .nav_list li:hover:before { */}
width: 100 % ;
}
// {/* .popover p { */}
padding: 50 px;
opacity: 0;
animation: 1 s fadeIn ease forwards 1 s;
}
// {/* .popover .close::after { */}
right: 0;
top: 0;
width: 50 px;
height: 50 px;
position: absolute;
display: flex;
z - index: 1;
font - size: 30 px;
align - items: center;
justify - content: center;
background - color: #BF2E97;
color: #fff;
content: "×";
cursor: pointer;
opacity: 0;
animation: 1 s fadeIn ease forwards .5 s;
}
// {/* @keyframes grow { */}
100 % {
    height: 90 % ;
    width: 90 % ;
}
}
// {/* @keyframes fadeIn { */}
100 % {
    opacity: 1;
}
}
// {/* @keyframes slideUp { */}
100 % {
    transform: translateY(0);
    opacity: 1;
}
}
// {/* </style> */}
// {/* </head> */}
// {/*  */}
// {/* <body> */}
// {/* <div class="container"> */}
// {/* <h1> */}
// {/* <a href="#menu">Click me</a> */}
// {/* </h1> */}
// {/*  */}
// {/* <div class="popover" id="menu"> */}
// {/* <div class='content'> */}
// {/* <a href="#" class="close"></a> */}
// {/* <div class='nav'> */}
// {/* <ul class='nav_list'> */}
// {/*  */}
// {/* <div class='nav_list_item'> */}
// {/* <li><a href="#">Home</a></li> */}
// {/* </div> */}
// {/* <div class='nav_list_item'> */}
// {/* <li><a href="#">About</a></li> */}
// {/* </div> */}
// {/* <div class='nav_list_item'> */}
// {/* <li><a href="#">Products</a></li> */}
// {/* </div> */}
// {/* <div class='nav_list_item'> */}
// {/* <li><a href="#">Services</a></li> */}
// {/* </div> */}
// {/* <div class='nav_list_item'> */}
// {/* <li><a href="#">Contact</a></li> */}
// {/* </div> */}
// {/*  */}
// {/* </ul> */}
// {/* </div> */}
// {/* </div> */}
// {/* </div> */}
// {/* </div> */}
// {/*  */}
// {/* </body> */}
// {/*  */}
// {/* </html> */}