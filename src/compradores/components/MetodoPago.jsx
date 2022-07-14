
export const MetodoPago = ({setShowMetodoPago}) => {

  const PayPalIcon = "https://1000marcas.net/wp-content/uploads/2019/12/logo-Paypal.png";

  return (
    <div 
      className="metodoPago animate__animated animate__fadeIn">
      <div 
        className="metodoPago__ventana animate__animated animate__slideInDown" 
      >
        <div className="metodoPago__barraSup"></div>
        
        <form action="" className="metodoPago__form">
          <p className="paragraph">Seleccionar método de pago: </p>
          <img src={PayPalIcon} alt="PayPal" className="metodoPago__paypalIcon" />
          <div className="metodoPago__form__inputBox">
            <div className="metodoPago__form__inputBox__inputInd">
              <input
                type="radio"
                id="pago_anticipado"
                value="pago_anticipado"
                name="metodo_pago"
              />
              <label 
                htmlFor="pago_anticipado" 
                className="paragraph"
              >Pago anticipado</label>
            </div>
            <div className="metodoPago__form__inputBox__inputInd">
              <input
                type="radio"
                id="pago_reserva"
                value="pago_reserva"
                name="metodo_pago"
              />
              <label 
                htmlFor="pago_reserva"
                className="paragraph"
              >Reserva</label>
            </div> 
          </div>   
        </form>

        <div className="metodoPago__btnBox">
          <button 
            onClick={() => setShowMetodoPago(false)}
            className="btn btn--red"
          >Cancelar</button>
          <button 
            onClick={() => console.log("continuando :p")}
            className="btn btn--blue"
          >Continuar</button>
        </div>
        
      </div>
    </div>
  )
}
