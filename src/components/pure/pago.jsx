import React from "react";
import { TbEdit } from "react-icons/tb";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";


const Pago = ({ pago }) => {
  const navigate = useNavigate();


  function editarPago(id) {
    navigate(`/edit-pago/${id}`);
  }


  return (
    <div>
    
      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >

        <div>{"id:" + pago.id}</div>
        <div>{"pago:" + pago.fechaPago}</div>
        <div>{"desembolso:" + pago.fechaDesembolso}</div>
        <div>{"valor:" + pago.valorPago}</div>
        <div>{"neto:" + pago.valorPagoNeto}</div>

        <br></br>
        <IconContext.Provider value={{ className: "iconos1" }}>
          <TbEdit
            onClick={() => {
              editarPago(pago.id);
            }}
          />
        </IconContext.Provider>  


      </div>
    </div>

    
  );
};

export default Pago;