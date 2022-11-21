import React, { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

export default function RegPagoRow({pago}) {


  return (
    <Fragment>
      <td className="regPagos__cont__tabla__tbl--body--row">
        <div className="regPagos__cont__tabla__tbl--body--row--cont">
        <div>{pago.fechaPago} </div>
        <div>{pago.fechaDesembolso} </div>
        </div>
      </td>

      <td className="regPagos__cont__tabla__tbl--body--row">
        <div className="regPagos__cont__tabla__tbl--body--row--cont">
        <div>{pago.valorPago.toFixed(0)} </div>
        </div>
      </td>

      <td className="regPagos__cont__tabla__tbl--body--row">
        <div className="regPagos__cont__tabla__tbl--body--row--cont">
          {pago.valorPagoNeto.toFixed(0)}
        </div>
      </td>

      <td className="regPagos__cont__tabla__tbl--body--row">
        <div className="regPagos__cont__tabla__tbl--body--row--cont">
          {pago.facturaPago.medioPagoFactura.medioPago}
        </div>
      </td>

      <td className="regPagos__cont__tabla__tbl--body--row">
        <div className="regPagos__cont__tabla__tbl--body--row--cont">
          {pago.facturaPago.clienteFactura.nombre + " " + pago.facturaPago.clienteFactura.apellido}
        </div>
      </td>


      {/* <tr>
        <td>{pago.fechaPago}</td>
        <td>{pago.fechaDesembolso}</td>
        <td>{Math.round(pago.valorPago)}</td>
        <td>{Math.round(pago.valorPagoNeto)}</td>
        <td>{pago.facturaPago.medioPagoFactura.medioPago}</td>
        <td>{pago.facturaPago.clienteFactura.nombre + " " + pago.facturaPago.clienteFactura.apellido}</td>
      </tr> */}


    </Fragment>
  );
}
