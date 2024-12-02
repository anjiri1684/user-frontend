import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          newPassword,
        }
      );
      setMessage(response.data.message || "Password reset successfully.");

      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001a33]">
      <div className="bg-[#003366] p-8 rounded-lg shadow-lg w-full max-w-md mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Reset Password
        </h2>

        {message && (
          <div className="text-center text-white mb-4">{message}</div>
        )}

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
