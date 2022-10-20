import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GetCliente,PutClienteEdit } from "../../../Services/axiosService";

export default function FormEditCliente() {
  //declaraciones

  const params = useParams();
  const [usuario, setUsuario] = useState(null);
  const { register, control, handleSubmit, watch, setValue } = useForm();

  //obtener cliente
  useEffect(() => {
    obtenerCliente(params.userId);
  }, []);

  const obtenerCliente = (id) => {
    GetCliente(id)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //usuario iniciado
  if (usuario) {
    setValue("nombre", usuario.nombre);
    setValue("apellido", usuario.apellido);
    setValue("correo", usuario.correo);
    setValue("idMachine", usuario.idMachine);
    setValue("comentario1", usuario.comentario1);
    setValue("comentario2", usuario.comentario2);
    setValue("estado", usuario.estado==1? true:false);
  }

  //envio formulario
  function registerSubmit(data) {


    const usuarioEditado = {
      id : parseInt(params.userId),
      nombre:data.nombre,
      apellido:data.apellido,
      correo:data.correo,
      idMachine:data.idMachine,
      comentario1:data.comentario1,
      comentario2:data.comentario2,
      estado:data.estado? 1:0
    }

    console.log(usuarioEditado);
    saveCliente(usuarioEditado);
  }

  const saveCliente = (objeto) => {
    PutClienteEdit(objeto)
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
      <form onSubmit={handleSubmit(registerSubmit)}>
        <div>Nombre:</div>
        <input {...register("nombre")} type="text" />

        <div>Apellido:</div>
        <input {...register("apellido")} type="text" />

        <div>Correo: </div>
        <input {...register("correo")} type="text" />

        <div>IdMachine: </div>
        <input {...register("idMachine")} type="text" />

        <div>Comentario:</div>
        <input {...register("comentario1")} type="textarea" />

        <div>Comentario: </div>
        <input {...register("comentario2")} type="textarea" />

        <div>Estado: </div>
        <input {...register("estado")} type="checkbox" />

        <br></br>
        <button type="submit">Modificar</button>


      </form>
    </div>
  );
}
