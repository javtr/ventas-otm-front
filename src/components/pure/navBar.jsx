import React from "react";
import { Link } from "react-router-dom";

export default function NavBarComp() {
  return (
    <div className="layout__navBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="sale">Nueva venta</Link>
        <Link to="reg-clientes">Registro clientes</Link>
        <Link to="pagos">Registro pagos</Link>
      </nav>
    </div>
  );
}
