import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { ContActividades, ProgressBar, ValoracionStar } from "../../components"
import { ProdOfertaButtonBox } from "../components";

export const OfertaDetalleProv = () => {

  const {ofertaId:idOferta} = useParams();

  const [oferta, setOferta] = useState();
  const [producto, setProducto] = useState();
  const [estadoOferta, setEstadoOferta] = useState();
  const [proveedor, setProveedor] = useState();
  const [llegaMinimo, setLlegaMinimo] = useState(false);
  const [showCerrarOferta, setShowCerrarOferta] = useState(false);

  const getOferta = async() => {
    const resp = await fetch(`${apiUrl}/publicaciones?id=${idOferta}`);
    const data = await resp.json();
    const {rows: oferta} = !!data && data;
    setOferta(oferta[0]);
  }

  const getProducto = async() => {
    const resp = await fetch(`${apiUrl}/productos?id=${oferta.IdProducto}`);
    const data = await resp.json();
    const {rows: producto} = !!data && data;
    setProducto(producto[0]);
  }

  const getEstadoOferta = async() => {
    const resp = await fetch(`${apiUrl}/estados?id=${oferta.IdEstadoOferta}`);
    const data = await resp.json();
    const {rows: estado} = !!data && data;
    setEstadoOferta(estado[0]);
  }

  const getProveedor = async() => {
    const resp = await fetch(`${apiUrl}/proveedores?id=${oferta.IdProveedor}`);
    const data = await resp.json();
    const {rows: proveedor} = !!data && data;
    setProveedor(proveedor[0]);
  }

  const calcularLlegaMinimo = () => {
    setLlegaMinimo(oferta?.ActualProductos >= oferta?.Minimo);
  }

  useEffect(() => {
    getOferta();
    // eslint-disable-next-line
  }, [idOferta])
  
  useEffect(() => {
    !!oferta && getProducto();
    !!oferta && getEstadoOferta();
    !!oferta && getProveedor();
    calcularLlegaMinimo();
    // eslint-disable-next-line
  }, [oferta])
  

  const handleClickCerrarOferta = () => {
    setShowCerrarOferta(true);
  }

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
            <p className="paragraph--mid"><b>{producto?.Name}</b></p>
            <div className="oferta-detalle__etiqueta">
              <p className="paragraph--sm">{estadoOferta?.Descripcion}</p>
            </div>
          </div>
          <hr className="hrGeneral"/>
          <div className="oferta-detalle__productoBox u-margin-top-small">
            <div className="oferta-detalle__productoBox__imgBox">
              <img 
                className="oferta-detalle__productoBox__imgBox__img" 
                src={producto?.UrlImg} 
                alt={producto?.Name}
              />
            </div>
            <div className="oferta-detalle__productoBox__desc">
              <ValoracionStar cant_estrellas={producto?.Valoracion}/>
              <div className="oferta-detalle__productoBox__desc__text">
                <p className="paragraph">{producto?.Descripcion}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Proveedor: {proveedor?.Nombre}</b></p>
            </div>
            
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">{oferta?.Descripcion}</p>
            </div>

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Precio unitario {"$" + producto?.ValorU}</p>
            </div>

            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph paragraph--blue">Unidades restantes para completar el mínimo:&nbsp;
                {oferta?.Minimo - oferta?.ActualProductos}
              </p>
            </div>
            
            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph">Unidades restantes:&nbsp;
                {oferta?.Maximo - oferta?.ActualProductos}&nbsp;/&nbsp;
                {oferta?.Maximo}
              </p>
            </div>

            <div className="oferta-detalle__productoProgress u-margin-top-small">
              <p className="paragraph">Progreso de unidades vendidas: </p>
              <div className="oferta-detalle__productoProgress__barbox">
                <ProgressBar 
                  cantMax={oferta?.Maximo} 
                  actualProductos={oferta?.ActualProductos}
                />
              </div>
              <p 
                className="paragraph paragraph--blue"
              >
                {((oferta?.ActualProductos / oferta?.Maximo) * 100).toFixed(0)}%
              </p>
            </div>

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Fecha de cierre: {!!oferta?.FechaLimite && (oferta.FechaLimite).split("T")[0]}</p>
            </div>
            
            {/* antes de unirse, verificar que haya vinculado el método de pago */}
            { estadoOferta?.Descripcion === "En curso" && 
            <div className="oferta-detalle__btnBox">
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
