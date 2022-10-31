import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { PostLogin, GetUserByToken } from "../../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/context";

export default function FormLogin() {
  const { register, control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { userDataContext, setUserDataContext } = useContext(UserContext);

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
        if (response.data === "auth fail") {
          console.log("password fail");
        } else {
          localStorage.token = response.data;
          pedirUsuario();
        }
      })
      .catch((error) => {
        console.log("user fail");
        console.log(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const pedirUsuario = () => {
    GetUserByToken()
      .then((response) => {
        if (response.data === "") {
          console.log("usuario no existe");
        } else {
          const userDataTemp = {
            id: response.data.id,
            user: response.data.user,
            rol: response.data.rol,
          };

          setUserDataContext(userDataTemp);
        }
      })
      .catch((error) => {
        console.log("peticion fail");
        console.log(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("email")} placeholder="Email" type="text" />

        <input {...register("password")} placeholder="Password" type="text" />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
