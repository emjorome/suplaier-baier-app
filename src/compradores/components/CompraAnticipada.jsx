import { useContext, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";
import { ContBotonPago } from "../../components";
export const CompraAnticipada = ({
  oferta,
  costoTotal,
  setShowPagoAnticipado,
  setShowPagoExito,
  setShowErrorPago,
  unidadesPetUsuario,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [pagoExitoso, setPagoExitoso] = useState(true);

  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const actualizarOferta = async () => {
    const body = {
      IdOferta: oferta.IdOferta,
      NuevoActualProductos:
        parseInt(oferta.ActualProductos) + parseInt(unidadesPetUsuario),
    };
    const resp = await fetch(`${apiUrl}/ofertas`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    console.log(!!data && "exito");
  };

  const crearCompraIndividual = async (paymentData = {}) => {
    const body = {
      IdComprador: user.IdUsuario,
      IdProveedor: oferta.IdProveedor,
      IdOferta: oferta.IdOferta,
      Cantidad: unidadesPetUsuario,
      Total: paymentData.totalFinal || costoTotal,
      Descripcion: "",
      Observacion: "",
      IdEstado: oferta.IdEstadosOferta,
      MetodoPago: "anticipado",
      PagadoAProveedor: false,
      TipoCompra: "normal",
      IdOpcionDescuento: paymentData.IdOpcionDescuento || null,
    };

    const resp = await fetch(`${apiUrl}/compras`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    console.log(!!data && "exito");
  };

  //este metodo debe ser asincrono
  const efectuarPagoReserva = (paymentData = {}) => {
    // aqui va la implementacion con paypal para hacer las reservas
    // debe guardarse en la db el registro del pago, para luego de cerrar la oferta..
    // efectuar el pago a los proveedores
    return new Promise((resolve, reject) => {
      //TODO: metodo para setear el pago existoso
      if (pagoExitoso) {
        crearCompraIndividual(paymentData);
        actualizarOferta();
        //anadir pagos pendientes al administrador
        setShowPagoExito(true);
        setShowPagoAnticipado(false);
        resolve(true);
      } else {
        setShowErrorPago(true);
        setShowPagoAnticipado(false);
        reject(false);
      }
    });
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log("Pago exitoso con datos:", paymentData);
    efectuarPagoReserva(paymentData)
      .then((res) => console.log("pago con exito"))
      .catch((res) => console.warn("error en realizar el pago"));
  };

  const onSubmitPago = () => {
    console.log("Efectuando pago por Reserva...");
    efectuarPagoReserva()
      .then((res) => console.log("pago con exito"))
      .catch((res) => console.warn("error en realizar el pago"));
  };

  return (
    <div className="metodoPago animate__animated animate__fadeIn">
      <div className="metodoPago__ventana animate__animated animate__slideInDown">
        <div className="metodoPago__barraSup"></div>
        <p className="paragraph u-margin-top-small">
          <b>Efectuando Pago Anticipado</b>
        </p>
        <div className="u-margin-top-small"></div>
        {/* <p className="paragraph">$ {costoTotal.toFixed(2)}</p> */}
        <ContBotonPago 
          price={costoTotal.toFixed(2)} 
          userId={user.IdUsuario}
          onPaymentSuccess={handlePaymentSuccess}
        />
        <div className="metodoPago__btnBox">
          {/* <button 
            type="button"
            onClick={() => setShowPagoAnticipado(false)}
            className="btn btn--red"
          >Cancelar</button> */}

          <button
            type="button"
            onClick={onSubmitPago}
            className="btn btn--blue"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
