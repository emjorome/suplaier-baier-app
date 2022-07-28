
export const ResumenOferta = ({formState: ofertaData, setShowResumenOferta, setShowAccionExitosa}) => {
  
  
  return (
    <div className="resumenProducto animate__animated animate__fadeIn">
      <div className="resumenProducto__ventana animate__animated animate__slideInDown">
        {/* <div className="metodoPago__barraSup"></div>
        <div className="resumenProducto__ventana__contenido">
          <div className="explorarCat__title">
            <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
            </span>
            <p className="paragraph--mid"><b>Resumen del producto</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="compraProducto__box">
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <img src={imagen} alt={"producto"} className="resumenProducto__ventana__img" />
              <div className="resumenProducto__ventana__descBox">
                <div className="resumenProducto__ventana__descBox__texto">
                  <p className="paragraph">{productData.descripcion}</p>
                </div>
              </div>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Nombre: {productData.nombreProducto}</p>
            </div>
            
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Categoría: {JSON.parse(productData.categoria).Nombre}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Proveedor: {productData.nombreProveedor}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Costo unitario: $ {productData.costoUnitario}</p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">Stock: {productData.stock} unidades</p>
            </div>
            
          </div>

          <div className="metodoPago__btnBox">
            <button 
              type="button"
              onClick={() => setShowResumenProducto(false)}
              className="btn btn--red"
            >Cancelar</button>
            <button
              type="submit" 
              onClick={onSubirProducto}
              className="btn btn--blue"
            >Continuar</button>
          </div>
        </div> */}
        
      </div>
    </div>
  )
}
