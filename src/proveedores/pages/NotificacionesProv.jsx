import { useContext } from "react";
import { AuthContext } from "../../auth";
import { ContActividades, ContExplorar, NotificacionCard } from "../../components"
import { getNotificacionesByUsuarioId } from "../../helpers/getOfertaById";
import { ProdOfertaButtonBox } from "../components";

export const NotificacionesProv = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;
  
  const notificaciones = getNotificacionesByUsuarioId(user.id);

  const showError = notificaciones.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContExplorar/>
        <ProdOfertaButtonBox/>
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
          <div 
            className="busqueda__errorBusqueda" 
            style={{display : showError ? '' : 'none'}}
          >
            <p className="paragraph"> No ha recibido notificaciones por el momento</p>
          </div>
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades esProveedor={true}/>
      </div>
    </div>
  )
}
