


makeChart();


async function  getData() {
  const xs = [];
  const ys = [];
const res = await fetch("ZonAnn.Ts+dSST.csv");
const data = await res.text();

const table = data.trim().split("\n").slice(1);
const years = [];
table.forEach(row=>{
  const col=row.split(",");
  xs.push(col[0]);
  ys.push(parseFloat(col[1])+14);
})
  return {xs , ys};
  }


async function makeChart(){
 const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.xs,
          datasets: [{
              label: "Global combined Land-surface air & sea-surface water Temp in degress C",
              fill: false,
              data: data.ys,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor:  'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
  });
}
