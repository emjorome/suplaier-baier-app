import { useNavigate } from "react-router-dom";
import { getNotificacionByTipoId} from "../../helpers/getOfertaById"

export const NotificacionCard = ({notificacion}) => {

  const {googleCodeRoundedIcon: nombreIcono} = getNotificacionByTipoId(notificacion.idTipoNotificacion);
  const navigate = useNavigate();

  const onClickNotificacion = () => {
    navigate(`/oferta/${notificacion.idOferta}`);
  }
 
  return (
    <div 
      className="notificacionCard"
      onClick={onClickNotificacion}
    >
      <span className="material-symbols-rounded icon--md--2 notificacionCard__icon">
        {nombreIcono}
      </span>
      <p className="paragraph--mid--2">{notificacion.descripcion}</p>
    </div>
  )
}
