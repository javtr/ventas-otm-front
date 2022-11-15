const validatorForm = (data) => {

  if (data.cliente_check) {
    //cliente ------------------------
    if (typeof data.cliente_id === "string" && data.cliente_id.length === 0) {
      return "error id cliente existente";
    }
  } else {
    if (data.nombre_cliente == "") {
      return "error nombre";
    }

    if (data.apellido_cliente == "") {
      return "error apellido";
    }

    if (data.idMachine_cliente == "") {
      return "error id machine";
    }

    if (data.correo_cliente == "") {
      return "error correo machine";
    }
  }

  //producto ------------------------
  if (data.productos.length == 0) {
    return "error producto";
  }

  //pago ------------------------
  if (!data.fecha) {
    return "error fecha";
  }

  if (
    typeof data.medio_pago === "string" &&
    data.medio_pago.length === 0
  ) {
    return "error medio";

  }

  if (
    typeof data.tipo_pago === "string" &&
    data.tipo_pago.length === 0
  ) {
    return "error tipo";
    
  }

  return "ok";
};

export { validatorForm };
