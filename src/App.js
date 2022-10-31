import React, { Component, useEffect, useMemo, useState } from "react";
import "./App.css";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/context";
import LayoutVenta from "./pages/layoutVenta";
import FormComp from "./components/containers/formComp";
import Home from "./components/containers/home";
import RegClientesCont from "./components/containers/regClientesCont";
import UserContainer from "./components/containers/userContainer";
import PagoContainer from "./components/containers/pagoContainer";
import FormEditCliente from "./components/pure/forms/formEditCliente";
import FormEditFactura from "./components/pure/forms/formEditFactura";
import FormEditPago from "./components/pure/forms/formEditPago";
import FormEditCompra from "./components/pure/forms/formEditCompra";
import FormAddPago from "./components/pure/forms/formAddPago";
import FormRegister from "./components/pure/forms/formRegister";
import FormLogin from "./components/pure/forms/formLogin";
import { GetUserByToken } from "./Services/axiosService";



export default function App() {
  const [userDataContext, setUserDataContext] = useState({});

  useEffect(() => {

    if (localStorage.token != "") {
      pedirUsuario();
    }

  }, []);

  const valueUserData = useMemo(
    () => ({ userDataContext, setUserDataContext }),
    [userDataContext]
  );

  const pedirUsuario = () => {
    GetUserByToken()
      .then((response) => {
        if (response.data === "") {
          console.log("response token vacio");
        } else {

          const userDataTemp = {
            id: response.data.id,
            user: response.data.user,
            rol: response.data.rol,
          };

          setUserDataContext(userDataTemp);
        }
      })
      .catch((error) => {
        console.log("peticion user token fail");
        console.log(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <UserContext.Provider value={valueUserData}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LayoutVenta></LayoutVenta>}>
            <Route index element={<Home></Home>}></Route>
            <Route path="sale" element={<FormComp></FormComp>}></Route>
            <Route
              path="reg-clientes"
              element={<RegClientesCont></RegClientesCont>}
            ></Route>
            <Route
              path="pagos"
              element={<PagoContainer></PagoContainer>}
            ></Route>
            <Route
              path="cliente/:userId"
              element={<UserContainer></UserContainer>}
            ></Route>
            <Route
              path="edit-cliente/:userId"
              element={<FormEditCliente></FormEditCliente>}
            ></Route>
            <Route
              path="edit-factura/:facturaId"
              element={<FormEditFactura></FormEditFactura>}
            ></Route>
            <Route
              path="edit-pago/:pagoId"
              element={<FormEditPago></FormEditPago>}
            ></Route>
            <Route
              path="edit-compra/:compraId"
              element={<FormEditCompra></FormEditCompra>}
            ></Route>
            <Route
              path="add-pago/:pagoId"
              element={<FormAddPago></FormAddPago>}
            ></Route>
          </Route>
          <Route
            path="/register"
            element={<FormRegister></FormRegister>}
          ></Route>
          <Route path="/login" element={<FormLogin></FormLogin>}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}
