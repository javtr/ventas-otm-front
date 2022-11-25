import React, { useState, useEffect, Fragment } from "react";
import { GetQueryClientes } from "../../Services/axiosService";
import RegCliente from "../pure/regCliente";
import { useNavigate } from "react-router-dom";

export default function RegClientesCont() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtainClientes();
  }, []);

  const obtainClientes = () => {
    GetQueryClientes()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        alert(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };

  const navigate = useNavigate();

  function reporteUsuario(index) {
    navigate(`/cliente/${index}`);
  }

  return (
    <div className="regClientes">
      <div className="regClientes__container">
        <div className="regClientes__container--titleCont">
          <div className="regClientes__container--title"></div>
        </div>

        <input className="regClientes__input" type="text"></input>

        <div className="regClientes__tableCont">
          <table className="regClientes__table">
            <thead className="regClientes__table--head">
              <tr className="regClientes__table--head--row">
                <th className="regClientes__table--head--row1"></th>
                <th className="regClientes__table--head--row2">Nombre</th>
                <th className="regClientes__table--head--row3">Id machine</th>
              </tr>
            </thead>

            <tbody className="regClientes__body">
              {clientes.map((cliente, index) => {
                return cliente[6] != 2 ? (
                  <Fragment key={index}>
                    {/* <tr className="regClientes__body--line"></tr> */}
                    <tr className="regClientes__body--row">
                      <RegCliente
                        key={index}
                        cliente={cliente}
                        abrirUsuario={reporteUsuario}
                      ></RegCliente>
                    </tr>
                  </Fragment>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
