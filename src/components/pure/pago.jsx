import React from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { DeletePago } from "../../Services/axiosService";

const Pago = ({ pago, actComponente, update }) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const navigate = useNavigate();

  function editarPago(id) {
    navigate(`/edit-pago/${id}`);
  }

  const deletePago = (id) => {
    if (confirm("Eliminar pago?")) {
      DeletePago(id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(`Somethin went wrong: ${error}`);
        })
        .finally(() => {
          update();
        });
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        <div>{"id:" + pago.id}</div>
        <div>{"pago:" + pago.fechaPago}</div>
        <div>{"desembolso:" + pago.fechaDesembolso}</div>
        <div>{"valor:" + pago.valorPago}</div>
        <div>{"neto:" + pago.valorPagoNeto}</div>

        <br></br>
        <IconContext.Provider value={{ className: "iconos1" }}>
          <TbEdit
            onClick={() => {
              editarPago(pago.id);
            }}
          />
          <MdDelete
            onClick={() => {
              deletePago(pago.id);
            }}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Pago;
