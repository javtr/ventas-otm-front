import React, { useMemo, useEffect, useState } from "react";
import { GetQueryPagosPosMes } from "../../Services/axiosService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [];
const labels = [];

const options = {
  fill: true,
  color: "rgb(255, 0, 255)",
  responsive: true,
  scales: {
    y: {
      min: 0,
      ticks: { display: true, color: "rgb(125, 130, 135)" },
      grid: { display: true, color: "rgb(59, 64, 71)" },
      border: { display: true, color: "rgb(42, 47, 51)" },
    },

    x: {
      ticks: { display: true, color: "rgb(125, 130, 135)" },
      grid: { display: true, color: "rgb(59, 64, 71)" },
    },
  },
  plugins: {
    legend: {
      display: false,
      color: "rgb(255, 255, 255)",
    },
  },
};

export default function CharVentas() {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    getDatos();
  }, []);

  //obtener los datos
  const getDatos = () => {
    GetQueryPagosPosMes()
      .then((response) => {
        // console.log(response);
        setDataChart(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //ordenar los datos
  if (dataChart) {
    for (var i = 0; i < dataChart.length; i++) {
      scores[i] = dataChart[i][0];
      labels[i] = dataChart[i][1].slice(0, 7);
    }
  }

  //   if (dataValues.length > 0) {
  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            label: "Ventas por mes",
            data: scores,
            tension: 0.15,
            borderColor: "rgb(250, 250, 250)",
            pointRadius: 6,
            pointBackgroundColor: "rgb(250, 250, 250)",
            backgroundColor: "rgba(250, 250, 250, 0.3)",
            color: "rgba(250, 250, 250, 0.3)",
          },
        ],
        labels,
      };
    },
    [dataChart]
  );
  //   }

  return (
    <div className="homeCharts__container--chartVentas">
      <div className="homeCharts__container--chartVentas--container">
        <h2>Ventas por mes</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
