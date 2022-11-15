import React, { Component, useEffect, useMemo, useState } from "react";
import "./App.css";
import "./App.scss";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import AdminUserContainer from "./components/containers/adminUserContainer";

export default function App() {
  const [loged, setLoged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userDataContext, setUserDataContext] = useState({
    id: 0,
    user: "",
    rol: "",
    token: "",
  });

  const navigate = useNavigate();

  useEffect(() => {

    if (!localStorage.conection) {
      localStorage.conection = 0; 
    }

    
    if (localStorage.token == "") {
      console.log("app.js-No hay usuario");
      navigate("/login");
    } else {
      pedirUsuario();
    }
  }, []);

  const pedirUsuario = () => {
    GetUserByToken()
      .then((response) => {
        if (response.data === null) {
          console.log("app.js-responde usuario vacio");
          navigate("/login");
        } else {
          const userDataTemp = {
            id: response.data.id,
            user: response.data.user,
            rol: response.data.rol,
            token: response.data.token,
          };
          setUserDataContext(userDataTemp);
          setLoged(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("app.js-peticion user token fail app.js");
        console.log(`app.js-Somethin went wrong: ${error}`);
        console.log("app.js token--------------");
        navigate("/login");
        
      })
      .finally(() => {});
  };

  const valueUserData = useMemo(
    () => ({ userDataContext, setUserDataContext }),
    [userDataContext]
  );

  function initialRoute() {
    if (!isLoading) {
      if (loged) {
        return <LayoutVenta></LayoutVenta>;
      } else {
        return <FormLogin></FormLogin>;
      }
    } else {
      return <div>loading...</div>;
    }
  }

  return (
    <UserContext.Provider value={valueUserData}>
      <div className="App">
        <Routes>

          {/* incio anidadas */}

          <Route path="/" element={initialRoute()}>
            <Route
              index
              element={<Home rol={userDataContext.rol}></Home>}
            ></Route>


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
              path="admin"
              element={<AdminUserContainer></AdminUserContainer>}
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

          {/* fin anidadas */}

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
