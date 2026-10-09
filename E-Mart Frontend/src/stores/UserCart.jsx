
import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';

const UserCart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [step, setStep] = useState("cart");
  const [method, setMethod] = useState("");
  const [status, setStatus] = useState("");
   const total = cartItems.reduce((sum, item) =>
  sum + Number(String(item.price).replace(/[^0-9.]/g, "")), 0
);

const createOrder = async (paymentMethod) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const order = {
    userId: user.id,
    totalAmount: total,
    paymentMethod: paymentMethod
  };

  try {
    const response = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error("Order creation failed");
    }

    const data = await response.json();
    console.log("Order saved:", data);

    setStep("success");

  } catch (error) {
    console.error(error);
    alert("Failed to place order");
  }
};
const selectPayment = (m) => {
  setMethod(m);

  if (m === "cod") {
    createOrder("COD");
  } else {
    setStep(m);
  }
};

  const pay = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
         setTimeout(() => {
      createOrder(method === "card" ? "CARD" : "UPI");
    }, 1000);

  }, 2000);
};
          return (
  <>
    <Navbar />

    {step === "cart" && (
      <div>
        <h2 className="y-cart">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <>
            {cartItems.map((item, i) => (
              <div className="cart-section" key={item.id || i}>

                <img src={item.image} alt={item.product} />

                <div className="cart-details">
                  <h3>{item.product}</h3>
                  <h2>{item.price}</h2>
                  <h3>{item.model}</h3>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>

                <button
                  className="place-order-btn"
                  onClick={() => setStep("payment")}
                >
                  Place Order
                </button>

              </div>
            ))}
          </>
        )}
      </div>
    )}

      {step === "payment" && (
        <div className="payment-section">
          <h2>Select Payment Method</h2>

          <button onClick={() => selectPayment("cod")}>
            Cash / Payment on Delivery
          </button>

          <button onClick={() => selectPayment("card")}>
            Credit / Debit Card
          </button>

          <button onClick={() => selectPayment("qr")}>
            QR Code / UPI
          </button>
        </div>
      )}

      {step === "card" && (
        <div className="payment-section">
          <h2>Card Payment</h2>

          {status === "" && (
            <>
              <input placeholder="Card Number" />
              <input placeholder="Expiry" />
              <input placeholder="CVV" />
              <button onClick={pay}>Pay ₹{total}</button>
            </>
          )}

          {status === "processing" && <h3>Processing Payment...</h3>}
          {status === "success" && <h3>✓ Payment Successful</h3>}
        </div>
      )}

      {step === "qr" && (
        <div className="payment-section">
          <h2>QR / UPI Payment</h2>

          {status === "" && (
            <>
              <div className="fake-qr">▣ ▣ ▣<br />▣ ▫ ▣<br />▣ ▣ ▣</div>
              <p>Amount: ₹{total}</p>
              <button onClick={pay}>Simulate Payment</button>
            </>
          )}

          {status === "processing" && <h3>Processing Payment...</h3>}
          {status === "success" && <h3>✓ Payment Successful</h3>}
        </div>
      )}

      {step === "success" && (
        <div className="order-success">
          <h1>✓</h1>
          <h2>Order Placed Successfully!</h2>
          <p>
            {method === "cod"
              ? "Payment will be collected on delivery."
              : "Payment successful. Your order is confirmed."}
          </p>
        </div>
      )}
    </>
  );
};

export default UserCart;
