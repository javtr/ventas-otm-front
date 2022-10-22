import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GetCompra, PutCompraEdit } from "../../../Services/axiosService";

export default function FormEditCompra() {
  //declaraciones
  const [compra, setCompra] = useState({});

  const params = useParams();
  const { register, control, handleSubmit, watch, setValue } = useForm();

  //obtener cliente
  useEffect(() => {
    obtenerCompra(params.compraId);
  }, []);

  const obtenerCompra = (id) => {
    GetCompra(id)
      .then((response) => {
        setCompra(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //usuario iniciado
  if (compra) {
    setValue("bruto", compra.precioCompra);
    setValue("neto", compra.precioFinal);
    setValue("cantidad", compra.cantidad);
    // setValue("neto", pago.valorPagoNeto);
  }

  //envio formulario
  function compraSubmit(data) {

    const compraEditado = {
      id: compra.id,
      precioCompra: data.bruto,
      precioFinal: data.neto,
      cantidad: data.cantidad,
      productoCompra:compra.productoCompra,
      clienteCompra:compra.clienteCompra,
      facturaCompra:compra.facturaCompra,

    };

    // console.log(compraEditado);

    saveCompra(compraEditado);
  }

  const saveCompra = (objeto) => {
    PutCompraEdit(objeto)
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
      <form onSubmit={handleSubmit(compraSubmit)}>


        <div>Precio bruto:</div>
        <input {...register("bruto")} type="text" />

        <div>Precio neto:</div>
        <input {...register("neto")} type="text" />

        <div>Cantidad:</div>
        <input {...register("cantidad")} type="number" />

        <br></br>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
}
