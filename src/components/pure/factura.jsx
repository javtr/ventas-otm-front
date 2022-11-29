import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { GetCliente, PutFacturaEditEstado } from "../../Services/axiosService";
import { useParams } from "react-router-dom";
import {
  GetFactura,
  PutFacturaEdit,
  GetAllMedios,
  PutFacturaEstado,
} from "../../Services/axiosService";
import PagosDetailCont from "../containers/pagosDetailCont";
import ComprasDetailCont from "../containers/comprasDetailCont";

const Factura = ({ facturaProp }) => {
  const params = useParams();
  const [factura, setFactura] = useState({});
  const [mediosPago, setMediosPago] = useState([]);
  const { register, control, handleSubmit, watch, setValue } = useForm();
  const [cambioEstadoFactura, setCambioEstadoFactura] = useState(false);

  const navigate = useNavigate();

  // inicio
  useEffect(() => {
    // obtenerFactura(facturaProp.id);
    setFactura(facturaProp);
    obtenerMediosPago();
  }, []);

  if (factura) {
    setValue("fecha", factura.fechaCompra);
    setValue("valor", factura.valorCompra);
    setValue("estado", !factura.compraActiva);

    if (factura.medioPagoFactura) {
      setValue("medio", factura.medioPagoFactura.id);
    }
  }

  //axios
  const obtenerFactura = (id) => {
    GetFactura(id)
      .then((response) => {
        setFactura(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const obtenerMediosPago = () => {
    GetAllMedios()
      .then((response) => {
        setMediosPago(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const saveFactura = (objeto) => {
    PutFacturaEdit(objeto)
      .then((response) => {
        console.log(response);
        alert("cambios guardados");
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const editarEstadoFactura = (objeto,estado) => {

    objeto.compraActiva = estado? 0:1;

    console.log(objeto);

    PutFacturaEstado(objeto)
      .then((response) => {
        console.log(response);
        alert("cambios guardados");
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});

  };

  const saveFacturaEstado = (objeto) => {
    PutFacturaEdit(objeto)
      .then((response) => {
        alert("factura eliminada, recargar pagina");
        // navigate(`/cliente/${facturaProp.clienteFactura.id}`);
        navigate("/reg-clientes");
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //envio de datos
  function formSumit(data) {

    const facturaEditada = {
      id: factura.id,
      fechaCompra: data.fecha,
      valorCompra: data.valor,
      compraActiva: data.estado ? 0 : 1,
      medioPagoFactura: {
        id: data.medio,
      },
      tipoPagoFactura: factura.tipoPagoFactura,
      clienteFactura: factura.clienteFactura,
    };

    if (confirm("guardar cambios?")) {

      let estadoAct = data.estado ? 0 : 1;

      //verificar si cambio el estado de la factura
      // if (estadoAct =! factura.compraActiva) {
        if (true) {


        editarEstadoFactura(facturaEditada,data.estado);
      } else {
        saveFactura(facturaEditada);
      }

    }
  }

  const deleteEstado = (id) => {
    console.log(id);

    const facturaEditada = {
      id: factura.id,
      fechaCompra: factura.fechaCompra,
      valorCompra: factura.valorCompra,
      compraActiva: 2,
      medioPagoFactura: {
        id: factura.medioPagoFactura.id,
      },
      tipoPagoFactura: factura.tipoPagoFactura,
      clienteFactura: factura.clienteFactura,
    };

    if (confirm("eliminar factura?")) {
      saveFacturaEstado(facturaEditada);
    }
  };

  return (
    <div className="factura">
      <div className="factura__cont">
        <div className="factura__cont--titleCont">
          <div className="factura__cont--title"></div>
        </div>

        <div className="factura__cont__content">
          <form onSubmit={handleSubmit(formSumit)}>
            <div className="factura__cont__content--estado">
              {/* <input {...register("estado")} type="checkbox" /> */}

              <IconContext.Provider
                value={{ className: "factura__cont__content--estado--delete" }}
              >
                <MdDelete
                  onClick={() => {
                    deleteEstado(facturaProp.id);
                  }}
                />
              </IconContext.Provider>

              <div className="checkEstado factura__cont__content--estado--check">
                <input
                  className="checkEstado--input"
                  type="checkbox"
                  {...register("estado")}
                  onChange={(e) => {
                    // console.log("edita");
                    // setCambioEstadoFactura(true);
                  }}
                />

                <div className="checkEstado--shape"></div>
              </div>
            </div>

            <div className="factura__cont__content--nombre">
              <input {...register("fecha")} type="text" />
              <input {...register("valor")} type="text" />
            </div>

            <div className="factura__cont__content--nombre">
              <select {...register("medio")}>
                {mediosPago.map((medio, i) => {
                  return (
                    <option key={i} value={medio.id}>
                      {medio.medioPago}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="factura__cont__content--boton">
              <button type="submit">Enviar cambios</button>
            </div>
          </form>
        </div>

        <hr className="factura__cont__linea"></hr>

        <PagosDetailCont facturaId={facturaProp.id}></PagosDetailCont>

        <ComprasDetailCont facturaId={facturaProp.id}></ComprasDetailCont>
      </div>
    </div>
  );
};

export default Factura;
