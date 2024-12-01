import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCreditCard } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add some beats before proceeding.");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="cart-container p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      {/* Cart Items */}
      {cart.length > 0 ? (
        <div className="overflow-y-auto mt-4" style={{ maxHeight: "400px" }}>
          {cart.map((beat) => (
            <div
              key={beat._id}
              className="cart-item flex justify-between items-center mb-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="beat-info flex items-center space-x-4">
                <img
                  src={beat.image}
                  alt={beat.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    Beat Name: {beat.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">
                    Beat Artist: {beat.artist}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    Beat Genre: {beat.genre}
                  </p>
                  <p className="text-lg text-gray-300 font-semibold">
                    Beat Price: ${beat.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(beat._id)}
                className="remove-button text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
            <div className="total-info">
              <p className="text-xl font-semibold">
                Total:
                <span className="text-green-400">
                  $
                  {cart
                    .reduce((total, beat) => total + beat.price, 0)
                    .toFixed(2)}
                </span>
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="checkout-button bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-200 flex items-center"
            >
              <FaCreditCard className="mr-2" size={18} />
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
