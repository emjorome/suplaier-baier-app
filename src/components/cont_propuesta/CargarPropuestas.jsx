import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../apiUrl';
import {PropuestaCard} from './PropuestaCard'
export const CargarPropuestas = ({ IdDemanda }) => {

  const [propuestas, setPropuestas] = useState([]);

  const filtrarPropuestasPorIdDemanda = (propuestas, IdDemanda) => {
    return propuestas.filter(propuesta => propuesta.IdDemanda === IdDemanda);
  };

  const actualizarEstadoPropuesta = (idPropuesta, nuevoEstado) => {
    console.log(`Actualizando propuesta ${idPropuesta} a ${nuevoEstado}`);

    fetch(`${apiUrl}/propuestas`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ IdPropuesta: idPropuesta, Estado: nuevoEstado }), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Propuesta actualizada con éxito:', data);
      setPropuestas(prevPropuestas =>
        prevPropuestas.map(propuesta => 
          propuesta.IdPropuesta === idPropuesta ? { ...propuesta, Estado: nuevoEstado } : propuesta
        )
      );
    })
    .catch(error => {
      console.error('Error al actualizar la propuesta:', error);
    });
  };


  useEffect(() => {
    const cargarPropuestas = async () => {
      if (IdDemanda) {
        try {
          const response = await fetch(`${apiUrl}/propuestas?IdDemanda=${IdDemanda}&Estado=pendiente`);
          const data = await response.json();
          const propuestasFiltradas = filtrarPropuestasPorIdDemanda(data.rows, IdDemanda);
          setPropuestas(propuestasFiltradas);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    cargarPropuestas();
  }, [IdDemanda]); 

  const showEmptyArray = propuestas.length === 0;

  return (
    <div>
    {showEmptyArray ? (
      <p className="paragraph">Aún no has recibido ninguna propuestapor este producto</p>
    ) : (
      propuestas.map((propuesta) => (
        <PropuestaCard
        key={propuesta.IdPropuesta}
        propuesta={propuesta}
        onActualizarEstado={(idPropuesta, nuevoEstado) => {
            console.log(`Actualizando propuesta ${idPropuesta} a ${nuevoEstado}`);
          actualizarEstadoPropuesta(idPropuesta, nuevoEstado);
        }}
      />
           
      ))
    )}
  </div>
  );
};



