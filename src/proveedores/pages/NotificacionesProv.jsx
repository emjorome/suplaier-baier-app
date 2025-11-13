import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { ContActividades, NotificacionCard, ContExplorar, ContFavoritos } from "../../components"
import { ContMenu } from "../../components/cont_menu/ContMenu";
import { ProdOfertaButtonBox } from "../components";

export const NotificacionesProv = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;
  
  const [notificaciones, setNotificaciones] = useState([])

  const getNotificacionesByUser = async() => {
    const resp = await fetch(`${apiUrl}/notificaciones?idUsuario=${user.IdUsuario}`);
    const data = await resp.json();
    const {rows: ofertas} = !!data && data;
    setNotificaciones(ofertas);
  }

  useEffect(() => {
    getNotificacionesByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState])
  

  const showEmptyArray = notificaciones?.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        {/* <ContExplorar/> */}
        <ContMenu/>
        <ProdOfertaButtonBox/>
        <ContExplorar />
        <ContFavoritos />
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
            style={{display : showEmptyArray ? '' : 'none'}}
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
