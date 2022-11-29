import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PostLogin,
  GetUserByToken,
  GetQueryStatus,
} from "../../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/context";

export default function FormLogin() {
  const { register, control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { userDataContext, setUserDataContext } = useContext(UserContext);
  const [cloudState, setCloudState] = useState("cloud--on");
  const [status, setStatus] = useState("off");

  useEffect(() => {
    getStatus();

    if (localStorage.token == "") {
      console.log("login -No hay usuario");
    } else if (status == "on") {
      pedirUsuario();
    }
  }, []);

  //verificar status
  const getStatus = () => {
    GetQueryStatus()
      .then((response) => {
        // console.log(response.data);

        if (response.data == "ok") {
          setStatus("on");
          setCloudState("cloud--on");
        } else {
          setStatus("off");
          setCloudState("cloud--off");
        }
      })
      .catch((error) => {
        console.log("login-peticion user token fail login");

        setStatus("off");
        setCloudState("cloud--off");

      })
      .finally(() => {});
  };

  //get user by token
  const pedirUsuario = () => {
    GetUserByToken()
      .then((response) => {
        if (response.data === null) {
          console.log("login-responde usuario vacio");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("login-peticion user token fail login");
      })
      .finally(() => {});
  };

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
            state: status
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

  // function turnConection() {
  //   if (localStorage.conection == 1) {
  //     localStorage.conection = 0;
  //     setCloudState("cloud--on");
  //   } else if (localStorage.conection == 0) {
  //     localStorage.conection = 1;
  //     setCloudState("cloud--off");
  //   }
  // }


  // if (status == "on") {
  //   setCloudState("cloud--on");
  // } else {
  //   setCloudState("cloud--off");
  // }

  return (
    <div className="formLoginCont">
      <div className="formLogin__form--buttonReg">
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Registrarse
        </button>
      </div>

      <div className="formLogin">
        <div className="formLogin--cloud">
          <button className={cloudState}>
            {cloudState == "cloud--on" ? "on" : "off"}
          </button>
        </div>

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
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
