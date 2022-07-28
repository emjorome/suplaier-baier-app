import { ContActividades, OfertaCard} from "../../components";
import {getOfertaByIdProveedor} from "../../helpers/getOfertaById";
import { useContext } from "react";
import { AuthContext } from "../../auth";
import { ProdOfertaButtonBox } from "../components";

export const MainProvPage = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const ofertasProv = getOfertaByIdProveedor(user.id);

  const showEmptyArray = ofertasProv.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        {/* <ContExplorar/> */}
        <ProdOfertaButtonBox/>
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
          <div className="explorarCat__title">
            <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
            </span>
            <p className="paragraph--mid"><b>Mis ofertas</b></p>
          </div>
          <hr className="hrGeneral"/>
          {
          showEmptyArray
          ? <p className="paragraph">Por el momento no tienes ofertas creadas </p>
          :
          ofertasProv.map(oferta => (
            <OfertaCard 
              key={oferta.idOferta}
              oferta={oferta}
              esProveedor={true}
            />
          ))
          }
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades esProveedor={true}/>
      </div>
    </div>
  )
}
