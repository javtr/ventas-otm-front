import React, { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function CompraDetail({ compra }) {
  const { register, control, handleSubmit, watch, setValue } = useForm();
  const navigate = useNavigate();


  function editarCompra(id) {
    navigate(`/edit-compra/${id}`);
  }


  function formSumit(data) {
    const facturaEditada = {
      id: factura.id,
      fechaCompra: data.fecha,
      valorCompra: data.valor,
      compraActiva: data.estado,
      medioPagoFactura: {
        id: data.medio,
      },
      tipoPagoFactura: factura.tipoPagoFactura,
      clienteFactura: factura.clienteFactura,
    };
  }

  function handleChange() {
    
    console.log("holass");
  }



  return (
    <Fragment>
      {/* <form onSubmit={handleSubmit(formSumit)}> */}


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

        <td className="compraDetail__body--row--compra"
        
        onClick={() => {
          editarCompra(compra.id);
            }}
        
        >
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
      {/* </form> */}
    </Fragment>
  );
}
