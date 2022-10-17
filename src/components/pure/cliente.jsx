import React from 'react';

const Cliente = ({usuario}) => {


    return (
        <div>
                  <div
        style={{
          backgroundColor: "rgb(200,200,200,1)",
          border: "solid 1px black",
        }}
      >
        <h2>User</h2>
        <br></br>
        {"id:" + usuario.id}
        <br></br>
        {"nombre:" + usuario.nombre}
        <br></br>
        {"apellido:" + usuario.apellido}
        <br></br>
        {"apellido:" + usuario}
      </div>
        </div>
    );
}

export default Cliente;
