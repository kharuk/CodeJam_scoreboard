/* eslint-disable no-unused-vars,no-undef */
function createItem(elem, className, parent) {
  const item = document.createElement(elem);
  item.className = className;
  parent.appendChild(item);
  return item;
}

function createTable(arrayNameTasks, mapOfUsers, chart) {
  const table = createItem('table', 'table', container);
  table.addEventListener('click', (event) => {
    let { target } = event;
    while (target !== table) {
      if (target.type === 'checkbox') {
        const id = target.id;
        const objUser = {
          label: mapOfUsers.get(id).userName,
          data: mapOfUsers.get(id).timeSolutions,
          fill: false,
          borderColor: dynamicColors(),
        };
        if (target.checked) {
          arrayCheckedUsers.push(objUser);
        } else {
          arrayCheckedUsers.splice(arrayCheckedUsers.indexOf(objUser), 1);
        }
        chart.update();
        return;
      }
      target = target.parentNode;
    }
  });

  const tableHeader = createItem('tr', 'table-header', table);
  const githubLabel = createItem('th', 'github-label cell', tableHeader);
  githubLabel.textContent = 'Github Участника';


  arrayNameTasks.forEach((element) => {
    const taskLabel = createItem('th', 'task-name cell', tableHeader);
    taskLabel.textContent = element;
  });

  const sumTimesLabel = createItem('th', 'sum-times-label cell', tableHeader);
  sumTimesLabel.textContent = 'Общее время';

  if (arrayNameTasks.length > 1) {
    const cellCheckBox = createItem('th', 'checkbox-label cell', tableHeader);
    cellCheckBox.textContent = 'Comparison';
  }

  mapOfUsers.forEach((element, i) => {
    let sum = 0;
    const user = createItem('tr', 'user', table);
    const userName = createItem('td', 'user-name cell', user);
    userName.textContent = element.userName;
    element.timeSolutions.forEach((value, i) => {
      const timeTask = createItem('td', 'task-time cell', user);
      timeTask.setAttribute('title', element.taskSolutions[i]);
      timeTask.textContent = value;
      sum += +(value);
    });
    const sumTimes = createItem('td', 'sum-times cell', user);
    sumTimes.textContent = `${sum}`;

    if (arrayNameTasks.length > 1) {
      const cellOfCheckbox = createItem('td', 'cell-checkbox cell', user);
      const checkBox = createItem('input', '', cellOfCheckbox);
      checkBox.type = 'checkbox';
      checkBox.id = `${i}`;
    }
  });
}

function outputComparison(dates, table) {
  for (let i = 0; i < dates[0].length; i++) {
    let oldSum = 0;
    let newSum = 0;
    const user = createItem('tr', 'user', table);
    const userName = createItem('td', 'user-name cell', user);
    userName.textContent = dates[0][i].userName;
    dates[0][i].timeSolutions.forEach((value) => {
      oldSum += +(value);
    });
    dates[1][i].timeSolutions.forEach((value) => {
      newSum += +(value);
    });
    const sumOldTimes = createItem('td', 'sum-old-times cell', user);
    sumOldTimes.textContent = `${oldSum}`;
    const sumNewTimes = createItem('td', 'sum-new-times cell', user);
    sumNewTimes.textContent = `${newSum}`;
    const cellAnswer = createItem('td', 'answer cell', user);

    if (oldSum < newSum) {
      cellAnswer.textContent = 'worse';
    } else if (oldSum > newSum) {
      cellAnswer.textContent = 'better';
    } else {
      cellAnswer.textContent = 'unchanged';
    }
  }
}
