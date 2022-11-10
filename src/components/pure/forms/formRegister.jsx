import React from "react";
import { useForm } from "react-hook-form";
import { PostUsuario } from "../../../Services/axiosService";
import { useNavigate } from "react-router-dom";



export default function FormRegister() {
  const { register, control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

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
        console.log(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div style={{ width:"300px",margin:"0 auto"}}>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("email")} placeholder="Email" type="text" />

        <input {...register("password")} placeholder="Password" type="text" />

        <button type="submit">Registrar</button>
      </form>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >login</button>
    </div>
  );
}
