import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function App() {
  const [price, setPrice] = useState(0);
  const [opcion, setOpcion] = useState(5);

  useEffect(() => {
    if (opcion !== "other") {
      setPrice(opcion);
    }
  }, [opcion]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture(handlePay());
  };

  function handlePay() {
    console.log("el pago ha sido exitoso desde la web");
    window.location.href = "https://portfolio-arcodez.vercel.app";
  }
  const handleChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <center>
      <div className="App">
        <h1>Doname {price} $</h1>

        {opcion === "other" && (
          <input
            type="text"
            onChange={handleChange}
            value={price}
            style={{ margin: 20 }}
          ></input>
        )}
        <br />
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </center>
  );
}