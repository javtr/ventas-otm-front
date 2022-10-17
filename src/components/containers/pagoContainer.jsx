import React, { useState, useEffect } from "react";
import PagoRow from "../pure/PagoRow";
import { GetPagos, GetQueryPagosFecha } from "../../Services/axiosService";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PagoContainer = () => {
  const { register, control, handleSubmit, watch } = useForm();
  const [pagos, setPagos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [filtroDateIni, setFiltroDateIni] = useState("");
  const [filtroDateFin, setFiltroDateFin] = useState("");

  useEffect(() => {
    obtainPagos();
  }, []);

  function onSubmitForm(data) {
    const dataForm = {
      fechaInicio: formatDate(data.fechaInicio),
      fechaFin: formatDate(data.fechaFin),
    };

    obtainPagosFecha(dataForm);
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const obtainPagos = () => {
    GetPagos()
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const obtainPagosFecha = (dataForm) => {
    GetQueryPagosFecha(dataForm)
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //filtrado de datos -------------------------------------------
  let resultados = pagos;

  //filtrado por fechas
  if (filtroDateIni) {
    resultados = resultados.filter(function (pago) {
      if (pago.fechaPago >= filtroDateIni) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (filtroDateFin) {
    resultados = resultados.filter(function (pago) {
      if (pago.fechaPago <= filtroDateFin) {
        return true;
      } else {
        return false;
      }
    });
  }

  //filtro por nombre
  if (filtro) {
    resultados = resultados.filter(function (pago) {
      if (
        pago.facturaPago.clienteFactura.nombre
          .toLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        pago.facturaPago.clienteFactura.apellido
          .toLowerCase()
          .includes(filtro.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
  }


  resultados = resultados.sort((p1, p2) =>
    p1.fechaPago > p2.fechaPago ? 1 : p1.fechaPago < p2.fechaPago ? -1 : 0
  );



  



  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <Controller
              control={control}
              name="fechaInicio"
              render={({ field }) => (
                <DatePicker
                  className="input"
                  placeholderText={
                    filtroDateIni ? filtroDateIni : "Fecha Inicio"
                  }
                  onChange={(e) => setFiltroDateIni(formatDate(e))}
                  selected={field.value}
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="fechaFin"
              render={({ field }) => (
                <DatePicker
                  className="input"
                  placeholderText={filtroDateFin ? filtroDateFin : "Fecha Fin"}
                  onChange={(e) => setFiltroDateFin(formatDate(e))}
                  selected={field.value}
                />
              )}
            />
          </div>

          <input
            {...register("filtro nombre")}
            placeholder="Nombre"
            onChange={(e) => setFiltro(e.target.value)}
            type="text"
          />

          {/* <button type="submit">Submit</button> */}
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Desembolso</th>
            <th>Valor</th>
            <th>Neto</th>
            <th>Medio</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((pago, index) => (
            <PagoRow key={index} pago={pago}></PagoRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagoContainer;
