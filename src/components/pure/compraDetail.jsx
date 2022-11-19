import React, { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { IconContext } from "react-icons";

export default function CompraDetail({ compra }) {
  console.log(compra);

  return (
    <Fragment>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">
          {compra.productoCompra.nombre}
        </div>
      </td>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">
          {compra.precioCompra.toFixed(0)}
        </div>
      </td>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">
          {compra.precioFinal.toFixed(0)}
        </div>
      </td>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">
          {compra.cantidad}
        </div>
      </td>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">"est"</div>
      </td>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">"edi"</div>
      </td>

      <td className="compraDetail__body--row--compra">
        <div className="compraDetail__body--row--compra--cont">"eli"</div>
      </td>

      {/* <td className="compraDetail__body--row--action" onClick={() => abrirUsuario(cliente[0])}>
          <IconContext.Provider value={{ className: "compraDetail__body--row--action--icon" }}>
            <FiEdit
              onClick={() => {
                console.log("hola");
              }}
            />
          </IconContext.Provider>
        </td> */}
    </Fragment>
  );
}
