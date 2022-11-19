import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { GetCliente, PutClienteEdit } from "../../Services/axiosService";
import { useParams } from "react-router-dom";

const Cliente = () => {
  const { register, control, handleSubmit, watch, setValue } = useForm();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

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
    setValue("estado", usuario.estado == 1 ? true : false);
  }

  //envio formulario
  function registerSubmit(data) {
    const usuarioEditado = {
      id: parseInt(params.userId),
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      idMachine: data.idMachine,
      comentario1: data.comentario1,
      comentario2: data.comentario2,
      estado: data.estado ? 1 : 0,
    };

    console.log(usuarioEditado);
    //saveCliente(usuarioEditado);
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
    <div className="user">
      <div className="user__cont">
        <div className="user__cont--titleCont">
          <div className="user__cont--title"></div>
        </div>

        <div className="user__cont__content">
          <form onSubmit={handleSubmit(registerSubmit)}>
            <div className="user__cont__content--estado">
              {/* <input {...register("estado")} type="checkbox" /> */}


              <IconContext.Provider value={{ className: "user__cont__content--estado--delete" }}>
                <MdDelete
                  onClick={() => {
                    editarCliente(usuario.id);
                  }}
                />
              </IconContext.Provider>

              <div className="checkEstado user__cont__content--estado--check">
                <input
                  className="checkEstado--input"
                  type="checkbox"
                  {...register("estado")}
                  onChange={(e) => {}}
                />

                <div className="checkEstado--shape"></div>
              </div>
            </div>

            <div className="user__cont__content--nombre">
              <input {...register("nombre")} type="text" />
              <input {...register("apellido")} type="text" />
            </div>

            <div className="user__cont__content--email">
              <input
                {...register("correo")}
                type="text"
              />
              <input
                {...register("idMachine")}
                type="text"
              />
            </div>

            <div className="user__cont__content--comentario">
              <input {...register("comentario1")} type="textarea" />
              <input {...register("comentario2")} type="textarea" />
            </div>

            <div className="user__cont__content--boton">
              <button type="submit">Enviar cambios</button>
            </div>
          </form>
        </div>

        {/* <div>
          <h2>User</h2>
          <br></br>
          {"id:" + usuario.id}
          <br></br>
          {"nombre:" + usuario.nombre}
          <br></br>
          {"apellido:" + usuario.apellido}
          <br></br>
          {"apellido:" + usuario}

          <br></br>
          <IconContext.Provider value={{ className: "iconos1" }}>
            <MdDelete
              onClick={() => {
                editarCliente(usuario.id);
              }}
            />
          </IconContext.Provider>
        </div> */}
      </div>
    </div>
  );
};

export default Cliente;
