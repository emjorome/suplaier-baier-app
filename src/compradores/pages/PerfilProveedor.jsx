import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { ContActividades, ContExplorar, ContFavoritos, OfertaCard } from "../../components"
import { getOfertaByIdProveedor, getProveedorById } from "../../helpers/getOfertaById";

export const PerfilProveedor = () => {

  const location = useLocation();

  const {q = ""} = queryString.parse(location.search);
  const proveedor = getProveedorById(parseInt(q));
  const ofertasProveedor = getOfertaByIdProveedor(proveedor.id);
  
  const showError = ofertasProveedor.length === 0;

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
            <p className="paragraph--mid"><b>Perfil proveedor: {proveedor.nombre}</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">País: {proveedor.pais}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Ciudad: {proveedor.ciudad}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Dirección: {proveedor.direccion}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">E-mail: {proveedor.email}</p>
          </div>

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Celular: {proveedor.celular}</p>
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
            {ofertasProveedor.map(oferta => (
              <OfertaCard 
                key={oferta.idOferta * 100}
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
