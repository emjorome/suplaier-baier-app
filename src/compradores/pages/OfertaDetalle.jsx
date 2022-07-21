import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ContActividades, ContExplorar, ContFavoritos, ProgressBar, ValoracionStar } from "../../components"
import { getOfertaById, getProductoById } from "../../helpers/getOfertaById";
import { CompraAnticipada, CompraProductos, CompraReserva, MetodoPago, PagoExito } from "../components";

export const OfertaDetalle = () => {

  const {ofertaId:idOferta} = useParams();

  const oferta = useMemo(() => getOfertaById(parseInt(idOferta)), [idOferta]);
  const producto = useMemo(() => getProductoById(oferta?.idProducto), [oferta]);

  const [ofertaActual, setOfertaActual] = useState(oferta);
  const [costoTotal, setCostoTotal] = useState(0.00);

  const [showCompraProductos, setShowCompraProductos] = useState(false);
  const [showMetodoPago, setShowMetodoPago] = useState(false);
  const [showPagoReserva, setShowPagoReserva] = useState(false);
  const [showPagoAnticipado, setShowPagoAnticipado] = useState(false);
  const [showPagoExito, setShowPagoExito] = useState(false);

  const handleClickUnirse = () => {
    setShowCompraProductos(true);

  }

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
                className="btn btn--blue"
                onClick={handleClickUnirse}>
                Unirse
              </button>
            </div>}
            {/* ventana para confirmar comprar */}
            {showCompraProductos && 
              <CompraProductos 
                setShowCompraProductos={setShowCompraProductos}
                setShowMetodoPago={setShowMetodoPago}
                oferta={ofertaActual}
                producto={producto}
                costoTotal={costoTotal}
                setCostoTotal={setCostoTotal}
              />
            }
            {/* ventana para confirmar metodo de pago */}
            {showMetodoPago && 
              <MetodoPago
                setShowMetodoPago={setShowMetodoPago}
                setShowPagoReserva={setShowPagoReserva}
                setShowPagoAnticipado={setShowPagoAnticipado}
              />
            }
            {showPagoAnticipado &&
              <CompraAnticipada
                setShowPagoAnticipado={setShowPagoAnticipado}
                setShowPagoExito={setShowPagoExito}
                setOfertaActual={setOfertaActual}
                costoTotal={costoTotal}
              />
            }
            {showPagoReserva &&
              <CompraReserva
                setShowPagoReserva={setShowPagoReserva}
                setShowPagoExito={setShowPagoExito}
                setOfertaActual={setOfertaActual}
                costoTotal={costoTotal}
              />
            }
            {showPagoExito &&
              <PagoExito
                setShowPagoExito={setShowPagoExito}
              />
            }
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
