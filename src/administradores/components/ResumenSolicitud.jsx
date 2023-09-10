import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";

export const ResumenSolicitud = ({solicitud, setShowResumenProducto, setShowAccionExitosa}) => {
    
  const [imagen, setImagen] = useState();
  //const d = new Date();

  const {authState: {user}} = useContext(AuthContext);

  const getImg = async (urlImg) => {
    const reader = new FileReader();
    reader.readAsDataURL(urlImg);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImagen(base64data);

    };
  };


  useEffect(() => {
    if(solicitud.UrlLogoEmpresa !== "no-img.jpeg")
      getImg(solicitud.UrlLogoEmpresa)
    else
      setImagen("no-img.jpeg")
  }, [solicitud])
  
  const onAceptar = (e) => {
    e.preventDefault();
    setShowResumenProducto(false);
  }

  return (
    <div className="resumenSolicitud animate__animated animate__fadeIn">
      <div className="resumenSolicitud__ventana animate__animated animate__slideInDown">
        <div className="resumenSolicitud__barraSup"></div>
        <div className="resumenSolicitud__ventana__contenido">
          <div className="explorarCat__title">
            <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
            </span>
            <p className="paragraph--mid"><b>Detalles de la solicitud</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="compraProducto__box">
            <div className="oferta-detalle__productoBox u-margin-top-small">
              { imagen !== ""
                ?
                <img src={imagen} alt={"producto"} className="resumenProducto__ventana__img" />
                :
                <p className="paragraph paragraph--grey">Sin imagen</p>
              }
              <div className="resumenSolicitud__ventana__descBox">
                <div className="resumenSolicitud__ventana__descBox__texto">
                  <p className="paragraph"><b>Nombre: </b>{solicitud.Nombre}</p>
                </div>
              </div>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Identificación:</b> {solicitud.Identificacion}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Correo:</b> {solicitud.Email}</p>
            </div>
            

            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Celular:</b> {solicitud.Numero}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Celular:</b> {solicitud.Numero}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Celular:</b> {solicitud.Numero}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph"><b>Celular:</b> {solicitud.Numero}</p>
            </div>
            {/* <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Costo unitario: $ {productData.costoUnitario}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Stock: {productData.stock} unidades</p>
            </div> */}
            
          </div>

          <div className="metodoPago__btnBox">
            <button
              type="submit" 
              onClick={onAceptar}
              className="btn btn--blue"
            >Ok</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}