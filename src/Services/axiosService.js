import AxiosRequest from "./config/axiosConfig";

//form --------------------------------------------

export function GetAllProducts() {
  return AxiosRequest.get("/producto/get-all", {});
}

export function GetAllTipos() {
  return AxiosRequest.get("/tipo-pago/get-all", {});
}

export function GetAllMedios() {
  return AxiosRequest.get("/medio-pago/get-all", {});
}

export function PostRegistro(objeto) {
  return AxiosRequest.post("/registro/save", objeto);
}

export function GetAllClientes() {
  return AxiosRequest.get("/cliente/get-all", {});
}

//query --------------------------------------------
export function GetQueryClientes() {
    return AxiosRequest.get("/query/clientes", {});
  }
  
  export function GetQueryFacturas(id) {
    return AxiosRequest.get("/query/factura/"+ id, {});
  }
  
  export function GetQueryPagosFactura(id) {
    return AxiosRequest.get("/query/pagos/"+ id, {});
  }  

  export function GetQueryComprasFactura(id) {
    return AxiosRequest.get("/query/compras/"+ id, {});
  } 

  export function GetQueryPagosFecha(objeto) {
    return AxiosRequest.post("/query/pagosFecha", objeto);
  } 

//cliente --------------------------------------------
export function GetCliente(id) {
  return AxiosRequest.get("/cliente/get/"+ id,{});
}

export function PutClienteEdit(objeto) {
  return AxiosRequest.put("/cliente/edit", objeto);
}

export function PutClienteEditEstado(id) {
  return AxiosRequest.put("/cliente/editEstado/"+ id,{});
}

export function PutClienteEstado(objeto) {
  return AxiosRequest.put("/cliente/editEstadoAct", objeto);
}


//factura --------------------------------------------
export function GetFactura(id) {
  return AxiosRequest.get("/factura/get/"+ id,{});
}

export function PutFacturaEdit(objeto) {
  return AxiosRequest.put("/factura/edit", objeto);
}

export function PutFacturaEditEstado(id) {
  return AxiosRequest.put("/factura/editEstado/"+ id,{});
}

export function PutFacturaEstado(objeto) {
  return AxiosRequest.put("/factura/editEstadoAct", objeto);
}




//medio pago --------------------------------------------
export function GetMedioPago(id) {
  return AxiosRequest.get("/medio-pago/get/"+ id,{});
}



//pagos --------------------------------------------

export function GetPagos() {
  return AxiosRequest.get("/pago/get-all",{});
}

export function GetPagosDto() {
  return AxiosRequest.get("/pago/get-all-dto",{});
}


export function GetPago(id) {
  return AxiosRequest.get("/pago/get/"+ id,{});
}

export function PutPagosEdit(objeto) {
  return AxiosRequest.put("/pago/edit", objeto);
}

export function PutPagosEditState(objeto) {
  return AxiosRequest.put("/pago/editState", objeto);
}

export function DeletePago(id) {
  return AxiosRequest.delete("/pago/delete/"+ id,{});
}

export function PostPago(objeto) {
  return AxiosRequest.post("/pago/save", objeto);
}

//compras ---------------------------------------------

export function GetCompra(id) {
  return AxiosRequest.get("/compra/get/"+ id,{});
}

export function PutCompraEdit(objeto) {
  return AxiosRequest.put("/compra/edit", objeto);
}

//usuario del sistema 
export function PostUsuario(objeto) {
  return AxiosRequest.post("/user/save", objeto);
}



//Auth ---------------------------------------------

export function PostLogin(objeto) {
  return AxiosRequest.post("/user/login", objeto);
}

export function GetRol() {
  return AxiosRequest.get("/user/get-rol", {});
}

export function GetUserByToken() {
  return AxiosRequest.get("/user/getUserByToken",{});
}

export function GetAppUsers() {
  return AxiosRequest.get("/user/get-all", {});
}
