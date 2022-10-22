import React from "react";
import { TbEdit } from "react-icons/tb";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";



const Compras = ({ compra }) => {
  const navigate = useNavigate();


  function editarCompra(id) {
    navigate(`/edit-compra/${id}`);
  }

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
     
        <br></br>
        <IconContext.Provider value={{ className: "iconos1" }}>
          <TbEdit
            onClick={() => {
              editarCompra(compra.id);
            }}
          />
        </IconContext.Provider>     
     
      </div>
    </div>
  );
};

export default Compras;
