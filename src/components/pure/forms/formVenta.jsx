import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GetAllProducts,
  GetAllTipos,
  GetAllMedios,
  PostRegistro,
  GetAllClientes,
} from "../../../Services/axiosService";
import UserContext from "../../../context/context";

export default function FormVenta() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);

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
  const [clientes, setClientes] = useState([]);
  const [clientesEx, setclientesEx] = useState(false);

  useEffect(() => {
    obtainUser();
    obtainTipoPago();
    obtainMedioPago();
    obtainCliente();
  }, []);

  useEffect(() => {}, [products]);

  function registerSubmit(data) {
    const dataForm = {
      clienteid: parseInt(data.cliente_id),
      clienteEx: clientesEx,
      nombre: data.nombre_cliente,
      apellido: data.apellido_cliente,
      correo: data.correo_cliente,
      idMachine: data.idMachine_cliente,
      comentario1: data.text1_cliente,
      comentario2: data.text2_cliente,
      fecha: formatDate(data.fecha),
      medioPago: medioPagos[data.medio_pago].medioPago,
      tipoPago: tipoPagos[data.tipo_pago].tipoPago,
      cuotas: data.numero_cuotas ? data.numero_cuotas : 0,
      productoComprado: arr,
    };

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

  const obtainCliente = () => {
    GetAllClientes()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {
        // setMedioPagos((medioPagos) => [
        //   { medioPago: "select..." },
        //   ...medioPagos,
        // ]);
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
      .finally(() => {});
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

  return (
    <div className="formVenta">
      <form className="formVenta__form" onSubmit={handleSubmit(registerSubmit)}>
        <div className="formVenta__form--title"></div>
        
        {/* seccion nombre */}
        <div className="formVenta__form--nombre">
          <div className="formVenta__form--nombre--clienteCheck">
            <h4>Usuario Existente</h4>


            <input
              className="formVenta__form--nombre--clienteCheck--check"
              type="checkbox"
              {...register("cliente_check")}
              onChange={(e) => {
                setclientesEx(!clientesEx);
              }}
            />

            <div className="check">
              <div className="check--back"></div>
              <div className="check--front checkFront"></div>
            </div>
          </div>

          {clientesEx ? (
            <select
              className="formVenta__form--nombre--clienteSelect"
              {...register("cliente_id")}
              onChange={(e) => {}}
            >
              {clientes.map((cliente, i) => {
                return (
                  <option key={i} value={cliente.id}>
                    {cliente.nombre + " " + cliente.apellido}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}

          {!clientesEx ? (
            <div className="formVenta__form--nombre--cliente">
              <input
            className="formVenta__form--nombre--input"
                {...register("nombre_cliente")}
                placeholder="nombre cliente"
                type="text"
              />

              <input
            className="formVenta__form--nombre--input"
                {...register("apellido_cliente")}
                placeholder="apellido cliente"
                type="text"
              />

              <input
            className="formVenta__form--nombre--input"
                {...register("correo_cliente")}
                placeholder="correo cliente"
                type="mail"
              />

              <input
            className="formVenta__form--nombre--input"
                {...register("idMachine_cliente")}
                placeholder="id machine"
                type="text"
              />
            </div>
          ) : (
            ""
          )}

          <input
            className="formVenta__form--nombre--input"
            {...register("text1_cliente")}
            placeholder="comentario..."
            type="text"
          />

          <input
            className="formVenta__form--nombre--input"
            {...register("text2_cliente")}
            placeholder="comentario..."
            type="text"
          />




        </div>

        {/* seccion producto */}
        <div className="formVenta__form--producto">
          {fields.map(({ id, produc, price }, index) => (
            <div className="formVenta__form--producto--item" key={index}>
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
            className="formVenta__form--producto--add"
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
        <div className="formVenta__form--pago">

        <Controller
            className="formVenta__form--pago--fecha"
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


          <select
            className="formVenta__form--pago--medio"
            {...register("medio_pago")}
            onChange={(e) => {}}
          >
            {medioPagos.map((medio, i) => {
              return (
                <option key={i} value={i}>
                  {medio.medioPago}
                </option>
              );
            })}
          </select>

          <select
            className="formVenta__form--pago--tipo"
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
              className="formVenta__form--pago--tipo--cuotas"
              {...register("numero_cuotas")}
              placeholder="numero de cuotas"
              type="number"
              defaultValue={1}
            />
          ) : (
            ""
          )}

          <button className="formVenta__form--submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
