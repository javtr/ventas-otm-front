import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  GetCliente,
  GetQueryFacturas,
} from "../../../src/Services/axiosService";

import Cliente from "../pure/cliente";
import FacturaCliente from "../pure/facturaCliente";

const UserContainer = () => {
  const [user, setUser] = useState({});
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    obtainUser();
  }, []);

  useEffect(() => {
    if (user.id) {
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
      .finally(() => {});
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
      <Cliente usuario={user}></Cliente>

      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        {facturas.map((factura, index) => (
          <FacturaCliente key={index} factura={factura}></FacturaCliente>
        ))}
      </div>
    </div>
  );
};

export default UserContainer;
