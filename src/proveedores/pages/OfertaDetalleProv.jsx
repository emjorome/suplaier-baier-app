import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ContActividades, ContExplorar, ProgressBar, ValoracionStar } from "../../components"
import { getOfertaById, getProductoById } from "../../helpers/getOfertaById";
import { ProdOfertaButtonBox } from "../components";

export const OfertaDetalleProv = () => {

  const {ofertaId:idOferta} = useParams();

  const oferta = useMemo(() => getOfertaById(parseInt(idOferta)), [idOferta]);
  
  const producto = useMemo(() => getProductoById(oferta?.idProducto), [oferta]);

  const [ofertaActual, setOfertaActual] = useState(oferta);

  const [showCerrarOferta, setShowCerrarOferta] = useState(false);

  const llegaMinimo = ofertaActual.actualProductos >= ofertaActual.cantMin;

  useEffect(() => {
    setOfertaActual(oferta);
  }, [oferta])
  

  const handleClickCerrarOferta = () => {
    setShowCerrarOferta(true);

  }

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
            <p className="paragraph--mid"><b>{producto?.nombre}</b></p>
            <div className="oferta-detalle__etiqueta">
              <p className="paragraph--sm">{ofertaActual?.estado}</p>
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
              <p className="paragraph">{ofertaActual?.descripcion}</p>
            </div>

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Precio unitario {"$" + producto?.costoUnitario}</p>
            </div>

            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph paragraph--blue">Unidades restantes para completar el mínimo:&nbsp;
                {ofertaActual?.cantMin - ofertaActual?.actualProductos}
              </p>
            </div>
            
            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph">Unidades restantes:&nbsp;
                {ofertaActual?.cantMax - ofertaActual?.actualProductos}&nbsp;/&nbsp;
                {ofertaActual?.cantMax}
              </p>
            </div>

            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph">Progreso de unidades vendidas: </p>
              <div className="oferta-detalle__productoProgress__barbox">
                <ProgressBar 
                  cantMax={ofertaActual?.cantMax} 
                  actualProductos={ofertaActual?.actualProductos}
                />
              </div>
              <p 
                className="paragraph paragraph--blue"
              >
                {((ofertaActual?.actualProductos / ofertaActual?.cantMax) * 100).toFixed(0)}%
              </p>
            </div>

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Fecha de cierre: {ofertaActual?.fechaLimite}</p>
            </div>
            
            {/* antes de unirse, verificar que haya vinculado el método de pago */}
            { ofertaActual.estado === "En Curso" && <div className="oferta-detalle__btnBox">
              <button
                disabled={!llegaMinimo}
                className={llegaMinimo ? "btn btn--blue" : "btn btn--grey"}
                onClick={handleClickCerrarOferta}>
                Cerrar oferta
              </button>
            </div>}
            {
              showCerrarOferta && <p>Cerrando oferta</p>
            }

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
