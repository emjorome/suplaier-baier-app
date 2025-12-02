import { useState } from "react";
import { ModalReporteInvitaciones } from "./ModalReporteInvitaciones";

export const CardUsuario = ({usuario}) => {
  const [showModalReporte, setShowModalReporte] = useState(false);

  const onEditarUsuario = () => {
    console.log("Editando usuario")
  }

  const onBloquearUsuario = () => {
    console.log("Bloqueando usuario")
  }

  const onVerReporte = () => {
    setShowModalReporte(true);
  }

  const onCloseModal = () => {
    setShowModalReporte(false);
  }

  // IdRol === 1 es comprador
  const esComprador = usuario.IdRol === 1;

  // Obtener las estrellas del comprador, si no existe el campo, mostrar 0
  const estrellas = usuario.estrellas_acumuladas ?? 0;

  return (
    <>
      <div className="cardUsuarioContainer">
        <div className="cardUsuarioContainer--datosUser">
          <p className="paragraph"><b>{usuario.Nombre}</b></p>
          <p className="paragraph">{usuario.Email}</p>
        </div>
        <div className="cardUsuarioContainer--botonesBox">
          {esComprador && (
            <>
              <div className="cardUsuarioContainer--botonesBox--estrellas">
                <p className="paragraph"><b>Estrellas: {estrellas}</b></p>
              </div>
              <button
                onClick={onVerReporte}
                className="cardUsuarioContainer--botonesBox--btn"
              >
                Reporte
              </button>
            </>
          )}

          <button
            onClick={onEditarUsuario}
            className="cardUsuarioContainer--botonesBox--btn"
          >
            Editar
          </button>

          <button
            onClick={onBloquearUsuario}
            className="cardUsuarioContainer--botonesBox--btn"
          >
            Bloquear
          </button>
        </div>
      </div>

      {showModalReporte && (
        <ModalReporteInvitaciones 
          usuario={usuario} 
          onClose={onCloseModal}
        />
      )}
    </>
  )
}
