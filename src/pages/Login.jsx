import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error on each submit attempt

    try {
      const response = await axios.post(
        "https://niva-beats-backend.vercel.app/api/auth/login",
        formData
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token stored in localStorage:", token); // Add log statement
        navigate("/"); // Redirect to dashboard after successful login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001a33] text-white">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-[#003366]">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-2 p-2 border focus:outline-none text-black border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-2 p-2 border border-gray-300 text-black focus:outline-none rounded-lg"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password link */}
        <p className="mt-4 text-center text-sm text-white">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-blue-500">
            Reset it here
          </a>
        </p>

        <p className="mt-4 text-center text-sm text-white">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
