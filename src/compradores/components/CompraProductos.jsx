import { useEffect, useState } from "react"
import { useForm } from "../../hooks";

export const CompraProductos = ({
  setShowCompraProductos, 
  oferta, 
  setShowMetodoPago,
  producto}) => {

  const [costoTotal, setCostoTotal] = useState(0.00);

  const {unidadesUser, onInputChange} = useForm({unidadesUser: 0})

  useEffect(() => {
    setCostoTotal(parseInt(unidadesUser) * producto?.costoUnitario)
  }, [unidadesUser, producto]);
  
  const onCompraSubmit = (e) => {
    e.preventDefault();
    console.log("abriendo ventana resumen :p")
    setShowMetodoPago(true);
    setShowCompraProductos(false);
  }

  return (
    <div 
    className="metodoPago animate__animated animate__fadeIn">
    <div className="compraProducto animate__animated animate__slideInDown">
      {/* <div className="metodoPago__barraSup"></div> */}
      <form onSubmit={onCompraSubmit}>
      <div className="compraProducto__box">
        <div className="explorarCat__title">
          <p className="paragraph--mid"><b>Unirse a la oferta</b></p>
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
            <div className="oferta-detalle__productoBox__desc__text">
              <p className="paragraph"><b>{producto?.nombre}</b></p>
              <p className="paragraph">Precio unitario: {"$" + producto?.costoUnitario}</p>
              <p className="paragraph">Unidades disponibles: {(oferta?.cantMax - oferta?.actualProductos)}</p>
            </div>
          </div>
        </div>
        <div className="oferta-detalle__productoBox u-margin-top-small">
          <p className="paragraph"><b>Proveedor: {producto?.nombreProveedor}</b></p>
        </div>
        <div className="oferta-detalle__productoBox u-margin-top-small">
          <p className="paragraph">Fecha de cierre: {oferta?.fechaLimite}</p>
        </div>
        <div className="oferta-detalle__productoBox u-margin-top-small ">
          <input
            type="number"
            placeholder="Cantidad de unidades a comprar"
            className="compraProducto__input paragraph"
            name="unidadesUser"
            autoComplete="off"
            value={unidadesUser}
            onChange={onInputChange}
            min={1}
            max={oferta?.cantMax - oferta?.actualProductos}
          />
        </div>
        <div className="oferta-detalle__productoBox u-margin-top-small u-justify-center">
          <p className="paragraph"><b>Total: $ {!!unidadesUser ? costoTotal : 0}</b></p>
        </div>

      </div>

      <div className="metodoPago__btnBox">
        <button 
          type="button"
          onClick={() => setShowCompraProductos(false)}
          className="btn btn--red"
        >Cancelar</button>
        <button
          type="submit" 
          className="btn btn--blue"
        >Continuar</button>
      </div>
      </form>
    </div>
  </div>
  )
}
