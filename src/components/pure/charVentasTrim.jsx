import React, { useMemo, useEffect, useState } from "react";
import { GetQueryVentasQuartet } from "../../Services/axiosService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Cambiar de LineElement a BarElement
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2"; // Cambiar de Line a Bar

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Cambiar de LineElement a BarElement
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

export default function CharVentasTrim() {
  const [dataChart, setDataChart] = useState([]);

  const min = 3000;
  const target = 9000;

  const calculateAverage = () => {
    if (dataChart.length === 0) return 0;

    const total = dataChart.reduce((acc, item) => acc + item[0], 0);
    return total / dataChart.length;
  };

  const average = calculateAverage();



  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = () => {
    GetQueryVentasQuartet()
      .then((response) => {
        setDataChart(response.data);
      })
      .catch((error) => {
        alert(`Something went wrong: ${error}`);
      })
      .finally(() => {});
  };

  if (dataChart) {
    for (var i = 0; i < dataChart.length; i++) {
      scores[i] = dataChart[i][0];
      labels[i] = dataChart[i][1].slice(0, 7);
    }
  }

  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            label: "Ventas por Trimestre",
            data: scores,
            tension: 0.15,
            backgroundColor: "rgba(250, 250, 250, 0.3)", // Cambiar borderColor por backgroundColor
            borderColor: "rgb(250, 250, 250)",
            borderWidth: 1,
            barThickness: 40, // Ajustar el ancho de las barras según tus preferencias
          },
          {
            label: "Promedio",
            type: "line",
            data: new Array(dataChart.length).fill(average),
            borderColor: "rgba(255, 255, 0, 0.5)",
            pointRadius: 0,
            borderWidth: 2,
            borderDash: [8, 0],
            fill: false,
          },
          {
            label: "Min",
            type: "line",
            data: new Array(dataChart.length).fill(min),
            borderColor: "rgba(255, 0, 0, 0.5)",
            pointRadius: 0,
            borderWidth: 2,
            borderDash: [8, 0],
            fill: false,
          },
          {
            label: "Target",
            type: "line",
            data: new Array(dataChart.length).fill(target),
            borderColor: "rgba(0, 255, 0, 0.5)",
            pointRadius: 0,
            borderWidth: 2,
            borderDash: [8, 0],
            fill: false,
          },



        ],
        labels,
      };
    },
    [dataChart]
  );

  return (
    <div className="homeCharts__container--chartVentasQuartet">
      <div className="homeCharts__container--chartVentasQuartet--container">
        <h2>Ventas por Trimestre</h2>
        <Bar data={data} options={options} /> {/* Cambiar de Line a Bar */}
      </div>
    </div>
  );
}