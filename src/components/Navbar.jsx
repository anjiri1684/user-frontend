import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Simulated login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Simulate logout
    // Redirect to login page

    setIsLoggedIn(false);
    console.log("User logged out");
  };

  return (
    <nav className="bg-purple-700 z-10 p-4 fixed w-full text-white flex justify-between items-center">
      <div className="text-2xl font-semibold cursor-pointer">
        <a href="/">NIVA Productions</a>
      </div>
      <ul className="flex space-x-6">
        {/* Common Links */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/policy">Policy</Link>
        </li>
        <li>
          <Link to="/custom-beat-request">Request Custom Beat</Link>
        </li>
        <li>
          <Link to="/browse-beat">Available Beats</Link>
        </li>

        {/* Conditional Links */}
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 py-1 px-3 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
