import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../apiUrl";
import { ContActividades, ContExplorar, ContFavoritos, EtiquetaOferta, ProgressBar, ValoracionStar } from "../../components"
import { AccionRecibidoExitosa } from "../components/AccionRecibidoExitosa";
import { ConfirmarProdRecibido } from "../components/ConfirmarProdRecibido";

export const CompraIndividualPage = () => {

  const {IdCompra} = useParams();
  // const {authState} = useContext(AuthContext);
  // const {user} = authState;

  const [compra, setCompra] = useState();
  const [oferta, setOferta] = useState();
  const [producto, setProducto] = useState();
  const [estadoCompra, setEstadoCompra] = useState();
  const [proveedor, setProveedor] = useState();

  const [showConfirmarProdRecibido, setShowConfirmarProdRecibido] = useState(false);
  const [showRecibidoExitoso, setShowRecibidoExitoso] = useState(false);

  const getCompra = async() => {
    const resp = await fetch(`${apiUrl}/compras?id=${IdCompra}`);
    const data = await resp.json();
    const {rows: compra} = !!data && data;
    setCompra(compra[0]);
  }

  const getOferta = async() => {
    const resp = await fetch(`${apiUrl}/ofertas?id=${compra.IdOferta}`);
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

  const getEstadoCompra = async() => {
    const resp = await fetch(`${apiUrl}/estados?id=${compra.IdEstado}`);
    const data = await resp.json();
    const {rows: estado} = !!data && data;
    setEstadoCompra(estado[0]);
  }

  const getProveedor = async() => {
    const resp = await fetch(`${apiUrl}/usuarios?idUsuario=${compra.IdProveedor}`);
    const data = await resp.json();
    const {rows: proveedor} = !!data && data;
    setProveedor(proveedor[0]);
  }

  useEffect(() => {
    getCompra();
    // eslint-disable-next-line
  }, [IdCompra])
  
  useEffect(() => {
    !!compra && getOferta();
    !!compra && getEstadoCompra();
    !!compra && getProveedor();
    // eslint-disable-next-line
  }, [compra])

  useEffect(() => {
    !!oferta && getProducto();
    // eslint-disable-next-line
  }, [oferta])

  const onConfirmarProdRecibido = () => {
    setShowConfirmarProdRecibido(true);
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
          <p className="paragraph--mid"><b>{producto?.Name}</b></p>
          <div className="oferta-card__etiquetaBox">
            <EtiquetaOferta estado={estadoCompra?.Descripcion} esOfertaDetalle={true}/>
            <EtiquetaOferta estado={"Unido"} esOfertaDetalle={true}/>
          </div>  
        </div>
        <hr className="hrGeneral"/>
        <div className="oferta-detalle__productoBox u-margin-top-small">
          <div className="oferta-detalle__productoBox__imgBox">
            <img 
              className="oferta-detalle__productoBox__imgBox__img" 
              src={producto?.UrlImg === "no-img.jpeg" ? "/no-img.jpeg" : producto?.UrlImg} 
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
            <p className="paragraph">Precio unitario: {"$" + oferta?.ValorUProducto}</p>
          </div>
          
          {compra?.IdEstado >= 3 &&
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Cantidad de unidades adquiridas: {compra?.Cantidad}</p>
            </div>
          }

          {compra?.IdEstado >= 3 &&
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Total: {"$" + compra?.Total}</p>
            </div>
          }

          { compra?.IdEstado < 3 &&
          <div className="oferta-detalle__productoProgress u-margin-top-small">
            <p className="paragraph paragraph--blue">Unidades restantes para completar el mínimo:&nbsp;
              {oferta?.Minimo - oferta?.ActualProductos}
            </p>
          </div>
          }
          
          { compra?.IdEstado < 3 &&
          <div className="oferta-detalle__productoProgress u-margin-top-small">
            <p className="paragraph">Unidades restantes:&nbsp;
              {oferta?.Maximo - oferta?.ActualProductos}&nbsp;/&nbsp;
              {oferta?.Maximo}
            </p>
          </div> }

          {compra?.IdEstado < 3 &&
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
          }

          <div className="oferta-detalle__productoBox u-margin-top-small">
            <p className="paragraph">Fecha de cierre: {!!oferta?.FechaLimite && (oferta.FechaLimite).split("T")[0]}</p>
          </div>

          { estadoCompra?.Descripcion === "Despachado" && 
          <div className="oferta-detalle__btnBox">
            <button
              className="btn btn--blue"
              onClick={onConfirmarProdRecibido}>
              Confirmar producto recibido
            </button>
          </div>}

          {
            showConfirmarProdRecibido && 
            <ConfirmarProdRecibido
              compra={compra}
              setShowConfirmarProdRecibido={setShowConfirmarProdRecibido}
              setShowRecibidoExitoso={setShowRecibidoExitoso}
            />
          }
          {
            showRecibidoExitoso &&
            <AccionRecibidoExitosa
              compra={compra}
              texto={"Gracias por confirmar la operación. Por favor, califique el producto adquirido."}
              setShowAccionExitosa={setShowRecibidoExitoso}
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
