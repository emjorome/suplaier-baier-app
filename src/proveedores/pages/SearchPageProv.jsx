import queryString from "query-string";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { ContActividades, OfertaCard } from "../../components";
import { ProdOfertaButtonBox } from "../components";

export const SearchPageProv = () => {

  const {authState} = useContext(AuthContext);
  const {user} = authState;

  const location = useLocation();
  const {q = ""} = queryString.parse(location.search);
  
  const [ofertasBusqueda, setOfertasBusqueda] = useState([]);

  const getOfertasBusqueda = async() => {
    const resp = await fetch(`${apiUrl}/ofertaByProducto?q=${q}&idProveedor=${user.IdUsuario}`);
    const data = await resp.json();
    const {rows: ofertas} = !!data && data;
    setOfertasBusqueda(ofertas);
  }

  useEffect(() => {
    getOfertasBusqueda();
    // eslint-disable-next-line
  }, [q])

  const showError = (q.length > 0) && ofertasBusqueda.length === 0;

  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ProdOfertaButtonBox/>
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
              key={oferta.idOferta}
              oferta={oferta}
              esProveedor={true}
            />
          ))}
          <div 
            className="busqueda__errorBusqueda" 
            style={{display : (showError ||  q === "") ? '' : 'none'}}
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


