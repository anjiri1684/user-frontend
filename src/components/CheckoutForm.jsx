/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

Modal.setAppElement("#root");

const CheckoutForm = () => {
  const { cart, setCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      console.log("Sending cart details to backend to create PaymentIntent...");
      const backendUrl = `https://niva-beats-backend.vercel.app/checkout/create-payment-intent`;

      const { data } = await axios.post(backendUrl, {
        beatIds: cart.map((item) => item._id),
      });

      const { clientSecret } = data;
      console.log("Received clientSecret from backend:", clientSecret);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: "Customer Name", // Replace with dynamic user name if necessary
            },
          },
        });

      if (stripeError) {
        console.error("Stripe Error:", stripeError.message);
        setError(`Payment failed: ${stripeError.message}`);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        setSuccess(true);
        setCart([]); // Clear cart after successful payment
        setModalIsOpen(false);
        navigate("/success");
      } else {
        setError("Payment failed. Please try again.");
        setIsProcessing(false);
        navigate("/error");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Something went wrong. Please try again later.");
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-500 bg-cover bg-center">
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-gradient-to-r from-green-500 to-teal-400 text-white py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
      >
        Proceed to Checkout
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Checkout Form"
        className="w-full max-w-4xl mx-auto bg-white p-10 mt-16 rounded-lg shadow-2xl transform transition-all"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      >
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-2">
          Checkout
        </h2>
        <p className="text-center text-2xl mb-5">
          Please fill in your credit card information!
        </p>
        {cart.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            Your cart is empty.
          </p>
        ) : success ? (
          <div className="text-center text-green-500 text-2xl font-semibold">
            Payment Successful! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex space-x-8">
            <div className="cart-summary w-1/2 bg-gray-50 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Cart
              </h3>
              <ul>
                {cart.map((item) => (
                  <li key={item._id} className="mb-2">
                    <span className="font-medium">{item.title}</span>: $$
                    {item.price}
                  </li>
                ))}
              </ul>
              <hr className="my-4" />
              <div className="total-amount text-xl font-semibold text-gray-800">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
            <div className="payment-form w-1/2">
              <div className="mb-4">
                <label htmlFor="card" className="block text-lg text-gray-700">
                  Credit Card
                </label>
                <div className="mt-2 space-y-4">
                  <CardNumberElement
                    id="card"
                    className="p-3 border-2 rounded-lg w-full"
                  />
                  <div className="flex space-x-4">
                    <CardExpiryElement className="p-3 border-2 rounded-lg w-1/2" />
                    <CardCvcElement className="p-3 border-2 rounded-lg w-1/2" />
                  </div>
                </div>
              </div>
              {error && (
                <div className="error text-red-500 text-center mt-4">
                  {error}
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-purple-700 text-white py-3 px-8 rounded-lg shadow-lg w-full mt-5 hover:bg-purple-800"
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CheckoutForm;
