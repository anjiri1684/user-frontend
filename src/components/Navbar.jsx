import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext); // Access the cart state

  return (
    <nav className="navbar bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="logo">
        <Link to="/" className="text-2xl font-semibold">
          NIVA Productions
        </Link>
      </div>
      <div className="nav-links flex space-x-4">
        {/* Common link visible for all users */}
        <Link to="/" className="text-lg">
          Home
        </Link>
        <Link to="/about-us" className="text-lg">
          About Us
        </Link>
        <Link to="/policy" className="text-lg">
          Policy
        </Link>
        <Link to="/custome-beat" className="text-lg">
          Request Custom Beat
        </Link>

        {/* Links for logged-in users */}
        {isLoggedIn ? (
          <>
            <Link to="/browse-beat" className="text-lg">
              Available Beats
            </Link>
            <Link to="/cart" className="relative text-lg">
              🛒
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <button onClick={logout} className="text-lg">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg">
              Login
            </Link>
            <Link to="/register" className="text-lg">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
