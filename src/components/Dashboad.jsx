import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/me");
        console.log(response.data); // Log data to ensure correct structure
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Show loading message while data is being fetched
  if (!userData) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

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
              Want to change your subscription plan?{" "}
              <a href="#" className="text-indigo-600 font-semibold">
                Click here
              </a>{" "}
              to manage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
