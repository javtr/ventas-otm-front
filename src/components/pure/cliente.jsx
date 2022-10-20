import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { IconContext } from "react-icons";

import { GetCliente } from "../../../src/Services/axiosService";

const Cliente = ({ usuario }) => {
  const [clienteEdit, setClienteEdit] = useState(null);

  function editarClient(id) {
    obtenerCliente(id);
  }

  const obtenerCliente = (id) => {
    GetCliente(id)
      .then((response) => {
        setClienteEdit(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //edit cliente

  if (clienteEdit) {
    console.log(clienteEdit);

    //TODO hacer un componente que contenga un 
    //un formulario, conservar el usuario en un estado
    //al enviar el form, los datos modificados se enviar 
    //para modificar el cliente

    const clienteEdit = {
      id: 100,
      nombre: "Javier",
      apellido: "Briongos",
      correo: "jbriongosc@gmail.com",
      idMachine: "66FE204A3D0ADB36FBF73929F39D3685",
      comentario1: "",
      comentario2: "",
      estado: 1,
    };

    setClienteEdit(null);
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
              editarClient(usuario.id);
            }}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Cliente;
