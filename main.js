// jshint는 vscode 확장 기능이명 자바스크립트 형식을 맞춰서 코딩 하는 습관에 도움을 주는 것이다.
/* jshint esversion: 6 */
/* jshint browser: true */
/* jslint node: true */
/* jshint strict: false */

// 모든 스크립트를 스트릭트 모드 syntax에 맞춰서 한다
// 자바스크립트는 아주 유영한(flexible) 프로그래밍 언어다.
// flexible == dangerous (개인적으로 "flexible === dangerous"이런 표현은 적합하지 않음)

"use strict";

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDate = date.getDate();
const currentDay = date.getDay();

function myCalendar() {
    //   입력으로 Data() 받으며 날짜 정보 받을 수 있음
    // 1. 날짜정보를 통해 해당 년, 월, 요일 정보 추출
    // 2. 해당 월이 몇 일날이 있는지 추출
    // 3. 한달 전체를 표현 할 수 있는 테이블 생성 6x7(42cell)
    // 4. 날짜 데이터 프레임 생성
    // 5. 테이블을 채우기 
    // 6. 화면 출력

    const main = document.querySelector('.main');

    let frameOfCalendar = [];
    const _firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const _firstDateOfFrame = new Date(currentYear, currentMonth, 1 - _firstDay).getDate();
    const _lastDateOfFrame = 2;
    for (let i = 0; i < 42; i++) {
        // frameOfCalendar[i] = 3;
    }

    const calTable = createTable();
    main.appendChild(calTable);

}
function createTable() {
    const calTable = document.createElement('table');
    calTable.style.width = '100%';
    calTable.setAttribute('border', '1');

    const calTableBody = document.createElement('tbody');
    const thead = document.createElement('thead');

    for (let h = 0; h < 7; h++) {
        const headCell = document.createElement('th');
        const headText = document.createTextNode(new Date(currentYear, currentMonth, h).toLocaleDateString('ko', { weekday: 'long' }));
        headCell.appendChild(headText);
        thead.appendChild(headCell);
    }

    // let sum = 0;
    for (let i = 0; i < 6; i++) {
        const row = calTableBody.insertRow(); // document객채가 공식적으로 html table 택을 다루는 기능을 지원해 주고 있으로 이것을 사용하는 것을 선호합니다.

        // var row = document.createElement('tr'); // insertRow()를 사용 안하고도 테이블 생성이 가능함.
        for (let j = 0; j < 7; j++) {
            // sum++;
            let cell = row.insertCell();
            // var cell = document.createElement('td');
            // let cellText = document.createTextNode('{cell ' + sum + '} col: ' + j + ', row: ' + i);

            // cell.appendChild(cellText);
            // row.appendChild(cell); // insertCell()를 사용하게 되면 이런씩으로 코드 줄 주릴 수 있음
        }
        // calTableBody.appendChild(row); // insertRow(),insertCell()을 통해 코드량 벌써 2줄씩이나 줄임!
    }

    let title = document.createElement('caption');
    title.appendChild(document.createTextNode('Generating The Calendar using <table> tag in javascript!'));

    calTable.appendChild(title);
    calTable.appendChild(thead);
    calTable.appendChild(calTableBody);

    return calTable;
}
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

var DateDiff = {

    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};

var dString = "May, 20, 1984";

var d1 = new Date(dString);
var d2 = new Date();


console.log("Number of <b>days</b> since " + dString + ": " + DateDiff.inDays(d1, d2));
console.log("Number of <b>weeks</b> since " + dString + ": " + DateDiff.inWeeks(d1, d2));
console.log("Number of <b>months</b> since " + dString + ": " + DateDiff.inMonths(d1, d2));
console.log("Number of <b>years</b> since " + dString + ": " + DateDiff.inYears(d1, d2));

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