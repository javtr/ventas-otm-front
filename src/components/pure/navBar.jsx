import React, { useContext,useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/context";
import UserInfo from "./userInfo";

export default function NavBarComp() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [cloudState, setCloudState] = useState("cloud--on");



  useEffect(() => {

    if (localStorage.conection ==0) {
      setCloudState("cloud--on");
    } else if (localStorage.conection ==1) {
      setCloudState("cloud--off");
    }

  }, []);


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

  function turnConection() {
    if (localStorage.conection == 1) {
      localStorage.conection = 0;
      setCloudState("cloud--on");
    } else if (localStorage.conection == 0) {
      localStorage.conection = 1;
      setCloudState("cloud--off");
    }
  }

  function clasCloud() {
    if (localStorage.conection == 1) {
      return "cloud--off"
    } else if (localStorage.conection == 0) {
      return "cloud--on"
    }
  }


  return (
    <div className="navbar">
      <button className={cloudState} onClick={() => turnConection()}>{cloudState=="cloud--on"?"C":"L"}</button>

      <UserInfo></UserInfo>
      {navBar()}
    </div>
  );
}
