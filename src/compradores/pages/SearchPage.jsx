import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { ContActividades, ContExplorar, ContFavoritos, OfertaCard } from "../../components";
import { getOfertaByNombreProducto } from "../../helpers/getOfertaById";

export const SearchPage = () => {

  const location = useLocation();
  const {q = ""} = queryString.parse(location.search);
  const ofertas = getOfertaByNombreProducto(q);

  const showError = (q.length > 0) && ofertas.length === 0;

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
          <p className="paragraph--mid"><b>Resultado de búsqueda: {q}</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>
          {ofertas.map(oferta => (
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
        <ContActividades/>
      </div>
    </div>
  )
}


