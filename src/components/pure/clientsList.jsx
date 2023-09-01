import React, { useState, useEffect } from "react";
import { GetQueryVentasLastClient } from "../../Services/axiosService";

const ClientList = () => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = () => {
    GetQueryVentasLastClient()
      .then((response) => {
        setDataChart(response.data);
      })
      .catch((error) => {
        alert(`Something went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div className="homeCharts__container--clientList">
      <div className="homeCharts__container--clientList--container">
      <h2>Ultimas Ventas</h2>
        <table className="homeCharts__container--clientList--container--tbl">
          <thead className="homeCharts__container--clientList--container--th">
            <tr className="homeCharts__container--clientList--container--tr">
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {dataChart.slice(0, 5).map((compra, i) => (
              <tr
                key={i}
                className="homeCharts__container--clientList--container--trb"
              >
                <td>{compra[0]}</td>
                <td>{compra[1]}</td>
                <td>{Math.round(compra[2])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
