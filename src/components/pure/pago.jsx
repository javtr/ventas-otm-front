import React from "react";

const Pago = ({ pago }) => {
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

      </div>
    </div>

    
  );
};

export default Pago;
