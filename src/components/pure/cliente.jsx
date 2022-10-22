import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";


const Cliente = ({ usuario }) => {
  const navigate = useNavigate();
  
  function editarCliente(id) {
    navigate(`/edit-cliente/${id}`);
  }


  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        <h2>User</h2>
        <br></br>
        {"id:" + usuario.id}
        <br></br>
        {"nombre:" + usuario.nombre}
        <br></br>
        {"apellido:" + usuario.apellido}
        <br></br>
        {"apellido:" + usuario}

        <br></br>
        <IconContext.Provider value={{ className: "iconos1" }}>
          <TbEdit
            onClick={() => {
              editarCliente(usuario.id);
            }}
          />
        </IconContext.Provider>


      </div>
    </div>
  );
};

export default Cliente;
