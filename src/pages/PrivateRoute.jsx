/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Check if user is logged in
  const location = useLocation();

  // If the user is not logged in, redirect them to login page
  if (!isLoggedIn) {
    console.log("Not logged in, redirecting to login.");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children; // If logged in, render the protected route
};

export default PrivateRoute;
