import React, { Component } from "react";
import "./App.css";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
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


class App extends Component {
  render() {
    return (
      <div className="App">


        <Routes>
          <Route path="/" element={<LayoutVenta></LayoutVenta>}>
            <Route index element={<Home></Home>}></Route>
            <Route path="sale" element={<FormComp></FormComp>}></Route>
            <Route path="reg-clientes" element={<RegClientesCont></RegClientesCont>}></Route>
            <Route path="pagos" element={<PagoContainer></PagoContainer>}></Route>
            <Route path="cliente/:userId" element={<UserContainer></UserContainer>}></Route>
            <Route path="edit-cliente/:userId" element={<FormEditCliente></FormEditCliente>}></Route>
            <Route path="edit-factura/:facturaId" element={<FormEditFactura></FormEditFactura>}></Route>
            <Route path="edit-pago/:pagoId" element={<FormEditPago></FormEditPago>}></Route>
            <Route path="edit-compra/:compraId" element={<FormEditCompra></FormEditCompra>}></Route>
            <Route path="add-pago/:pagoId" element={<FormAddPago></FormAddPago>}></Route>
          </Route>
          <Route path="/registro" element={<FormRegister></FormRegister>}></Route>
          <Route path="/login" element={<FormLogin></FormLogin>}></Route>
          
        </Routes>


      </div>
    );
  }
}

export default App;
