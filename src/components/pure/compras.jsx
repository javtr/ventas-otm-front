import React from "react";

const Compras = ({ compra }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        <div>{"id:" + compra.id}</div>
        <div>{"precioCompra:" + compra.precioCompra}</div>
        <div>{"precioFinal:" + compra.precioFinal}</div>
        <div>{"cantidad:" + compra.cantidad}</div>
        <div>{"productoCompra:" + compra.productoCompra.nombre}</div>
      </div>
    </div>
  );
};

export default Compras;
