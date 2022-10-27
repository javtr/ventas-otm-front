import React from "react";
import { useForm } from "react-hook-form";
import { PutVerificarUsuario } from "../../../Services/axiosService";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const { register, control, handleSubmit, watch } = useForm();
  const navigate =  useNavigate();


  function submit(data) {

    const usuarionTemp = {
      user: data.email,
      password: data.password
    };

    enviarUsuario(usuarionTemp);

  }


  const enviarUsuario = (user) => {
    PutVerificarUsuario(user)
      .then((response) => {

        if(response.data==="ok"){
          navigate("/");

        }else{
          alert("datos incorrectos");
        }

      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };



  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register("email")}
          placeholder="Email"
          type="text"
        />

        <input
          {...register("password")}
          placeholder="Password"
          type="text"
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
