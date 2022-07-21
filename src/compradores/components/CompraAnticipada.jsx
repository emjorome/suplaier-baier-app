
export const CompraAnticipada = ({costoTotal, setShowPagoAnticipado, setOfertaActual}) => {

  const onSubmitPago = () => {
    console.log("Efectuando pago...");
    console.log(costoTotal)
    setOfertaActual((oferta) => ({
      ...oferta,
      actualProductos: 2000 + costoTotal / 0.75,
    }))

  }

  return (
    <div className="metodoPago animate__animated animate__fadeIn">
      <div className="metodoPago__ventana animate__animated animate__slideInDown">
        <div className="metodoPago__barraSup"></div>
        <p className="paragraph">Efectuando Pago Anticipado...</p>
        <p className="paragraph">$ {costoTotal}</p>
        <div className="metodoPago__btnBox">
          <button 
            type="button"
            onClick={() => setShowPagoAnticipado(false)}
            className="btn btn--red"
          >Cancelar</button>
          <button 
            type="button"
            onClick={onSubmitPago}
            className="btn btn--blue"
          >Continuar</button>
        </div>
      </div>
    </div>
  )
}
