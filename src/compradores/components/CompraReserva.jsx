import { useContext, useState } from "react";
import { apiUrl } from "../../apiUrl";
import { AuthContext } from "../../auth";

export const CompraReserva = ({
  oferta,
  costoTotal,
  setShowPagoReserva,
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

  const crearCompraIndividual = async () => {
    const body = {
      IdComprador: user.IdUsuario,
      IdProveedor: oferta.IdProveedor,
      IdOferta: oferta.IdOferta,
      Cantidad: unidadesPetUsuario,
      Total: costoTotal,
      Descripcion: "",
      Observacion: "",
      IdEstado: oferta.IdEstadosOferta,
      MetodoPago: "reserva",
      PagadoAProveedor: false,
      TipoCompra: "normal",
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
  const efectuarPagoReserva = () => {
    // aqui va la implementacion con paypal para hacer las reservas
    // debe guardarse en la db el registro del pago, para luego de cerrar la oferta..
    // efectuar el pago a los proveedores
    return new Promise((resolve, reject) => {
      //TODO: metodo para setear el pago existoso
      if (pagoExitoso) {
        crearCompraIndividual();
        actualizarOferta();
        setShowPagoExito(true);
        setShowPagoReserva(false);
        resolve(true);
      } else {
        setShowErrorPago(true);
        setShowPagoReserva(false);
        reject(false);
      }
    });
  };

  const onSubmitPago = () => {
    console.log("Efectuando pago por Reserva...");
    efectuarPagoReserva()
      .then((res) => console.log("pago con exito"))
      .catch((res) => console.log(res));
  };

  return (
    <div className="metodoPago animate__animated animate__fadeIn">
      <div className="metodoPago__ventana animate__animated animate__slideInDown">
        <div className="metodoPago__barraSup"></div>
        <p className="paragraph u-margin-top-mid">
          Efectuando Pago con Reserva...
        </p>
        <p className="paragraph u-margin-top-mid">
          <b>$ {costoTotal.toFixed(2)}</b>
        </p>
        <div className="metodoPago__btnBox u-margin-top-mid">
          {/* <button 
            type="button"
            onClick={() => setShowPagoReserva(false)}
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
