import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../apiUrl';
import {PropuestaCard} from './PropuestaCard'
import { useNavigate } from 'react-router-dom';
import { AccionExitosa } from '../../compradores/components/AccionExitosa';

export const CargarPropuestas = ({ IdDemanda }) => {

  const [showExitosa, setShowExitosa] = useState(false);
  const [showErronea, setShowErronea] = useState(false);
  const [propuestas, setPropuestas] = useState([]);
  let navigate = useNavigate();
  
  function movetodemand() {
    navigate('/mis_demandas');
  }
  const filtrarPropuestasPorIdDemanda = (propuestas, IdDemanda) => {
    return propuestas.filter(propuesta => propuesta.IdDemanda === IdDemanda);
  };

  const actualizarEstadoPropuesta = async (idPropuesta, nuevoEstado, cantidadPropuesta, idDemanda) => {
    try {
      const responsePropuesta = await fetch(`${apiUrl}/propuestas`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ IdPropuesta: idPropuesta, Estado: nuevoEstado }), 
      });
      const dataPropuesta = await responsePropuesta.json();
  
      if (nuevoEstado === 'aprobada') {

        const responseDemanda = await fetch(`${apiUrl}/demandas?IdDemanda=${idDemanda}`);
        const data = await responseDemanda.json();
        const demandasFiltradas = data.rows.filter(d => d.IdDemanda === idDemanda);
        let demanda
        if (demandasFiltradas.length > 0) {
             demanda = demandasFiltradas[0];
        } else {
            console.error('No se encontró la demanda con el id proporcionado');
        }        
        const nuevoActualProductos = parseInt(demanda.ActualProductos, 10) + parseInt(cantidadPropuesta, 10);
        const body = JSON.stringify({
            IdDemanda: idDemanda,
            NuevoActualProductos: parseInt(nuevoActualProductos, 10)
          });
        const respondePathDemanda = await fetch(`${apiUrl}/demandas`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
          
        const dataNuevo = await respondePathDemanda.json();
        console.log (dataNuevo);
        
        movetodemand();
      }
  
        setPropuestas(prevPropuestas =>
        prevPropuestas.map(propuesta => 
          propuesta.IdPropuesta === idPropuesta ? { ...propuesta, Estado: nuevoEstado } : propuesta
        )
      );
    } catch (error) {
      console.error('Error al actualizar la propuesta:', error);
    }
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
      <p className="paragraph">Aún no has recibido ninguna propuesta por este producto</p>
    ) : (
      propuestas.map((propuesta) => (
        <PropuestaCard
        key={propuesta.IdPropuesta}
        propuesta={propuesta}
        onActualizarEstado={(idPropuesta, nuevoEstado) => {
          actualizarEstadoPropuesta(idPropuesta, nuevoEstado,propuesta.Cantidad, propuesta.IdDemanda);
        }}
        showExitosa={showExitosa}
        showErronea={showErronea}
        setShowExitosa={setShowExitosa}
        setShowErronea={setShowErronea}
      />
           
      ))
    )}
        {showExitosa && (
        <AccionExitosa
          texto="Tu acción ha sido exitosa"
          showAccionErronea={showErronea}
          setShowAccionExitosa={setShowExitosa}
          setShowAccionErronea={setShowErronea}
        />
      )}
  </div>
  );
};



