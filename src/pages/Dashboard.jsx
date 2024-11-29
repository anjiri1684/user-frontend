import { useEffect, useState } from "react";
import api from "../services/api";
import SubscriptionModal from "../components/SubscriptionModal"; // Import the modal

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/users/me");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubscribeClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#001a33] text-white p-4">
      <div className="dashboard text-center bg-[#002A49] text-white p-8 rounded-lg shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6">Welcome, {userData.name}</h1>
        <div>
          <h2 className="text-2xl mb-3">Your Subscription</h2>
          <p className="mb-4">
            {userData.subscription
              ? "Active Subscription"
              : "No active subscription"}
          </p>
          {userData.subscription ? (
            <div className="mb-4">
              Subscription Details: {userData.subscription.plan}
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              onClick={handleSubscribeClick} // Show modal when clicked
            >
              Subscribe Now
            </button>
          )}
        </div>
      </div>

      {/* Render the modal if it's open */}
      {isModalOpen && <SubscriptionModal />}
    </div>
  );
};

export default Dashboard;
