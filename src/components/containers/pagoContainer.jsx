import React, { useState, useEffect } from "react";
import PagoRow from "../pure/PagoRow";
import { GetPagos } from "../../Services/axiosService";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PagoContainer = () => {
  const [pagos, setPagos] = useState([]);
  const { register, control, handleSubmit, watch } = useForm();

  useEffect(() => {
    obtainPagos();
  }, []);


  function onSubmitForm(data) {

    const dataForm = {
        fechaInicio : data.fechaInicio,
        fechaFin : data.fechaFin

    }
    console.log(dataForm);

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
                  placeholderText="Fecha"
                  onChange={(e) => field.onChange(e)}
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
                  placeholderText="Fecha"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                />
              )}
            />
          </div>

          <button type="submit">Submit</button>
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
          {pagos.map((pago, index) => (
            <PagoRow key={index} pago={pago}></PagoRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagoContainer;
