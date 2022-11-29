import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  GetCliente,
  PutClienteEdit,
  PutClienteEditEstado,
  PutClienteEstado
} from "../../Services/axiosService";
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
    setValue("estado", usuario.estado == 0 ? true : false);
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
      estado: data.estado ? 0 : 1,
    };

    // console.log(usuarioEditado);

    if (confirm("guardar registro")) {
      // saveCliente(usuarioEditado);

      let estadoAct = data.estado ? 0 : 1;

      //verificar si cambio el estado de la factura
      // if ((estadoAct = !usuario.estado)) {
        if (true) {
        
        // updateClienteEstado(usuarioEditado, data.estado);

        saveCliente(usuarioEditado);
      } else {
        saveCliente(usuarioEditado);
      }
    }
  }

  const saveCliente = (objeto) => {
    PutClienteEdit(objeto)
      .then((response) => {
        alert("cambios guardados");
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };


  const updateClienteEstado = (objeto,estado) => {

    objeto.estado = estado? 0:1;

    PutClienteEstado(objeto)
      .then((response) => {
        alert("cambios guardados");
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };



  const saveClienteEstado = (objeto) => {
    PutClienteEdit(objeto)
      .then((response) => {
        console.log(response);
        alert("usuario eliminado");
        navigate("/reg-clientes");
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };




  const deleteEstadoCliente = (id) => {
    const usuarioEditado = {
      id: parseInt(params.userId),
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      idMachine: usuario.idMachine,
      comentario1: usuario.comentario1,
      comentario2: usuario.comentario2,
      estado: 2,
    };

    if (confirm("eliminar usuario?")) {
      saveClienteEstado(usuarioEditado);
    }
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

              <IconContext.Provider
                value={{ className: "user__cont__content--estado--delete" }}
              >
                <MdDelete
                  onClick={() => {
                    deleteEstadoCliente(usuario.id);
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
              <input {...register("correo")} type="text" />
              <input {...register("idMachine")} type="text" />
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
