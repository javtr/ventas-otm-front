import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBarComp from "../components/pure/navBar";
import UserContext from "../context/context";

export default function LayoutVenta() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);


console.log(userDataContext);


  return (
    <div className="layout">
      <NavBarComp></NavBarComp>
      <Outlet/>
    </div>
  );
}
