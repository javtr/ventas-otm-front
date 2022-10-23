import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GetPago, PutPagosEdit } from "../../../Services/axiosService";

export default function FormEditPago() {
  //declaraciones
  const [pago, setPago] = useState({});

  const params = useParams();
  const { register, control, handleSubmit, watch, setValue } = useForm();

  //obtener cliente
  useEffect(() => {
    obtenerCliente(params.pagoId);
  }, []);

  const obtenerCliente = (id) => {
    GetPago(id)
      .then((response) => {
        setPago(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //usuario iniciado
  if (pago) {
    setValue("fecha", pago.fechaPago);
    setValue("desembolso", pago.fechaDesembolso);
    setValue("bruto", pago.valorPago);
    setValue("neto", pago.valorPagoNeto);
    setValue("estado", pago.estado);
  }

  //envio formulario
  function pagoSubmit(data) {
    const pagoEditado = {
      id: pago.id,
      fechaPago: data.fecha,
      fechaDesembolso: data.desembolso,
      valorPago: data.bruto,
      valorPagoNeto:data.neto,
      estado:data.estado,
      facturaPago: pago.facturaPago,
    };

    // console.log(pagoEditado);

    savePago(pagoEditado);
  }

  const savePago = (objeto) => {
    PutPagosEdit(objeto)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(pagoSubmit)}>
        <div>Fecha:</div>
        <input {...register("fecha")} type="text" />

        <div>Desembolso:</div>
        <input {...register("desembolso")} type="text" />

        <div>Bruto:</div>
        <input {...register("bruto")} type="text" />

        <div>Neto:</div>
        <input {...register("neto")} type="text" />

        <div>Estado:</div>
        <input {...register("estado")} type="number" />

        <br></br>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
}
