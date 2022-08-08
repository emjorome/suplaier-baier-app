import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { ContActividades, ContExplorar, ContFavoritos, OfertaCard } from "../../components"
import { useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";

export const PerfilProveedor = () => {

  const location = useLocation();
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(queryString.parse(location.search).q)
  }, [location])

  const [proveedor, setProveedor] = useState({});
  const [ofertasProv, setOfertasProv] = useState([]);

  const getProveedor = async() => {
    const resp = await fetch(`${apiUrl}/usuarios?idUsuario=${q}`);
    const data = await resp.json();
    const {rows: prov} = data;
    setProveedor(prov[0])
  }

  const getOfertasProv = async() => {
    const resp = await fetch(`${apiUrl}/ofertas?idProveedor=${proveedor?.IdUsuario}`);
    const data = await resp.json();
    const {rows: ofertas} = data;
    setOfertasProv(ofertas);
  }

  useEffect(() => {
    !!q && getProveedor();
    // eslint-disable-next-line
  }, [q])

  useEffect(() => {
    !!proveedor?.IdProveedor && getOfertasProv(); 
    // eslint-disable-next-line
  }, [proveedor])
  
  const showError = ofertasProv?.length === 0;

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
            <p className="paragraph--mid"><b>Perfil proveedor: {proveedor.Nombre}</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">País: {proveedor.Pais}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Ciudad: {proveedor.Ciudad}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Dirección: {proveedor.Direccion}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">E-mail: {proveedor.Email}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Celular: {proveedor.Numero}</p>
          </div>
        
          {/* separar usuarios compradores, proveedores y administradores en 
          diferentes tablas -> error de seguridad */}

          <div className="explorarCat__title u-margin-top-small">
            <span className="material-symbols-rounded icon-grey icon--sm">
                arrow_forward_ios
            </span>
            <p className="paragraph--mid"><b>Ofertas recientes</b></p>
          </div>
          <hr className="hrGeneral"/>

          <div className="comp-main-container__medCont__ofertas">
            {ofertasProv?.map(oferta => (
              <OfertaCard 
                key={oferta.IdPublicacion}
                oferta={oferta}
              />
            ))}
          </div>

          <div 
            className="busqueda__errorBusqueda" 
            style={{display : showError ? '' : 'none'}}
          >
            <p className="paragraph"> No se han encontrado ofertas con este proveedor</p>
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
