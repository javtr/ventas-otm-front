import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function FormVenta() {
  //declaraciones
  const { register, control, handleSubmit } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "students",
  });

  const subs = [
    { name: "Math", price: 20 },
    { name: "English", price: 70 },
  ];

  const registerSubmit = (data) => {
    console.log(data);
  };

  const Productos = ["seleccionar...", "otm", "logic"];

  //manejo de envio con fetch
  function submitHandle(values) {
    const valuesSend = {
      nombre: values.firstName,
      apellido: values.lastName,
      correo: values.email,
    };

    console.log(valuesSend);

    fetch("http://localhost:8080/cliente/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valuesSend),
    }).then(() => {
      console.log("cliente agregado");
    });
  }

  useEffect(() => {
    console.log("al iniciar");
    append({});
  }, []);

  return (
    <div className="layout__container--form">
      <form onSubmit={handleSubmit(registerSubmit)}>
        <div className="layout__container--form-nombre">
          <input
            {...register("nombre_cliente")}
            placeholder="nombre cliente"
            type="text"
          />

          <input
            {...register("apellido_cliente")}
            placeholder="apellido cliente"
            type="text"
          />

          <input
            {...register("correo_cliente")}
            placeholder="correo cliente"
            type="text"
          />
        </div>

        <div className="layout__container--form-producto">
          {fields.map(({ id, producto, precio }, index) => (
            <div key={id}>
              <input
                {...register(`students[${index}].producto`)}
                placeholder="name"
                defaultValue={producto}
                type="text"
              />
              <br />
              <input
                {...register(`students[${index}].precio`, {
                  pattern: {
                    value: /^[0-9]+([.])?([0-9]+)?$/,
                    message: "Please enter a number",
                  },
                })}
                placeholder="precio"
                defaultValue={precio}
                type="text"
              />
              <br />

              <select {...register("Producto")}>
                {Productos.map((producto, i) => {
                  return (
                    <option key={i} value={producto}>
                      {producto}
                    </option>
                  );
                })}
              </select>

              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({})}>
            Add Student
          </button>
        </div>

        <div className="layout__container--form-pago">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
