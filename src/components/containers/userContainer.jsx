import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  GetCliente,
  GetQueryFacturas,
} from "../../../src/Services/axiosService";

import Cliente from "../pure/cliente";
import Factura from "../pure/factura";
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
    <div className="userInfoContainer">
    
      <Cliente></Cliente>

      <div>
        {facturas.map((factura, index) => (
          <Factura key={index} facturaProp={factura}></Factura>
          //<FacturaCliente key={index} factura={factura}></FacturaCliente>
        ))}
      </div>

      {/* <div>
        {facturas.map((factura, index) => (
          <FacturaCliente key={index} factura={factura}></FacturaCliente>
        ))}
      </div> */}


    </div>
  );
};

export default UserContainer;
