import React, { useState, useEffect } from "react";
import {
  GetQueryPagosFactura,
  GetQueryComprasFactura,
} from "../../../src/Services/axiosService";
import Compras from "./compras";
import Pago from "./pago";
import { TbEdit } from "react-icons/tb";
import { MdAddBox } from "react-icons/md";

import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const FacturaCliente = ({ factura }) => {
  const [pagos, setPagos] = useState([]);
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

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

  function editarFactura(id) {
    navigate(`/edit-factura/${id}`);
  }

  function update() {
    obtainPagos();
  }

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

        <br></br>
        <IconContext.Provider value={{ className: "iconos1" }}>
          <TbEdit
            onClick={() => {
              editarFactura(factura.id);
            }}
          />
        </IconContext.Provider>
      </div>

      <h2>Pagos</h2>

      <br></br>

      <IconContext.Provider value={{ className: "iconos1" }}>
        <MdAddBox
          onClick={() => {
            navigate(`/add-pago/${factura.id}`);
          }}
        />
      </IconContext.Provider>

      <br></br>

      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        {pagos.map((pago, index) => (
          <Pago key={index} pago={pago} update={update}></Pago>
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
          <Compras key={index} compra={compra}></Compras>
        ))}
      </div>
    </div>
  );
};

export default FacturaCliente;
