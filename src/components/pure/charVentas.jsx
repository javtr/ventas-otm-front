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
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function CharVentas() {
  const [dataChart, setDataChart] = useState([]);


  useEffect(() => {
    getDatos();
  }, []);

  //obtener los datos
  const getDatos = (objeto) => {
    GetQueryPagosPosMes(objeto)
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
    const data = useMemo(function () {
      return {
        datasets: [
          {
            label: "Ventas por mes",
            data: scores,
            tension: 0,
            borderColor: "rgb(75, 192, 192)",
            pointRadius: 6,
            pointBackgroundColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.3)",
          },
        ],
        labels,
      };
    }, [dataChart]);
//   }


  return <Line data={data} options={options} />;
}
