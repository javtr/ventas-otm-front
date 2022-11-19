import React, { useState, useEffect, Fragment } from "react";
import {
  GetQueryPagosFactura,
  GetQueryComprasFactura,
} from "../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import CompraDetail from "../pure/compraDetail";

export default function ComprasDetailCont({ facturaId }) {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    obtainCompras();
  }, []);

  const obtainCompras = () => {
    GetQueryComprasFactura(facturaId)
      .then((response) => {
        setCompras(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div className="compraDetail">
      <h2 className="compraDetail__title">Compras</h2>

      <div className="compraDetail__container">
        <table className="compraDetail__table">
          <thead className="compraDetail__table--head">
            <tr className="compraDetail__table--head--row">
              <th className="compraDetail__table--head--row1">Producto</th>
              <th className="compraDetail__table--head--row2">Precio</th>
              <th className="compraDetail__table--head--row3">Desc</th>
              <th className="compraDetail__table--head--row4">Cant</th>
              <th className="compraDetail__table--head--row6">Edit</th>
              <th className="compraDetail__table--head--row7">Elim</th>
            </tr>
          </thead>

          <tbody className="compraDetail__body">
            {compras.map((compra, index) => (
              <Fragment key={index}>
                <tr className="compraDetail__body--line"></tr>
                <tr className="compraDetail__body--row">
                  <CompraDetail key={index} compra={compra}></CompraDetail>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
