import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token not found in localStorage");
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await axios.get(
          "https://api-nivabeats-com.onrender.com/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.response?.data?.message || "Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours >= 18) {
      return "Good Evening";
    } else {
      return "Good Afternoon";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-800 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Hello, {userData.firstName}!
          </h2>
          <div className="flex space-x-3">
            <div className="bg-green-500 text-white py-1 px-4 rounded-full text-sm font-semibold">
              {userData.subscriptionStatus}
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white py-1 px-4 rounded-full text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-600">
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p className="text-gray-600">
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {userData.email}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Location
            </h3>
            <p className="text-gray-600">
              <strong>Country:</strong> {userData.country}
            </p>
            <p className="text-gray-600">
              <strong>State:</strong> {userData.state}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {userData.city}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              {getGreeting()} {userData.firstName}!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
