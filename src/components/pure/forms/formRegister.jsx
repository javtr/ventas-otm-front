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
      password: data.password,
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
    <div className="formLoginCont">
      <div className="formLogin__form--buttonReg">
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
      </div>

      <div className="formLogin">
        <form className="formLogin__form" onSubmit={handleSubmit(submit)}>
          <div className="formLogin__form--input">
            <input {...register("email")} placeholder="Email" type="text" />
          </div>

          <div className="formLogin__form--input">
            <input
              {...register("password")}
              placeholder="Password"
              type="text"
            />
          </div>

          <div className="formLogin__form--button">
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
