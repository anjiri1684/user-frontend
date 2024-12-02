/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext({
  isLoggedIn: false, // Default value
  login: () => {},
  logout: () => {},
});

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // To programmatically redirect the user
  const location = useLocation(); // Get current location
  const storedToken = localStorage.getItem("authToken");
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Use null to indicate initial state (not decided yet)

  useEffect(() => {
    if (storedToken) {
      try {
        const decodedToken = jwt_decode(storedToken); // Decode token
        const currentTime = Date.now() / 1000; // Get current time in seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false); // Token expired, log the user out
        } else {
          setIsLoggedIn(true); // Token valid, user is logged in
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false); // Invalid token, log the user out
      }
    } else {
      setIsLoggedIn(false); // No token, user is not logged in
    }
  }, [storedToken]); // Only run when `storedToken` changes

  const login = (token) => {
    localStorage.setItem("authToken", token); // Store token
    setIsLoggedIn(true); // Set user as logged in
    navigate("/"); // Redirect to dashboard after login
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    setIsLoggedIn(false); // Set user as logged out
    navigate("/login"); // Redirect to login page after logout
  };

  // If `isLoggedIn` is null (initial state), we return a loading state
  if (isLoggedIn === null) {
    return null; // Or you could show a loading spinner or some indicator here
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
