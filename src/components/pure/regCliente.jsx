import React from "react";

export default function RegCliente({ cliente,index }) {

  return (
    <tr>
      <td>{cliente[1]}</td>
      <td>{cliente[2]}</td>
      <td>{cliente[3]}</td>
      <td>{cliente[4]}</td>
      <td>{ Math.round( cliente[5])}</td>
    </tr>
  );
}
