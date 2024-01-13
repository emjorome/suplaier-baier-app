import {  useEffect, useState } from "react"
export const Historial = ({ texto, setShowHistorial }) => {

  const [data, setData] = useState([]);
  const onClickContinuar = () => {
    setShowHistorial(false);
  }
  useEffect(() => {
    const getHistorial = async () => {
      const resp = await fetch(`http://localhost:4000/api/v1/historialOferta`);
      const responseData = await resp.json();
      setData(responseData.rows);
    }
    getHistorial();
  }, []);

  const listItemStyle = {
    border: '2px solid #000', // Outline style
    padding: '10px', // Spacing inside the outline
    fontSize: '20px', // Font size
    margin: '10px 0', // Spacing between items
  };
  return (
    <div className="resumenProducto animate__animated animate__fadeIn">
      <div className="accionExitosa__ventana animate__animated animate__slideInDown">
        <div className="metodoPago__barraSup"></div>
        <div className="accionExitosa__ventana__textoBox">
        {data.map((row, index) => (
          <lo key={index} style={listItemStyle}>
            <strong>Estado oferta:</strong> {row.OldIdEstadosOferta}<br />
            <strong>Productos comprados:</strong> {row.ActualProductosChange}<br />
            <strong>Tipo de cambio:</strong> {row.ChangeType}<br />
            <strong>Fecha y hora:</strong> {row.ChangeTime}<br />
          </lo>
           ))}
          <p className="paragraph paragraph--bold accionExitosa__ventana__textoBox__texto" align="center">{texto}</p>
        </div>
        <div className="metodoPago__btnBox">
          <button
            type="button"
            onClick={onClickContinuar}
            className="btn btn--blue"
          >Aceptar</button>
        </div>
      </div>
    </div>
  )
} 