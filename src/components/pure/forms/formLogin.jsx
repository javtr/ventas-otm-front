import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PostLogin, GetUserByToken } from "../../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/context";

export default function FormLogin() {
  const { register, control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { userDataContext, setUserDataContext } = useContext(UserContext);

  console.log("llega login");

  function submit(data) {
    const usuarionTemp = {
      user: data.email,
      password: data.password,
    };

    enviarUsuario(usuarionTemp);
  }

  const enviarUsuario = (user) => {
    PostLogin(user)
      .then((response) => {
        if (response.data === null) {
          console.log("password fail");
        } else {
          localStorage.token = response.data;

          const userTemp = {
            id: response.data.id,
            user: response.data.user,
            rol: response.data.rol,
            token: response.data.token,
          };

          setUserDataContext(userTemp);
          console.log("user login");
          console.log(response);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("user fail");
        console.log(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div style={{ width:"300px",margin:"0 auto"}}>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("email")} placeholder="Email" type="text" />

        <input {...register("password")} placeholder="Password" type="text" />

        <button type="submit">Ingresar</button>
      </form>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >Register</button>
    </div>
  );
}
