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

// Modal setup
Modal.setAppElement("#root");

const CheckoutForm = () => {
  const { cart, setCart } = useCart(); // Add setCart to clear the cart
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [success, setSuccess] = useState(false); // Success state to show the success message

  // Calculate total price dynamically based on individual beat prices
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null); // Clear previous error message

    try {
      // Send cart details (beatIds) to backend to create PaymentIntent
      const { data } = await axios.post(
        "http://localhost:5000/api/checkout/create-payment-intent",
        {
          beatIds: cart.map((item) => item._id), // Extracting beat IDs from the cart
        }
      );

      const { clientSecret } = data; // Get the clientSecret from the backend response

      // Confirm the payment with Stripe using the clientSecret
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: "Customer Name", // Replace with dynamic name if needed
            },
          },
        });

      if (stripeError) {
        console.error("Stripe Error:", stripeError.message);
        setError(stripeError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        setSuccess(true); // Set success state to show success message
        // Clear the cart after successful payment
        setCart([]);
        // Redirect to success page if payment is successful
        setTimeout(() => {
          console.log("Navigating to success page...");
          setModalIsOpen(false); // Close modal after success
          navigate("/success");
        }, 2000); // Delay to allow user to see success
      } else {
        console.error("Payment failed.");
        setError("Payment failed.");
        setIsProcessing(false);
        navigate("/error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      setError("Something went wrong. Please try again.");
      setIsProcessing(false);
    } finally {
      setIsProcessing(false); // Always set to false when the payment process ends
    }
  };

  return (
    <div className="checkout-container flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-500 bg-cover bg-center">
      {/* Button to open the modal */}
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-gradient-to-r from-green-500 to-teal-400 text-white py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
      >
        Proceed to Checkout
      </button>

      {/* Modal for Checkout Form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Checkout Form"
        className="w-full max-w-4xl mx-auto bg-white p-10 mt-16 rounded-lg shadow-2xl transform transition-all"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      >
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Checkout
        </h2>

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
            {/* Left Section: Cart Items */}
            <div className="cart-summary w-1/2 bg-gray-50 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Cart
              </h3>
              <div className="cart-items space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center text-lg text-gray-700"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="total mt-4">
                <p className="text-xl font-semibold text-gray-800">
                  Total: ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Right Section: Payment Details */}
            <div className="payment-section w-1/2 space-y-8">
              {/* Card Number */}
              <div className="card-element">
                <label
                  htmlFor="card-number"
                  className="block text-lg font-medium text-gray-700 mb-3"
                >
                  Card Number
                </label>
                <CardNumberElement
                  id="card-number"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all ease-in-out duration-300"
                />
              </div>

              {/* Expiry Date */}
              <div className="card-element">
                <label
                  htmlFor="card-expiry"
                  className="block text-lg font-medium text-gray-700 mb-3"
                >
                  Expiry Date
                </label>
                <CardExpiryElement
                  id="card-expiry"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all ease-in-out duration-300"
                />
              </div>

              {/* CVV */}
              <div className="card-element">
                <label
                  htmlFor="card-cvc"
                  className="block text-lg font-medium text-gray-700 mb-3"
                >
                  CVV
                </label>
                <CardCvcElement
                  id="card-cvc"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition-all ease-in-out duration-300"
                />
              </div>
            </div>
          </form>
        )}

        {error && (
          <p className="text-red-500 text-center text-lg font-semibold">
            {error}
          </p>
        )}

        <div className="text-center mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!stripe || isProcessing || success}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
