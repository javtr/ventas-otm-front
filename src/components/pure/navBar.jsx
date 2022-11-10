import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/context";
import UserInfo from "./userInfo";

export default function NavBarComp() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);
  const navigate = useNavigate();

  function navBar() {
    if (userDataContext.rol != "") {
      if (userDataContext.rol == "ADMIN") {
        return (
          <nav>
            <Link to="/">Home</Link>
            <Link to="sale">Nueva venta</Link>
            <Link to="reg-clientes">Registro clientes</Link>
            <Link to="pagos">Registro pagos</Link>
            <Link to="admin">Usuarios</Link>

          </nav>
        );
      } else if (userDataContext.rol == "USER") {
        return (
          <nav>
            <Link to="/">Home</Link>
            <Link to="sale">Nueva venta</Link>
            <Link to="reg-clientes">Registro clientes</Link>
            <Link to="pagos">Registro pagos</Link>

          </nav>
        );
      }
    } else {
      navigate("login");
    }
  }

  return (
    <div className="navbar">
      <UserInfo></UserInfo>
      {navBar()}
    </div>
  );
}
