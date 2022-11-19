import React, { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";


export default function PagoDetail({ pago, update }) {
  const navigate = useNavigate();


  function editarPago(id) {
    navigate(`/edit-pago/${id}`);
  }


  return (
    <Fragment>

      <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont">
          {pago.fechaPago}
        </div>
      </td>

      <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont">
          {pago.fechaDesembolso}
        </div>
      </td>

      <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont">
          {pago.valorPago.toFixed(0)}
        </div>
      </td>      

      <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont">
          {pago.valorPagoNeto.toFixed(0)}
        </div>
      </td>    
      
      {/* <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont">
          "est"
        </div>
      </td>     */}


      <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont"
        
                    onClick={() => {
              editarPago(pago.id);
            }}
        
        >
          "edi"
        </div>
      </td>   

      <td className="PagoDetail__body--row--pago">
        <div className="PagoDetail__body--row--pago--cont">
          "eli"
        </div>
      </td>   


      {/* <td className="PagoDetail__body--row--action" onClick={() => abrirUsuario(cliente[0])}>
          <IconContext.Provider value={{ className: "PagoDetail__body--row--action--icon" }}>
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
