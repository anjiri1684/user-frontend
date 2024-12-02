import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importing a check-circle icon for success

const Success = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboad"); // Redirect user to the dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-md">
        <FaCheckCircle size={50} className="text-green-600 mb-4" />
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Transaction Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your subscription/payment was completed successfully. Thank you for
          your purchase!
        </p>
        <button
          onClick={handleGoToDashboard}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
