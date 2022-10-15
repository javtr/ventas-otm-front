import React from "react";

export default function RegCliente({ cliente,abrirUsuario }) {

  return (
    <tr>
      <td onClick={()=>abrirUsuario(cliente[0])}>{cliente[1]}</td>
      <td>{cliente[2]}</td>
      <td>{cliente[3]}</td>
      <td>{cliente[4]}</td>
      <td>{ Math.round( cliente[5])}</td>
    </tr>
  );
}



