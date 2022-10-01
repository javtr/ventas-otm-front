import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormVenta() {
  //declaraciones

  const { register, control, handleSubmit, watch } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "productos",
  });

  const registerSubmit = (data) => {
    // fields.map((field,index)=>{
    //   console.log(watch(`pr${index}`));
    //   console.log(index);
    // })

    // test();
    // console.log(data.productos.length);
    console.log(Object.values(data));
    
  };

  const ProductosObj = [
    {
      nombre: "Otm",
      precio: 100,
    },
    {
      nombre: "logic",
      precio: 30,
    },
  ];

  //  ----------------------------

  const arrCampos = [0];

  function modificar(index) {
    console.log("--- editar ---");
    arrCampos[index] = 5;
    console.log(arrCampos);
  }

  function agregar() {
    console.log("--- agregar ---");
    arrCampos.push(1);
    console.log(arrCampos);
  }

  const watchFieldArray = watch("nombreProducto");

  function test() {
    fields.map((field, index) => {
      console.log(index);
    });
  }

  //  ----------------------------

  useEffect(() => {}, []);

  return (
    <div className="layout__container--form">
      <p>algo: {watch("nombreProducto")}</p>
      <form onSubmit={handleSubmit(registerSubmit)}>
        {/* seccion producto */}
        <div className="layout__container--form-producto">
          {fields.map(({ id, produc, price }, index) => (
            <div className="productoIt" key={id}>
              <select {...register(`pr: ${index}`)} onChange={(e) => {}}>
                {ProductosObj.map((producto, i) => {
                  return (
                    <option key={i} value={producto.nombre}>
                      {producto.nombre}
                    </option>
                  );
                })}
              </select>

              <input
                {...register(`np: ${index}`)}
                placeholder="cantidad"
                type="number"
              />

              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                Remover
              </button>
            </div>
          ))}

          <button
            className="addButton"
            type="button"
            onClick={() => {
              // agregar();
              append({});
            }}
          >
            Agregar Producto
          </button>
        </div>

        <div className="layout__container--form-pago">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
