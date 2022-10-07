import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GetAllProducts,
  GetAllTipos,
  GetAllMedios,
  PostRegistro
} from "../../../Services/axiosService";

export default function FormVenta() {
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "productos",
  });

  const [arr, setArr] = useState([]);
  const [tipoPago, setTipoPago] = useState(0);
  const [products, setProducts] = useState([]);
  const [tipoPagos, setTipoPagos] = useState([]);
  const [medioPagos, setMedioPagos] = useState([]);

  useEffect(() => {
    obtainUser();
    obtainTipoPago();
    obtainMedioPago();
  }, []);

  useEffect(() => {}, [products]);

  function registerSubmit(data) {

    const dataForm = {
      nombre: data.nombre_cliente,
      apellido: data.apellido_cliente,
      correo: data.correo_cliente,
      fecha: formatDate(data.fecha),
      medioPago: medioPagos[data.medio_pago].medioPago,
      tipoPago: tipoPagos[data.tipo_pago].tipoPago,
      cuotas: data.numero_cuotas? data.numero_cuotas:0,
      productoComprado: arr,
    };


    console.log(dataForm);
    
    saveRegistro(dataForm);


  }

  //services --------------------------------
  const obtainUser = () => {
    GetAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {
        setProducts((products) => [
          { nombre: "select...", precio: 0 },
          ...products,
        ]);
      });
  };

  const obtainTipoPago = () => {
    GetAllTipos()
      .then((response) => {
        setTipoPagos(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {
        setTipoPagos((tipoPagos) => [
          { tipoPago: "select...", cuotas: 0 },
          ...tipoPagos,
        ]);
      });
  };

  const obtainMedioPago = () => {
    GetAllMedios()
      .then((response) => {
        setMedioPagos(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {
        setMedioPagos((medioPagos) => [
          { medioPago: "select..." },
          ...medioPagos,
        ]);
      });
  };

  const saveRegistro = (objeto) => {
    PostRegistro(objeto)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {
      });
  };




  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
      ObjTemp.precio = products[value].precio * ObjTemp.cantidad;

      if (ObjTemp.descuento) {
        ObjTemp.precioFinal =
          ObjTemp.precio - ObjTemp.precio * (ObjTemp.porcentaje * 0.01);
      }

      //cambio cantidad
    } else if (element == "cantidad") {
      ObjTemp.cantidad = parseInt(value);
      ObjTemp.precio = products[ObjTemp.producto].precio * parseInt(value);

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
                {products.map((producto, i) => {
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
            {medioPagos.map((medio, i) => {
              return (
                <option key={i} value={i}>
                  {medio.medioPago}
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
            {tipoPagos.map((tipo, i) => {
              return (
                <option key={i} value={i}>
                  {tipo.tipoPago}
                </option>
              );
            })}
          </select>

          {tipoPago && tipoPagos[tipoPago].tipoPago == "cuotas" ? (
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
