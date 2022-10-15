import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  GetCliente,
  GetQueryFacturas,
} from "../../../src/Services/axiosService";

const UserContainer = () => {
  const [user, setUser] = useState({});
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    obtainUser();
}, []);

useEffect(() => {
    if(user.id){
    obtainFactura();
    }
}, [user]);

  const obtainUser = () => {
    GetCliente(params.userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {
      });
  };

  const obtainFactura = () => {
    GetQueryFacturas(user.id)

      .then((response) => {
        setFacturas(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const params = useParams();

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
        {"id:" + user.id}
        <br></br>
        {"nombre:" + user.nombre}
        <br></br>
        {"apellido:" + user.apellido}
        <br></br>
        {"apellido:" + user}
      </div>

      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        <h2>Factura</h2>
        <br></br>

        {facturas.map((factura, index) => (
          <div key={index}         style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}>
            <div>{"id:" + factura.id}</div>
            <div>{"fecha:" + factura.fechaCompra}</div>
            <div>{"valor:" + factura.valorCompra}</div>
            <div>
              {"medio:" + factura.medioPagoFactura.medioPago}
            </div>
            <div>{"tipo:" + factura.tipoPagoFactura.tipoPago}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserContainer;
