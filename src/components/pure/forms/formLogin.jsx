import React from "react";
import { useForm } from "react-hook-form";
import { PostLogin } from "../../../Services/axiosService";
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
    PostLogin(user)
      .then((response) => {


        if(response.data==="auth fail"){
         console.log("password fail");
        }else{
          alert("login correcto");
          localStorage.token = response.data;
          localStorage.email = user.user;
        }

      })
      .catch((error) => {
        console.log("user fail");
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
