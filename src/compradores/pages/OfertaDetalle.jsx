import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ContActividades, ContExplorar, ContFavoritos, ProgressBar, ValoracionStar } from "../../components"
import { getOfertaById, getProductoById } from "../../helpers/getOfertaById";

export const OfertaDetalle = () => {

  const {ofertaId:idOferta} = useParams();

  const oferta = useMemo(() => getOfertaById(parseInt(idOferta)), [idOferta]);

  const producto = useMemo(() => getProductoById(oferta?.idProducto), [oferta]);

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
            <p className="paragraph--mid"><b>{producto?.nombre}</b></p>
            <div className="oferta-detalle__etiqueta">
              <p className="paragraph--sm">{oferta?.estado}</p>
            </div>
          </div>
          <hr className="hrGeneral"/>
          <div className="oferta-detalle__productoBox u-margin-top-small">
            <div className="oferta-detalle__productoBox__imgBox">
              <img 
                className="oferta-detalle__productoBox__imgBox__img" 
                src={producto?.urlImg} 
                alt={producto?.nombre} 
              />
            </div>
            <div className="oferta-detalle__productoBox__desc">
              <ValoracionStar cant_estrellas={4}/>
              <div className="oferta-detalle__productoBox__desc__text">
                <p className="paragraph">{producto?.descripcion}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Proveedor: {producto?.nombreProveedor}</b></p>
            </div>
            
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">{oferta?.descripcion}</p>
            </div>

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Precio unitario {"$" + producto?.costoUnitario}</p>
            </div>

            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph paragraph--blue">Unidades restantes para completar el mínimo:&nbsp;
                {oferta?.cantMin - oferta?.actualProductos}
              </p>
            </div>
            
            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph">Unidades restantes:&nbsp;
                {oferta?.cantMax - oferta?.actualProductos}&nbsp;/&nbsp;
                {oferta?.cantMax}
              </p>
            </div>

            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph">Progreso de unidades vendidas: </p>
              <div className="oferta-detalle__productoProgress__barbox">
                <ProgressBar 
                  cantMax={oferta?.cantMax} 
                  actualProductos={oferta?.actualProductos}
                />
              </div>
              <p 
                className="paragraph paragraph--blue"
              >
                {(oferta?.actualProductos / oferta?.cantMax) * 100}%
              </p>
            </div>

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Fecha de cierre: {oferta?.fechaLimite}</p>
            </div>

            <div className="oferta-detalle__btnBox">
              <button className="btn btn--blue">
                Unirse
              </button>
            </div>
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
