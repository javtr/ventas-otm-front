import React from 'react';

const PagoRow = ({pago}) => {
    return (
        <tr>
        <td>{pago.fechaPago}</td>
        <td>{pago.fechaDesembolso}</td>
        <td>{Math.round(pago.valorPago)}</td>
        <td>{Math.round(pago.valorPagoNeto)}</td>
        <td>{pago.facturaPago.medioPagoFactura.medioPago}</td>
        <td>{pago.facturaPago.clienteFactura.nombre + " " + pago.facturaPago.clienteFactura.apellido}</td>
      </tr>
    );
}

export default PagoRow;
