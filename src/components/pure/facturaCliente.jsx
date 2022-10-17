import React, { useState, useEffect } from "react";
import { GetQueryPagosFactura, GetQueryComprasFactura } from "../../../src/Services/axiosService";
import Compras from "./compras";
import Pago from "./pago";

const FacturaCliente = ({ factura }) => {
  const [pagos, setPagos] = useState([]);
  const [compras, setCompras] = useState([]);
  

  useEffect(() => {
    obtainPagos();
    obtainCompras();
  }, []);

  const obtainPagos = () => {
    GetQueryPagosFactura(factura.id)
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };


  const obtainCompras = () => {
    GetQueryComprasFactura(factura.id)
      .then((response) => {
        setCompras(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };


  return (
    <div>
      <h2>Factura</h2>
      <br></br>

      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        <div>{"id:" + factura.id}</div>
        <div>{"fecha:" + factura.fechaCompra}</div>
        <div>{"valor:" + factura.valorCompra}</div>
        <div>{"medio:" + factura.medioPagoFactura.medioPago}</div>
        <div>{"tipo:" + factura.tipoPagoFactura.tipoPago}</div>
      </div>

      <h2>Pagos</h2>
      <br></br>

      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >

        {pagos.map((pago, index) => (
          <Pago key={index} pago={pago}></Pago>
        ))}

      </div>


      <h2>Compras</h2>
      <br></br>

      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >

        {compras.map((compra, index) => (
          <Compras  key={index} compra={compra}></Compras>
        ))}

      </div>


    </div>
  );
};

export default FacturaCliente;
