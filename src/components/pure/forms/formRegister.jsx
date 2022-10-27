import React from "react";
import { useForm } from "react-hook-form";
import { PostUsuario } from "../../../Services/axiosService";

export default function FormRegister() {
  const { register, control, handleSubmit, watch } = useForm();

  function submit(data) {

    const usuarionTemp = {
      user: data.email,
      password: data.password
    };

    enviarUsuario(usuarionTemp);
  }

  const enviarUsuario = (user) => {
    PostUsuario(user)
      .then((response) => {
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("email")} placeholder="Email" type="text" />

        <input {...register("password")} placeholder="Password" type="text" />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
