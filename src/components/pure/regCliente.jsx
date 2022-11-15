import React, { Fragment } from "react";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";

export default function RegCliente({ cliente, abrirUsuario }) {
  return (
    <Fragment>
      {/* <tr style={{ color: cliente[6] == 0 ? "red" : "black" }}> */}
        <td>
          <IconContext.Provider value={{ className: "iconos1" }}>
            <MdDelete
              onClick={() => {
                console.log("hola");
              }}
            />
          </IconContext.Provider>
        </td>
        <td onClick={() => abrirUsuario(cliente[0])}>{cliente[1]}</td>
        <td>{cliente[3]}</td>
      {/* </tr> */}
</Fragment>
  );
}
