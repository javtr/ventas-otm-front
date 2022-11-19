import React, { useState, useEffect, Fragment } from "react";
import {
  GetQueryClientes,
  GetQueryPagosFactura,
  GetQueryComprasFactura,
  GetPagos,
} from "../../Services/axiosService";
import RegCliente from "../pure/regCliente";
import { useNavigate } from "react-router-dom";
import PagoDetail from "../pure/pagoDetail";

export default function PagosDetailCont({ facturaId }) {
  const [clientes, setClientes] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    obtainPagos(facturaId);
  }, []);

  const obtainPagos = (id) => {
    GetQueryPagosFactura(id)
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const navigate = useNavigate();

  function reporteUsuario(index) {
    navigate(`/cliente/${index}`);
  }

  function update() {
    obtainPagos();
  }

  return (
    <div className="PagoDetail">
      <h2 className="PagoDetail__title">Pagos</h2>

      <div className="PagoDetail__container">
        <table className="PagoDetail__table">
          <thead className="PagoDetail__table--head">
            <tr className="PagoDetail__table--head--row">
              <th className="PagoDetail__table--head--row1">Pago</th>
              <th className="PagoDetail__table--head--row2">Desembolso</th>
              <th className="PagoDetail__table--head--row3">Bruto</th>
              <th className="PagoDetail__table--head--row4">Neto</th>
              <th className="PagoDetail__table--head--row5">Act</th>
              <th className="PagoDetail__table--head--row6">Edit</th>
              <th className="PagoDetail__table--head--row7">Elim</th>
            </tr>
          </thead>

          <tbody className="PagoDetail__body">
            {/* {clientes.map((cliente, index) => (
              <Fragment key={index}>
                <tr className="PagoDetail__body--line"></tr>
                <tr className="PagoDetail__body--row">
                  <PagoDetail
                    key={index}
                    cliente={cliente}
                    abrirUsuario={reporteUsuario}
                  ></PagoDetail>
                </tr>
              </Fragment>

            ))} */}

            {pagos.map((pago, index) => (
              <Fragment key={index}>
                <tr className="PagoDetail__body--line"></tr>
                <tr className="PagoDetail__body--row">

                 { pago.estado != 3 ? (
                  <PagoDetail
                    key={index}
                    pago={pago}
                    update={update}
                  ></PagoDetail>
                  ) : ( <Fragment/> )}


                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
