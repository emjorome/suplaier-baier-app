import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { apiUrl } from "../../apiUrl";


export const ContBotonPago = ({price = 0, userId, onPaymentSuccess}) => {
  const [descuentos, setDescuentos] = useState([]);
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);
  const [saldoEstrellas, setSaldoEstrellas] = useState(0);
  const [totalFinal, setTotalFinal] = useState(price);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDescuentos();
    if (userId) {
      fetchSaldoEstrellas();
    }
  }, [userId]);

  useEffect(() => {
    setTotalFinal(price);
  }, [price]);

  const fetchDescuentos = async () => {
    try {
      const resp = await fetch(`${apiUrl}/recompensas/canjes`);
      const data = await resp.json();
      
      console.log("Datos de descuentos:", data); // Para depurar en consola

      // CORRECCIÓN: El backend envía un array, no un objeto con .canjes
      if (Array.isArray(data)) {
         setDescuentos(data);
      } else if (data.canjes) {
         // Por si acaso cambias el backend luego
         setDescuentos(data.canjes);
      } else if (data.data) {
         // Otro formato común
         setDescuentos(data.data);
      }

    } catch (error) {
      console.error('Error al cargar descuentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSaldoEstrellas = async () => {
    try {
      const resp = await fetch(`${apiUrl}/recompensas/saldo/${userId}`);
      const data = await resp.json();
      if (data.ok) {
        setSaldoEstrellas(data.balance);
      }
    } catch (error) {
      console.error('Error al cargar saldo:', error);
    }
  };

  const handleDescuentoChange = (e) => {
    const idOpcion = e.target.value;
    
    if (!idOpcion || idOpcion === "") {
      setDescuentoSeleccionado(null);
      setTotalFinal(price);
      return;
    }

    const descuento = descuentos.find(d => d.IdOpcion === parseInt(idOpcion));
    
    if (descuento) {
      // Verificar si tiene suficientes estrellas
      if (saldoEstrellas < descuento.CostoEstrellas) {
        alert(`No tienes suficientes estrellas. Necesitas ${descuento.CostoEstrellas} estrellas pero solo tienes ${saldoEstrellas}.`);
        e.target.value = "";
        return;
      }

      setDescuentoSeleccionado(descuento);
      const descuentoAplicado = price * (descuento.Porcentaje / 100);
      const nuevoTotal = price - descuentoAplicado;
      setTotalFinal(nuevoTotal.toFixed(2));
    }
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalFinal
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      handlePay();
    });
  };

  function handlePay() {
    alert("el pago ha sido exitoso desde la web");
    console.log("el pago ha sido exitoso desde la web");
    
    // Llamar al callback con el ID del descuento seleccionado
    if (onPaymentSuccess) {
      onPaymentSuccess({
        IdOpcionDescuento: descuentoSeleccionado ? descuentoSeleccionado.IdOpcion : null,
        totalOriginal: price,
        totalFinal: totalFinal,
        descuentoAplicado: descuentoSeleccionado
      });
    }
  }

  // Importa PayPalButton solo en un entorno de navegador
  let PayPalButton = null;
  if (typeof window !== "undefined" && window.paypal) {
    PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  }

  return (
    <center className="contBotonPago">
        <div className="contBotonPago__saldoBox">
          <p className="paragraph"><strong>Tu saldo de estrellas:</strong> {saldoEstrellas}</p>
        </div>

        {!loading && descuentos.length > 0 && (
          <div className="contBotonPago__descuentoSelector">
            <label htmlFor="descuento" className="paragraph">
              <strong>Selecciona un descuento:</strong>
            </label>
            <select 
              id="descuento" 
              onChange={handleDescuentoChange}
              className="contBotonPago__descuentoSelector__select"
            >
              <option value="">Sin descuento</option>
              {descuentos.map((desc) => (
                <option 
                  key={desc.IdOpcion} 
                  value={desc.IdOpcion}
                  disabled={saldoEstrellas < desc.CostoEstrellas}
                >
                  {desc.Nombre} - {desc.Porcentaje}% de descuento 
                  ({desc.CostoEstrellas} estrellas)
                  {saldoEstrellas < desc.CostoEstrellas && " - Insuficientes estrellas"}
                </option>
              ))}
            </select>
          </div>
        )}

        {descuentoSeleccionado && (
          <div className="contBotonPago__descuentoInfo">
            <p className="paragraph">
              <strong>Descuento aplicado:</strong> {descuentoSeleccionado.Nombre} ({descuentoSeleccionado.Porcentaje}%)
            </p>
            <p className="paragraph">
              <strong>Ahorro:</strong> ${(price - totalFinal).toFixed(2)}
            </p>
          </div>
        )}

        <h1>Total a pagar: ${totalFinal}</h1>
        {descuentoSeleccionado && (
          <p className="paragraph" style={{textDecoration: 'line-through', color: '#999'}}>
            Precio original: ${price}
          </p>
        )}
        <br />
        {PayPalButton && (
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        )}
    </center>
  );
}