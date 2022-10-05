import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetAllProducts } from "../../../Services/axiosService";

export default function FormVenta() {
  const [arr, setArr] = useState([]);
  const [tipoPago, setTipoPago] = useState(0);
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "productos",
  });

  const [products, setProducts] = useState(null);
  const ProductosObj = [];


  useEffect(() => {
    obtainUser();
  }, []);

  const registerSubmit = (data) => {
    console.log(data);
  };

  //services

  const obtainUser = () => {

    console.log("llega a obtainUser");

    GetAllProducts()
      .then((response) => {
        // if (response.status === 200) {
          // setProducts(response.data);
          setProductsObj(response.data);
        // } else {
        //   alert("them whit other status");
        // }
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      });

    };


   function setProductsObj(data) {
    if (data) {

      console.log("entro");

      data.map((product, index) => {
        ProductosObj[index] = {
          nombre: product.nombre,
          precio: product.precio,
        };
      });

      console.log(ProductosObj);
    }
    else{
      console.log("no hay productos");
    }
  }

  // const ProductosObj = [
  //   {
  //     nombre: "select..",
  //     precio: 0,
  //   },
  //   {
  //     nombre: "Otm",
  //     precio: 100,
  //   },
  //   {
  //     nombre: "logic",
  //     precio: 30,
  //   },
  // ];

  const MedioPagoObj = [
    {
      medio: "select..",
    },
    {
      medio: "paypal",
    },
    {
      medio: "teachable",
    },
    {
      medio: "nequi",
    },
  ];

  const TipoPagoObj = [
    {
      tipo: "select..",
    },
    {
      tipo: "unico",
    },
    {
      tipo: "cuotas",
    },
  ];

  //  ----------------------------
  function addArray() {
    const ObjTemp = {
      producto: 0,
      precio: 0,
      cantidad: 1,
      descuento: false,
      porcentaje: 0,
      precioFinal: 0,
    };

    setArr((arr) => [...arr, ObjTemp]);
  }

  function editArray(value, index, element) {
    const ObjTemp = arr[index];

    //cambio producto
    if (element == "producto") {
      ObjTemp.producto = parseInt(value);
      ObjTemp.precio = ProductosObj[value].precio * ObjTemp.cantidad;

      if (ObjTemp.descuento) {
        ObjTemp.precioFinal =
          ObjTemp.precio - ObjTemp.precio * (ObjTemp.porcentaje * 0.01);
      }

      //cambio cantidad
    } else if (element == "cantidad") {
      ObjTemp.cantidad = parseInt(value);
      ObjTemp.precio = ProductosObj[ObjTemp.producto].precio * parseInt(value);

      if (ObjTemp.descuento) {
        ObjTemp.precioFinal =
          ObjTemp.precio - ObjTemp.precio * (ObjTemp.porcentaje * 0.01);
      }

      //cambio descuento
      //si el descuento es falso, cuando se hace fetch se envia el precio, no el precio final
    } else if (element == "descuento") {
      ObjTemp.descuento = !ObjTemp.descuento;

      if (ObjTemp.descuento) {
        ObjTemp.precioFinal =
          ObjTemp.precio - ObjTemp.precio * (ObjTemp.porcentaje * 0.01);
      }

      //cambio porcentaje
    } else if (element == "porcentaje") {
      ObjTemp.porcentaje = parseInt(value);

      ObjTemp.precioFinal =
        ObjTemp.precio - ObjTemp.precio * (parseInt(value) * 0.01);
    }

    const numbersCopy = [...arr];
    numbersCopy[index] = ObjTemp;
    setArr(numbersCopy);
  }

  function deleteArray(index) {
    const numbersCopy = [...arr];
    numbersCopy.splice(index, 1);
    setArr(numbersCopy);
  }

  //  ----------------------------

  return (
    <div className="layout__container--form">
      <form onSubmit={handleSubmit(registerSubmit)}>
        {/* seccion nombre */}

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
            type="datetime"
          />

          <Controller
            control={control}
            name="fecha"
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

        {/* seccion producto */}
        <div className="layout__container--form-producto">
          {fields.map(({ id, produc, price }, index) => (
            <div className="productoIt" key={index}>
              <select
                {...register(`pr: ${index}`)}
                onChange={(e) => {
                  editArray(e.target.value, index, "producto");
                }}
              >
                {ProductosObj.map((producto, i) => {
                  return (
                    <option key={i} value={i}>
                      {producto.nombre}
                    </option>
                  );
                })}
              </select>

              <input
                {...register(`np: ${index}`)}
                placeholder="cantidad"
                type="number"
                defaultValue={1}
                onChange={(e) => {
                  editArray(e.target.value, index, "cantidad");
                }}
              />

              <p>valor:{arr[index].precio}</p>

              <div>
                <input
                  type="checkbox"
                  {...register("`chd: ${index}`")}
                  onChange={(e) => {
                    editArray(e.target.value, index, "descuento");
                  }}
                />
              </div>

              {arr[index].descuento ? (
                <div>
                  <input
                    {...register(`pd: ${index}`)}
                    placeholder="porcentaje"
                    type="number"
                    defaultValue={0}
                    onChange={(e) => {
                      editArray(e.target.value, index, "porcentaje");
                    }}
                  />

                  <p>desc:{arr[index].precioFinal}</p>
                </div>
              ) : (
                ""
              )}

              <button
                type="button"
                onClick={() => {
                  remove(index);
                  deleteArray(index);
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
              append({});
              addArray();
            }}
          >
            Agregar Producto
          </button>
        </div>

        {/* seccion pago */}
        <div className="layout__container--form-pago">
          <select {...register("medio_pago")} onChange={(e) => {}}>
            {MedioPagoObj.map((medio, i) => {
              return (
                <option key={i} value={i}>
                  {medio.medio}
                </option>
              );
            })}
          </select>

          <select
            {...register("tipo_pago")}
            onChange={(e) => {
              setTipoPago(e.target.value);
            }}
          >
            {TipoPagoObj.map((tipo, i) => {
              return (
                <option key={i} value={i}>
                  {tipo.tipo}
                </option>
              );
            })}
          </select>

          {tipoPago == 2 ? (
            <input
              {...register("numero_cuotas")}
              placeholder="numero de cuotas"
              type="number"
              defaultValue={1}
            />
          ) : (
            ""
          )}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
