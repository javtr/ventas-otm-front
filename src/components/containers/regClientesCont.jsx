import React, { useState, useEffect } from "react";
import { GetQueryClientes } from "../../Services/axiosService";
import RegCliente from "../pure/regCliente";
import { useNavigate } from "react-router-dom";

export default function RegClientesCont() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtainClientes();
  }, []);

  const obtainClientes = () => {
    GetQueryClientes()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const navigate = useNavigate();

  function reporteUsuario(index) {
    navigate(`/cliente/${index}`);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Id machine</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <RegCliente
              key={index}
              cliente={cliente}
              abrirUsuario={reporteUsuario}
            ></RegCliente>
          ))}
        </tbody>
      </table>
    </div>
  );
}
