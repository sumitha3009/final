import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles//Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [isPlaced, setIsPlaced] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [onlineProvider, setOnlineProvider] = useState("gpay");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!cart.length) return;
    setIsPlaced(true);
  };

  const handleOnlineRedirect = () => {
    const merchantUpiId = "merchant@upi";
    const merchantName = "AgroConnect";
    const txnNote = "Order Payment";
    const upiBase = `pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(
      merchantName
    )}&am=${encodeURIComponent(total)}&cu=INR&tn=${encodeURIComponent(txnNote)}`;

    const appUrl =
      onlineProvider === "gpay"
        ? `gpay://upi/pay?${upiBase}`
        : `paytmmp://pay?${upiBase}`;
    const fallbackUrl =
      onlineProvider === "gpay" ? "https://pay.google.com/" : "https://paytm.com/";

    window.location.href = appUrl;
    setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 1200);
  };

  const handleProceedPayment = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("Please enter delivery address.");
      return;
    }

    if (paymentMethod === "online") {
      handleOnlineRedirect();
      return;
    }

    alert("Order placed with Cash on Delivery.");
    clearCart();
    navigate("/customer-home");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>Checkout</h2>

        <div className="checkout-items">
          {cart.map((c, i) => (
            <div className="checkout-item" key={i}>
              <span className="item-name">{c.name}</span>
              <span>{c.quantity} kg</span>
              <span className="item-price">Rs. {c.price * c.quantity}</span>
            </div>
          ))}
        </div>

        <div className="checkout-total">
          <span>Total Amount</span>
          <span>Rs. {total}</span>
        </div>

        {!isPlaced ? (
          <div className="payment-buttons">
            <button className="upi" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        ) : (
          <form className="checkout-form" onSubmit={handleProceedPayment}>
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              placeholder="House no, street, city, pincode"
              required
            />

            <label>Payment Option</label>
            <div className="payment-choice">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>

            {paymentMethod === "online" && (
              <div className="payment-choice">
                <label>
                  <input
                    type="radio"
                    name="onlineProvider"
                    value="gpay"
                    checked={onlineProvider === "gpay"}
                    onChange={(e) => setOnlineProvider(e.target.value)}
                  />
                  Google Pay
                </label>
                <label>
                  <input
                    type="radio"
                    name="onlineProvider"
                    value="paytm"
                    checked={onlineProvider === "paytm"}
                    onChange={(e) => setOnlineProvider(e.target.value)}
                  />
                  Paytm
                </label>
              </div>
            )}

            <button type="submit" className="upi">
              {paymentMethod === "online" ? "Proceed to Payment" : "Confirm Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
