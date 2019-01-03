/* eslint-disable no-unused-vars */
function createGraphic(information, arrOfObj) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: information,
      datasets: arrOfObj,
    },
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'red',
        },
      },
    },
  });
  return lineChart;
}
