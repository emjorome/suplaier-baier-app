import React from 'react';

export const PropuestaCard = ({ 
    propuesta, 
    onActualizarEstado,
    showExitosa, 
    showErronea, 
    setShowExitosa, 
    setShowErronea
 }) => {
  // Función para manejar el clic en los botones de aceptar o rechazar
  const handleEstadoCambio = (nuevoEstado) => {
    const mensajeConfirmacion = nuevoEstado === 'aprobada' 
      ? '¿Estás seguro de que quieres aceptar esta propuesta?' 
      : '¿Estás seguro de que quieres rechazar esta propuesta?';
    if (window.confirm(mensajeConfirmacion)) {
      onActualizarEstado(propuesta.IdPropuesta, nuevoEstado, propuesta.Cantidad, propuesta.IdDemanda);
      console.log(propuesta)
    }
  };

  return (
    <div className="oferta-card__datosbox__title u-margin-bottom-small">
      <div className='oferta-card__datosbox__otros__der'>
        <p className="paragraph paragraph--bold paragraph--mid"><b> </b></p>
        <p className="paragraph">{propuesta.emailProveedor}</p>
        <p className="paragraph"><b>Fecha solicitud: </b>{new Date(propuesta.FechaPropuesta).toLocaleString()}</p>
        <p className="paragraph"><b>Estado:</b> {propuesta.Estado}</p>
        <p className="paragraph"><b>Precio:</b> $ {propuesta.Precio}</p>
        <p className="paragraph"><b>Cantidad:</b> {propuesta.Cantidad}</p>
      </div>
      <div className='button-container'>
        <button className='btn btn--green' onClick={() => handleEstadoCambio('aprobada')} >Aceptar</button>
        <button className='btn btn--red' onClick={() => handleEstadoCambio('rechazada')} >Rechazar</button>
      </div>
    </div>
  );
};






