import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  GetFactura,
  PutFacturaEdit,
  GetAllMedios,
} from "../../../Services/axiosService";

export default function FormEditFactura() {
  const params = useParams();
  const [factura, setFactura] = useState({});
  const [mediosPago, setMediosPago] = useState([]);
  const { register, control, handleSubmit, watch, setValue } = useForm();

  // inicio
  useEffect(() => {
    obtenerFactura(params.facturaId);
    obtenerMediosPago();
  }, []);

  if (factura) {
    setValue("fecha", factura.fechaCompra);
    setValue("valor", factura.valorCompra);
    setValue("estado", factura.compraActiva == 1 ? true : false);
    if (factura.medioPagoFactura) {
      setValue("medio", factura.medioPagoFactura.id);
    }
  }

  //axios
  const obtenerFactura = (id) => {
    GetFactura(id)
      .then((response) => {
        setFactura(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const obtenerMediosPago = () => {
    GetAllMedios()
      .then((response) => {
        setMediosPago(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const saveFactura = (objeto) => {
    PutFacturaEdit(objeto)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //envio de datos
  function formSumit(data) {
    const facturaEditada = {
      id: factura.id,
      fechaCompra: data.fecha,
      valorCompra: data.valor,
      compraActiva: data.estado,
      medioPagoFactura: {
        id: data.medio,
      },
      tipoPagoFactura: factura.tipoPagoFactura,
      clienteFactura: factura.clienteFactura,
    };

  }

  return (
    <div>
      <form onSubmit={handleSubmit(formSumit)}>
        <div>fecha:</div>
        <input {...register("fecha")} type="text" />

        <div>valor:</div>
        <input {...register("valor")} type="text" />

        <div>Estado: </div>
        <input {...register("estado")} type="checkbox" />

        <div>Medio pago: </div>
        <select {...register("medio")}>
          {mediosPago.map((medio, i) => {
            return (
              <option key={i} value={medio.id}>
                {medio.medioPago}
              </option>
            );
          })}
        </select>

        <br></br>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
}
