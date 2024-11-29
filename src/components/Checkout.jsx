/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const Checkout = ({ selectedPlan, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSuccess = async (paymentMethod) => {
    setLoading(true);

    try {
      // Send paymentMethod.id and selected plan to backend for processing payment
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          selectedPlan: selectedPlan,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/success"); // Redirect to Success page
      } else {
        navigate("/error"); // Redirect to Error page
      }
    } catch (error) {
      console.error("Error during payment:", error);
      navigate("/error"); // Redirect to Error page
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Confirm your {selectedPlan} Plan</h2>
      <div>
        <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
        {loading && <p>Processing payment...</p>}
      </div>
    </div>
  );
};

export default Checkout;
