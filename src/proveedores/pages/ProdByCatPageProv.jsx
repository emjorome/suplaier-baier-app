import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { ContActividades, ContExplorar, OfertaCard } from "../../components"
import { GetCategoriaById, getOfertaByCategoriaProducto } from "../../helpers/getOfertaById";
import { useContext } from "react";
import { AuthContext } from "../../auth";
import { ProdOfertaButtonBox } from "../components";

export const ProdByCatPageProv = () => {

  const location = useLocation();

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const {q = ""} = queryString.parse(location.search);
  const {nombre: nombreCategoria} = GetCategoriaById(q);
  const ofertas = getOfertaByCategoriaProducto(q);

  const ofertasProv = ofertas.filter(oferta => oferta.idProveedor === user.id);
  
  const showError = (q.length > 0) && ofertasProv.length === 0;


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
          <p className="paragraph--mid"><b>Productos por categoría: {nombreCategoria}</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>
          {ofertasProv.map(oferta => (
            <OfertaCard
              key={oferta.idOferta}
              oferta={oferta}
            />
          ))}
          <div 
            className="busqueda__errorBusqueda" 
            style={{display : showError ? '' : 'none'}}
          >
            <p className="paragraph"> No se han encontrado ofertas</p>
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
