var data = {};
const URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const count = document.getElementById("count");
  const incomes = document.getElementById("incomes");
  const score = document.getElementById("score");
  const age = document.getElementById("age");

  handleFetch().then((res) => {
    data = res;
    score.textContent = data.scoreM;
    age.textContent = data.ageM;
    incomes.textContent = data.annualM;
    count.textContent = data.count;

    generaChartDoughnut();
    generaChartLine();
  });
});

async function handleFetch() {
  try {
    // const token = localStorage.getItem("token");
    const response = await fetch(URL + "/dashboard", {
      //   headers: { authorization: token },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

function generaChartDoughnut() {
  var ctx2 = document.getElementById("doughnut").getContext("2d");
  return new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Homens", "Mulheres"],
      datasets: [
        {
          label: "Generos",
          data: [data.gendersNum.men, data.gendersNum.women],
          backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(120, 46, 139,1)"],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(120, 46, 139,1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
function generaChartLine() {
  var ctx = document.getElementById("lineChart").getContext("2d");

  labels = data.itemsDistribuition.map((item) => item.Age);
  values = data.itemsDistribuition.map((item) => parseInt(item["Spending Score (1-100)"]));
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Score",
          data: values,
          backgroundColor: ["rgba(85,85,85, 1)"],
          borderColor: "rgb(41, 155, 99)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  var ctx2 = document.getElementById("doughnut").getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Homens", "Mulheres"],
      datasets: [
        {
          label: "Generos",
          data: [data.gendersNum.men, data.gendersNum.women],
          backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(120, 46, 139,1)"],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(120, 46, 139,1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
