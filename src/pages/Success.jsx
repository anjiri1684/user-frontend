import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard"); // Redirect user to the dashboard
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-green-500 text-2xl">Transaction Successful!</h1>
      <p>Your subscription/payment was completed successfully.</p>
      <button
        onClick={handleGoToDashboard}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;
