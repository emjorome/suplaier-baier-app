import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { ContActividades, ContExplorar, ContFavoritos, OfertaCard } from "../../components";
import { ContMenu } from "../../components/cont_menu/ContMenu";

export const SearchPage = () => {

  const location = useLocation();
  const {q = ""} = queryString.parse(location.search);
  const [ofertasBusqueda, setOfertasBusqueda] = useState([]);

  const getOfertasTodos = async() => {
    const resp = await fetch(`${apiUrl}/ofertaByProducto?q=${q}`);
    const data = await resp.json();
    const {rows: ofertas} = !!data && data;
    setOfertasBusqueda(ofertas.filter((oferta) => oferta.IdEstadosOferta === 1));
  }

  useEffect(() => {
    getOfertasTodos();
    // eslint-disable-next-line
  }, [q])

  const showError = (q.length > 0) && ofertasBusqueda.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContMenu/>
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
          {ofertasBusqueda.map(oferta => (
            <OfertaCard
              key={oferta.IdOferta}
              oferta={oferta}
            />
          ))}
          <div 
            className="busqueda__errorBusqueda" 
            style={{display : (showError) ? '' : 'none'}}
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


