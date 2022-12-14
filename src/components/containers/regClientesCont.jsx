import React, { useState, useEffect, Fragment } from "react";
import { GetQueryClientes } from "../../Services/axiosService";
import RegCliente from "../pure/regCliente";
import { useNavigate } from "react-router-dom";

export default function RegClientesCont() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");

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

  let resultados = clientes;

  //filtrar por input
  if (filtro) {
    resultados = resultados.filter(function (cliente) {

      // console.log(cliente);
      if (
        cliente[1].toLowerCase().includes(filtro.toLocaleLowerCase()) ||
        cliente[2].toLowerCase().includes(filtro.toLocaleLowerCase()) ||
        cliente[3].toLowerCase().includes(filtro.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
  }


//ordernar por nombre
  resultados = resultados.sort((p1, p2) =>
    p1[1] > p2[1] ? 1 : p1[1] < p2[1] ? -1 : 0
  );



  return (
    <div className="regClientes">
      <div className="regClientes__container">
        <div className="regClientes__container--titleCont">
          <div className="regClientes__container--title"></div>
        </div>

        <input
          onChange={(e) => setFiltro(e.target.value)}
          className="regClientes__input"
          type="text"
        ></input>

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
              {resultados.map((cliente, index) => {
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
