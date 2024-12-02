import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/checkout"); // Adjust this to the appropriate route for retrying
  };

  const handleContactSupport = () => {
    navigate("/contact-us"); // Adjust this to the appropriate route for contacting support
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-pink-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Transaction Failed!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          There was an issue with your transaction. Please try again later.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Retry
          </button>
          <button
            onClick={handleContactSupport}
            className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
