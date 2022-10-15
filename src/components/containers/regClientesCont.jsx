import React, { useState, useEffect } from "react";
import { GetQueryClientes } from "../../Services/axiosService";
import RegCliente from "../pure/regCliente";

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
          </tr>
        </thead>
        <tbody>

          {clientes.map((cliente, index) => (

            <RegCliente key={index} cliente={cliente}></RegCliente>
         
          ))}


        </tbody>
      </table>
    </div>
  );
}
