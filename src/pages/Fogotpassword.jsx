import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle reset password functionality
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setMessage("Invalid email format.");
      return;
    }

    // Validate password strength
    if (!validatePasswordStrength(newPassword)) {
      setMessage(
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character."
      );
      return;
    }

    setLoading(true);

    try {
      // Send reset password request to the backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password", // Adjust URL based on your backend setup
        {
          email,
          newPassword,
        }
      );
      setMessage(response.data.message || "Password reset successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password strength validation
  const validatePasswordStrength = (password) => {
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001a33]">
      <div className="bg-[#003366] p-8 rounded-lg shadow-lg w-full max-w-md mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Reset Password
        </h2>

        {/* Display message */}
        {message && (
          <div className="text-center text-white mb-4">{message}</div>
        )}

        {/* Password reset form */}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 p-2 border text-black border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              New Password
            </label>
            <input
              type="password"
              className="w-full mt-2 p-2 border text-black border-gray-300 rounded-lg"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full mt-2 p-2 border text-black border-gray-300 rounded-lg"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
