import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormVenta() {
  //declaraciones

  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState(0);
  const [arr, setArr] = useState([]);


  const { register, control, handleSubmit, watch } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "productos",
  });

  const registerSubmit = (data) => {
    console.log(data);
  };

  const ProductosObj = [
    {
      nombre: "select..",
      precio: 0,
    },
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
    function editArray(value,index) {

      const numbersCopy = [...arr];

      numbersCopy[index]=parseInt(value);

      setArr(numbersCopy);

      console.log(arr);
    }


  //  ----------------------------

  useEffect(() => {}, []);

  return (
    <div className="layout__container--form">
      <p>algo: {watch("apellido_cliente")}</p>



      <form onSubmit={handleSubmit(registerSubmit)}>


      <input
            {...register("apellido_cliente")}
            placeholder="apellido cliente"
            type="text"
          />

        {/* seccion producto */}
        <div className="layout__container--form-producto">
          {fields.map(({ id, produc, price }, index) => (
            <div className="productoIt" key={index}>
              <select
                {...register(`pr: ${index}`)}

                onChange={(e) => {

                  editArray(e.target.value,index);


                }}


              >
                {ProductosObj.map((producto, i) => {
                  return (
                    <option
                      key={i}
                      value={i}
                    >
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

              {/* {value!=null && watch(`pr: ${index}`) ? (
                <div>
                <p>valor:{value}</p>
                <p>{ProductosObj[watch(`pr: ${index}`)].precio}</p>
                </div>
              ) : (
                ""
              )} */}

              <p>valor:{ProductosObj[arr[index]].precio}</p>
              {/* <p>valor:{`pr: ${index}`}</p>
              <p>algo: {watch("apellido_cliente")}</p> */}
              

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
              setArr(arr => [...arr, 0])
              append({});
              console.log(arr);
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
