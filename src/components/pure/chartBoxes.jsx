import React, { useEffect, useState } from "react";
import { GetQueryTotalPagos,GetQueryTotalClientes,GetQueryTotalProductos } from "../../Services/axiosService";

export default function ChartBoxes() {
  const [dataChart, setDataChart] = useState();
  const [clientes, setClientes] = useState();
  const [productos, setProductos] = useState();

  useEffect(() => {
    getDatos();
    getClientes();
    getProductos();
    
  }, []);

  const getDatos = () => {
    GetQueryTotalPagos()
      .then((response) => {
        setDataChart( Math.round( response.data[0]));
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };


  const getClientes = () => {
    GetQueryTotalClientes()
      .then((response) => {
        setClientes(response.data[0]);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const getProductos = () => {
    GetQueryTotalProductos()
      .then((response) => {
        setProductos(response.data[0]);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="homeCharts__container__row--box">
        <p>Total ventas</p>
        <h4>{dataChart}</h4>
      </div>
      <div className="homeCharts__container__row--box">
        <p>Total clientes</p>
        <h4>{clientes}</h4>
      </div>
      <div className="homeCharts__container__row--box">
        <p>Total productos</p>
        <h4>{productos}</h4>
      </div>

    </>
  );
}
