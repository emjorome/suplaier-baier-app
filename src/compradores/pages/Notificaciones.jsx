import { useContext } from "react";
import { AuthContext } from "../../auth";
import { ContActividades, ContExplorar, ContFavoritos, NotificacionCard } from "../../components"
import { getNotificacionesByUsuarioId } from "../../helpers/getOfertaById";

export const Notificaciones = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;
  
  const notificaciones = getNotificacionesByUsuarioId(user.id);

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContExplorar/>
        <ContFavoritos/>
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
        <div className="explorarCat__title">
          <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
          </span>
          <p className="paragraph--mid"><b>Notificaciones</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>
          {
            notificaciones.map(
              notif => <NotificacionCard 
                          key={notif.id * 10} 
                          notificacion={notif}/>)
          }
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades/>
      </div>
    </div>
  )
}
