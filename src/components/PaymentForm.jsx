/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({
  onPaymentSuccess,
  onPaymentError,
  amount,
  closeModal,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const {
        data: { clientSecret },
      } = await axios.post("/api/create-payment-intent", { amount });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (error) {
        onPaymentError();
        setLoading(false);
        console.error(error);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
        setLoading(false);
        closeModal();
      }
    } catch (error) {
      onPaymentError();
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
      <div className="modal-content bg-[#001a33] p-8 rounded-lg shadow-xl w-[90%] sm:w-[50%] md:w-[40%]">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Enter Payment Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number Field */}
          <div className="form-group">
            <label htmlFor="card-number" className="text-white">
              Card Number
            </label>
            <CardNumberElement
              id="card-number"
              className="w-full p-2 rounded border border-gray-400 bg-white text-black"
            />
          </div>

          {/* Expiration Date Field */}
          <div className="form-group">
            <label htmlFor="card-expiry" className="text-white">
              Expiration Date
            </label>
            <CardExpiryElement
              id="card-expiry"
              className="w-full p-2 rounded border border-gray-400 bg-white text-black"
            />
          </div>

          {/* CVV Field */}
          <div className="form-group">
            <label htmlFor="card-cvc" className="text-white">
              CVV
            </label>
            <CardCvcElement
              id="card-cvc"
              className="w-full p-2 rounded border border-gray-400 bg-white text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="mt-4 text-gray-300 hover:text-white w-full py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
