import { useNavigate } from "react-router-dom";

export const CardSolicitudRegistro = ({solicitud}) => {
    const dateObj = new Date(solicitud.FechaSolicitud);
    const navigate = useNavigate();
    
    const onClickSolicitud = () => {
        console.log("Aceptando solicitud")
        console.log(solicitud.IdSolicitud)
        navigate(`/solicitud/${solicitud.IdSolicitud}`);
      }
    
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

    const onAceptarSolicitud = () => {
      console.log("Aceptando solicitud")
    }
  
    const onRechazarSolicitud = () => {
      console.log("Rechazando solicitud")
    }
  
    return (
      <div className="cardSolicitudContainer" onClick={onClickSolicitud}>
        <div className="cardSolicitudContainer--datosUser">
          <p className="paragraph"><b>{solicitud.Nombre}</b></p>
          <p className="paragraph">{solicitud.Email}</p>
          <p className="paragraph">Fecha solicitud: {dateObj.toLocaleString(undefined, options)} </p>
        </div>
        <div className="cardSolicitudContainer--botonesBox">
          <button
            onClick={onAceptarSolicitud}
            className="cardSolicitudContainer--botonesBox--btnAceptar"
          >
            Aceptar
          </button>
  
          <button
            onClick={onRechazarSolicitud}
            className="cardSolicitudContainer--botonesBox--btnRechazar"
          >
            Rechazar
          </button>
        </div>
      </div>
    )
  }