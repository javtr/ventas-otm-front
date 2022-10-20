import React, { useState, useEffect } from "react";
import PagoRow from "../pure/PagoRow";
import {
  GetPagos,
  GetQueryPagosFecha,
  GetAllMedios,
} from "../../Services/axiosService";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PagoContainer = () => {
  //declaraciones ------------------------------------------------
  const { register, control, handleSubmit, watch } = useForm();
  const [pagos, setPagos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [filtroDateIni, setFiltroDateIni] = useState("");
  const [filtroDateFin, setFiltroDateFin] = useState("");
  const [medios, setMedios] = useState([]);
  const pagoSecciones = [];
  const TotalSecciones = [];
  const GranTotal = {
    bruto:0,
    neto:0
  };

  //llamados ------------------------------------------------
  useEffect(() => {
    obtainPagos();
    obtainMedios();
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

  //axios ------------------------------------------------
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

  const obtainMedios = () => {
    GetAllMedios()
      .then((response) => {
        setMedios(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  //filtrado de datos -------------------------------------------
  let resultados = pagos;


  //filtrado por estado
  if (true) {
    resultados = resultados.filter(function (pago) {
      const estadoPago = pago.facturaPago.clienteFactura.estado;
      const estadoFactura = pago.facturaPago.compraActiva;

      if (estadoPago==1 && estadoFactura) {
        return true;
      } else {
        return false;
      }
    });
  }
  //filtrado por fechas
  if (filtroDateIni) {
    resultados = resultados.filter(function (pago) {


      if (pago.fechaDesembolso >= filtroDateIni) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (filtroDateFin) {
    resultados = resultados.filter(function (pago) {
      if (pago.fechaDesembolso <= filtroDateFin) {
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

  //ordenar los datos
  resultados = resultados.sort((p1, p2) =>
    p1.fechaPago > p2.fechaPago ? 1 : p1.fechaPago < p2.fechaPago ? -1 : 0
  );

  //dividir resultados en medios de pago ---------------------------------------------------------

  if (medios.length > 0 && resultados.length > 0) {
    for (let i = 0; i < medios.length; i++) {
      const medio = medios[i].medioPago;

      if (resultados.length > 0) {
        pagoSecciones.push(
          resultados.filter(function (pago) {
            if (pago.facturaPago.medioPagoFactura.medioPago === medio) {
              return true;
            } else {
              return false;
            }
          })
        );
      }
    }
  }

  //calcular totales ----------------------------------------------

  if (pagoSecciones.length > 0) {
    for (let i = 0; i < pagoSecciones.length; i++) {
      const seccion = pagoSecciones[i];

      TotalSecciones.push({
        valorBruto: seccion.reduce(function (acc, obj) {
          return Math.round(acc + obj.valorPago);
        }, 0),

        valorNeto: seccion.reduce(function (acc, obj) {
          return Math.round(acc + obj.valorPagoNeto);
        }, 0),

      });
    }

  }


  if (TotalSecciones.length>0) {
  TotalSecciones.map((seccion)=>{
    GranTotal.bruto = GranTotal.bruto + seccion.valorBruto;
    GranTotal.neto = GranTotal.neto + seccion.valorNeto;
  })
}


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

        {/* Tabla ------------------------------------- */}
      </div>

      {pagoSecciones
        ? pagoSecciones.map((seccion, index) => (
            <div key={index}>
              {seccion.length > 0 && TotalSecciones.length > 0 ? (
                <div>
                  <h3>{seccion[0].facturaPago.medioPagoFactura.medioPago}</h3>
                  <h5>Bruto: {TotalSecciones[index].valorBruto}</h5>
                  <h5>Neto: {TotalSecciones[index].valorNeto}</h5>
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
                      {seccion.map((pago, index2) => (
                        <PagoRow key={index2} pago={pago}></PagoRow>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        : resultados.map((pago, index) => (
            <PagoRow key={index} pago={pago}></PagoRow>
          ))}

    <h2>Totales</h2>    
    <h4>Bruto: {GranTotal.bruto}</h4>
    <h4>Neto: {GranTotal.neto}</h4>
    </div>
  );
};

export default PagoContainer;
