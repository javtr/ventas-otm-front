import React, { useState, useEffect, Fragment } from "react";
import PagoRow from "../pure/PagoRow";
import {
  GetPagos,
  GetQueryPagosFecha,
  GetAllMedios,
  GetPagosDto,
  GetQueryPagosActivos,
} from "../../Services/axiosService";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RegPagoRow from "../pure/regPagoRow";

export default function RegPagosCont() {
  const { register, control, handleSubmit, watch } = useForm();
  const [pagos, setPagos] = useState([]);
  const [pagosQuery, setPagosQuery] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [filtroDateIni, setFiltroDateIni] = useState("");
  const [filtroDateFin, setFiltroDateFin] = useState("");
  const [medios, setMedios] = useState([]);
  const pagoSecciones = [];
  const TotalSecciones = [];
  const GranTotal = {
    bruto: 0,
    neto: 0,
  };

  //llamados ------------------------------------------------
  useEffect(() => {
    // obtainPagos();
    obtainMedios();
    obtainPagosQuery();
  }, []);

  const obtainPagosQuery = () => {
    GetQueryPagosActivos()
      .then((response) => {

        // console.log(response.data);

        var objs = response.data.map((x) => ({
          id: x[0],
          fechaPago: x[1],
          fechaDesembolso: x[2],
          valorPago: x[3],
          valorPagoNeto: x[4],
          tipoPago: x[5],
          clienteNombre: x[6],
          estadoPago: x[7]
        }));

        // console.log(objs);


        setPagos(objs);
        

      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

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
    // GetPagos()
    GetPagosDto()
      .then((response) => {
        setPagos(response.data);
        console.log(response.data);
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
      // const estadoPago = pago.facturaPago.clienteFactura.estado;
      // const estadoFactura = pago.facturaPago.compraActiva;

      // if (pago.estadoClientePago == 0 && pago.estadoFacturaPago == 0) {
        if (pago.estadoPago == 0) {
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
        pago.clienteNombre.toLowerCase().includes(filtro.toLocaleLowerCase())
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
            if (
              //filtros de estado de pago, cliente y factura
              pago.tipoPago == medio &&
              pago.estadoPago == 0 
              // pago.estadoFacturaPago == 0 &&
              // pago.estadoClientePago == 0
            ) {
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
          // if (obj.estado == 1) {
          return Math.round(acc + obj.valorPago);
          // }
        }, 0),

        valorNeto: seccion.reduce(function (acc, obj) {
          // if (obj.estado == 1) {
          return Math.round(acc + obj.valorPagoNeto);
          // }
        }, 0),
      });
    }
  }

  if (TotalSecciones.length > 0) {
    TotalSecciones.map((seccion) => {
      GranTotal.bruto = GranTotal.bruto + seccion.valorBruto;
      GranTotal.neto = GranTotal.neto + seccion.valorNeto;
    });
  }

  // console.log(pagos);

  return (
    <div className="regPagos">
      <div className="regPagos__cont">
        <div className="regPagos__cont--titleCont">
          <div className="regPagos__cont--title"></div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="regPagos__cont__form"
        >
          <div className="regPagos__cont__form--date">
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

          <div className="regPagos__cont__form--date">
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
            className="regPagos__cont__form--nombre"
            {...register("filtro nombre")}
            placeholder="Nombre"
            onChange={(e) => setFiltro(e.target.value)}
            type="text"
          />
        </form>

        <div className="regPagos__cont__total">
          <div className="regPagos__cont__total--neto">
            <h4>${GranTotal.bruto}</h4>
            <p>Bruto</p>
          </div>

          <div className="regPagos__cont__total--neto">
            <h4>${GranTotal.neto}</h4>
            <p>Neto</p>
          </div>
        </div>

        {/* <div className="regPagos__cont__lineaCont">
          <hr className="regPagos__cont__lineaCont--linea"></hr>
        </div> */}

        <div className="regPagos__cont__tabla">
          {pagoSecciones ? (
            pagoSecciones.map((seccion, index) => (
              <div key={index}>
                {seccion.length > 0 && TotalSecciones.length > 0 ? (
                  <div>
                    <div className="regPagos__cont__tabla__lineCont">
                      <div className="regPagos__cont__tabla__lineCont--line"></div>
                    </div>

                    <div className="regPagos__cont__tabla__total">
                      <div className="regPagos__cont__tabla__total--medio">
                        <h4>{seccion[0].tipoPago}</h4>
                      </div>

                      <div className="regPagos__cont__tabla__total--neto">
                        <h4>${TotalSecciones[index].valorBruto}</h4>
                        <p>Bruto</p>
                      </div>

                      <div className="regPagos__cont__tabla__total--neto">
                        <h4>${TotalSecciones[index].valorNeto}</h4>
                        <p>Neto</p>
                      </div>
                    </div>
                    <table className="regPagos__cont__tabla__tbl">
                      <thead className="regPagos__cont__tabla__tbl--header">
                        <tr className="regPagos__cont__tabla__tbl--header--row">
                          <th className="regPagos__cont__tabla__tbl--header--r1">
                            Pago/Desemb
                          </th>
                          <th className="regPagos__cont__tabla__tbl--header--r2">
                            Bruto
                          </th>
                          <th className="regPagos__cont__tabla__tbl--header--r3">
                            Neto
                          </th>
                          <th className="regPagos__cont__tabla__tbl--header--r4">
                            Tipo Pago
                          </th>
                          <th className="regPagos__cont__tabla__tbl--header--r5">
                            Cliente
                          </th>
                        </tr>
                      </thead>
                      <tbody className="regPagos__cont__tabla__tbl--body">
                        {seccion.map((pago, index) => (
                          <Fragment key={index}>
                            <tr className="regPagos__cont__tabla__tbl--body--line"></tr>
                            <tr className="regPagos__cont__tabla__tbl--body--row">
                              <RegPagoRow
                                // key={index}
                                pago={pago}
                              ></RegPagoRow>
                            </tr>
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <Fragment></Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
