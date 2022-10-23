import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { PostPago } from "../../../Services/axiosService";

export default function FormAddPago() {
  //declaraciones
  const params = useParams();
  const { register, control, handleSubmit, watch, setValue } = useForm();


  //obtener cliente
  useEffect(() => {}, []);

  //envio formulario
  function pagoSubmit(data) {

    const nuevoPago = {
      fechaPago: data.fecha,
      fechaDesembolso: data.desembolso,
      valorPago:  data.bruto,
      valorPagoNeto: data.neto,
      facturaPago: {
        id: params.pagoId,
      },
    };

    // console.log(nuevoPago);
    savePago(nuevoPago);
  }

  const savePago = (objeto) => {
    PostPago(objeto)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  // "fechaPago": "2021-11-14",
  // "fechaDesembolso": "2022-01-02",
  // "valorPago": 100.0,
  // "valorPagoNeto": 91.1,
  // "facturaPago": {
  //     "id": 96
  // }

  return (
    <div>
      <form onSubmit={handleSubmit(pagoSubmit)}>
        <div>Fecha pago:</div>
        <input {...register("fecha")} type="text" />

        <div>Fecha desembolso:</div>
        <input {...register("desembolso")} type="text" />

        <div>Valor: </div>
        <input {...register("bruto")} type="text" />

        <div>Valor final: </div>
        <input {...register("neto")} type="text" />

        <br></br>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
}
