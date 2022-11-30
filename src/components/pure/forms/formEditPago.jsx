import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GetPago, PutPagosEdit,GetAllMedios } from "../../../Services/axiosService";

export default function FormEditPago() {
  //declaraciones
  const [pago, setPago] = useState({});

  const params = useParams();
  const { register, control, handleSubmit, watch, setValue } = useForm();
  // const [mediosPago, setMediosPago] = useState([]);



  //obtener cliente
  useEffect(() => {
    obtenerPago(params.pagoId);
    // obtenerMediosPago();
  }, []);


  // const obtenerMediosPago = () => {
  //   GetAllMedios()
  //     .then((response) => {
  //       setMediosPago(response.data);
  //     })
  //     .catch((error) => {
  //       alert(`Somethin went wrong: ${error}`);
  //     })
  //     .finally(() => {
  //       setMediosPago((mediosPagos) => [
          
  //         ...mediosPagos,
  //       ]);
  //     });
  // };

  const obtenerPago = (id) => {
    GetPago(id)
      .then((response) => {
        setPago(response.data);
        console.log(response.data);
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
      valorPagoNeto: data.neto,
      estado: data.estado,
      facturaPago: pago.facturaPago,
    };

    pago.fechaPago = data.fecha;
    pago.fechaDesembolso = data.desembolso;
    pago.valorPago = data.bruto;
    pago.valorPagoNeto = data.neto;
    pago.estado = data.estado;
    // pago.facturaPago.medioPagoFactura.id
    


    savePago(pagoEditado);
  }

  const savePago = (objeto) => {
    PutPagosEdit(pago)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  if (pago.facturaPago) {
    setValue("medio", pago.facturaPago.medioPagoFactura.id);
  }


  return (
    <div className="formPago">
      <form className="formPago__form" onSubmit={handleSubmit(pagoSubmit)}>
        <div className="formPago__form--input">
          <div>Fecha:</div>
          <input {...register("fecha")} type="text" />
        </div>

        <div className="formPago__form--input">
          <div>Desembolso:</div>
          <input {...register("desembolso")} type="text" />
        </div>

        <div className="formPago__form--input">
          <div>Bruto:</div>
          <input {...register("bruto")} type="text" />
        </div>

        <div className="formPago__form--input">
          <div>Neto:</div>
          <input {...register("neto")} type="text" />
        </div>

        <div className="formPago__form--input">
          <div>Estado:</div>
          <input {...register("estado")} type="number" />
        </div>

        {/* <div className="formPago__form--input">
          <select {...register("medio")}>
            {mediosPago.map((medio, i) => {
              return (
                <option key={i} value={medio.id}>
                  {medio.medioPago}
                </option>
              );
            })}
          </select>
        </div> */}

        <div className="formPago__form--button">
          <br></br>
          <button type="submit">Modificar</button>
        </div>
      </form>
    </div>
  );
}
