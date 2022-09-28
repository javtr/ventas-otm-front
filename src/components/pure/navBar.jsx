import React from "react";
import { Link } from "react-router-dom";

export default function NavBarComp() {
  return (
    <div className="layout__navBar">
      NavBarComp
      <nav>
        <Link to="/">Home</Link>
        <Link to="sale">Nueva venta</Link>
      </nav>
    </div>
  );
}
