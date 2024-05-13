document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/data');
      const data = await response.json();
  
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Average Price',
            data: data.values,
            backgroundColor: ["#155C6B", "#D45707", "#72198C", "#087B24"],
            borderWidth: 1
          }]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Average Price by Region'
          },
          scales: {
            xAxes: [{
              ticks: { autoSkip: false },
              scaleLabel: {
                display: true,
                labelString: 'Region'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Average Price'
              },
              ticks: { beginAtZero: true }
            }]
          }
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  