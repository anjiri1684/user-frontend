/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (beat) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item._id === beat._id)) {
        // Instead of alert, you might want to display a message to the user
        console.log("You can only purchase a beat once.");
        return prevCart; // Prevent adding the same beat again
      }
      const updatedCart = [...prevCart, beat];
      return updatedCart;
    });
  };

  const removeFromCart = (beatId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((beat) => beat._id !== beatId);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartContext
export const useCart = () => useContext(CartContext);
