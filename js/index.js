/* eslint-disable no-use-before-define,no-undef,no-unused-vars */
function include(url) {
  const script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
include('./js/createGraphic.js');
include('./js/tableLayout.js');

const container = document.querySelector('.container');
const radio1 = document.getElementById('rsschool');
const radio2 = document.getElementById('rsschool-demo');
const radio3 = document.getElementById('rsschool-scoreboard');
let usersInformaion;
let taskInformation;
let oldUsersInformaion;
let demoUsersInformaion;
let demoTaskInformation;
let arrayCheckedUsers = [];
radio1.addEventListener('click', addTable);
radio2.addEventListener('click', addTable);
radio3.addEventListener('click', addTableStatistic);
window.addEventListener('load', getUsersInfo);

window.addEventListener('change', () => {
  const MAX_COUNT_OF_CHECKBOX = 10;
  const countOfCheckbox = document.querySelectorAll('[type="checkbox"]');


  const countOfChecked = document.querySelectorAll('[type="checkbox"]:checked');
  for (let j = 0; j < countOfCheckbox.length; j++) {
    if (countOfChecked.length >= MAX_COUNT_OF_CHECKBOX) {
      countOfCheckbox[j].disabled = true;
      for (let i = 0; i < countOfChecked.length; i++) countOfChecked[i].disabled = false;
    } else {
      countOfCheckbox[j].disabled = false;
    }
  }
});

function SortObjects() {
  const arrayOfObjects = [[], []];
  usersInformaion.forEach((element) => {
    oldUsersInformaion.forEach((value) => {
      if (element.userId === value.userId) {
        arrayOfObjects[0].push(value);
        arrayOfObjects[1].push(element);
      }
    });
  });
  return arrayOfObjects;
}

function addTableStatistic() {
  container.innerHTML = '';
  const table = document.createElement('table');
  table.className = 'table';
  container.appendChild(table);
  table.innerHTML = '<tr>\n'
        + '    <th class="github-label cell">Github Участника</th>\n'
        + '    <th class="q1 cell">Q1</th>\n'
        + '    <th class="q3 cell">Q3</th>\n'
        + '    <th class="statistic cell">Answer</th>\n'
        + '  </tr>';
  const dates = SortObjects();
  outputComparison(dates, table);
}

const dynamicColors = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};


function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  container.appendChild(canvas);
}

function addTable() {
  if (radio1.checked) {
    container.innerHTML = '';
    createCanvas();
    arrayCheckedUsers = [];
    const chart = createGraphic(taskInformation, arrayCheckedUsers);
    createTable(taskInformation, usersInformaion, chart);
  }
  if (radio2.checked) {
    container.innerHTML = '';
    createTable(demoTaskInformation, demoUsersInformaion);
  }
  if (radio3.checked) {
    const chart = document.getElementById('myChart');
    chart.remove();
    container.innerHTML = '';
  }
}

function changeValue(taskResults, countOfTasks) {
  const DEFAULT_TIME = '150';
  const DEFAULT_ANSWER = 'not played';
  taskResults.forEach((item) => {
    while (item.timeSolutions.length != countOfTasks) {
      item.timeSolutions.push(DEFAULT_TIME);
    }
    while (item.taskSolutions.length != countOfTasks) {
      item.taskSolutions.push(DEFAULT_ANSWER);
    }
  });
  return taskResults;
}

function getSessionInfo(users) {
  fetch('./data/sessions.json')
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      usersInformaion = receiveSessionData(response, users);
      taskInformation = receiveTaskName(response);
      usersInformaion = changeValue(usersInformaion, taskInformation.length);
      return response;
    })
    .catch();
}

function getDemoSessionInfo(users) {
  fetch('./data/demo-session.json')
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      demoUsersInformaion = receiveSessionData(response, users);
      demoTaskInformation = receiveTaskName(response);
      demoUsersInformaion = changeValue(demoUsersInformaion, demoTaskInformation.length);
      return response;
    })
    .catch();
}

function getSessionOldInfo(users) {
  fetch('./data/sessionsQ1.json')
    .then(response => response.json())
    .then((response) => {
      oldUsersInformaion = receiveSessionData(response, users);
      taskInformation = receiveTaskName(response);
      oldUsersInformaion = changeValue(oldUsersInformaion, taskInformation.length);
      return response;
    })
    .catch();
}

function getUsersInfo() {
  let newUsers = new Map();
  let oldUsers = new Map();
  fetch('./data/users.json')
    .then(response => response.json())
    .then((response) => {
      newUsers = receiveUserData(response);
      getSessionInfo(newUsers);
      getDemoSessionInfo(newUsers);
      return response;
    })
    .catch();
  fetch('./data/usersQ1.json')
    .then(response => response.json())
    .then((response) => {
      oldUsers = receiveUserData(response);
      getSessionOldInfo(oldUsers);
      return response;
    })
    .catch();
}

function receiveUserData(users) {
  const usersData = new Map();
  users.forEach((item) => {
    const userData = [];
    userData.push(item.displayName, item.providerId);
    usersData.set(item.uid, userData);
  });
  return usersData;
}

function receiveTaskName(data) {
  const nameOfTasks = [];
  data[0].puzzles.forEach((item) => {
    nameOfTasks.push(item.name);
  });
  return nameOfTasks;
}

function receiveSessionData(data, users) {
  const taskResults = new Map();
  for (const key of users.keys()) {
    taskResults.set(key, {
      taskSolutions: [], timeSolutions: [], userName: users.get(key)[0], userId: users.get(key)[1],
    });
  }

  let currentValue;
  data[0].rounds.forEach((item) => {
    for (key in item.solutions) {
      currentValue = taskResults.get(key);
      if (typeof currentValue !== 'undefined') {
        const temp = formResult(item.solutions[key]);
        currentValue.taskSolutions.push(temp.taskSolution);
        currentValue.timeSolutions.push(temp.timeSolution);
        taskResults.set(key, currentValue);
      }
    }
  });
  return taskResults;
}

function formResult(value) {
  const taskSolution = value.code;
  const timeSolution = value.correct == 'Correct' ? value.time.$numberLong : '150';
  return { taskSolution, timeSolution };
}
