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
  



//cliente --------------------------------------------
  
export function GetCliente(id) {
  
  return AxiosRequest.get("/cliente/get/"+ id,{});
}