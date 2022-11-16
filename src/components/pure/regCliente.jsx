import React, { Fragment } from "react";
import { FiEdit } from "react-icons/fi";
import { IconContext } from "react-icons";

export default function RegCliente({ cliente, abrirUsuario }) {
  return (
    <Fragment>
      {/* <tr style={{ color: cliente[6] == 0 ? "red" : "black" }}> */}
        <td className="regClientes__body--row--action" >
          <IconContext.Provider value={{ className: "regClientes__body--row--action--icon" }}>
            <FiEdit
              onClick={() => {
                console.log("hola");
              }}
            />
          </IconContext.Provider>
        </td>
        <td className="regClientes__body--row--name"  onClick={() => abrirUsuario(cliente[0])}>
          <div className="regClientes__body--row--name--cont">
            <div className="regClientes__body--row--name--nam">{cliente[1] + " " + cliente[2]}</div>
            <div className="regClientes__body--row--name--mail">{cliente[3]}</div>
          </div>
        </td>
        <td className="regClientes__body--row--id" >{cliente[4]}</td>
      {/* </tr> */}
</Fragment>
  );
}
