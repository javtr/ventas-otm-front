import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBarComp from "../components/pure/navBar";
import UserContext from "../context/context";
import { GetUserByToken } from "../Services/axiosService";

export default function LayoutVenta() {


  return (
    <div className="layout">
      <NavBarComp className="layout__navbar"></NavBarComp>
      <Outlet/>
    </div>
  );
}
