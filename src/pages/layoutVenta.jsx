import React from "react";
import { Outlet } from "react-router-dom";
import NavBarComp from "../components/pure/navBar";

export default function LayoutVenta() {
  return (
    <div className="layout">
      <NavBarComp></NavBarComp>
      <Outlet/>
    </div>
  );
}
