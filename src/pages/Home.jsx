/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import BeatCard from "../components/BeatCard"; // Ensure BeatCard component is available
import SubscriptionModal from "../components/SubscriptionModal"; // Import the modal component

const HomePage = () => {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Track user data
  const [isSubscribed, setIsSubscribed] = useState(false); // Check subscription status
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  useEffect(() => {
    // Fetch beats data
    axios
      .get("http://localhost:5000/api/beats")
      .then((response) => {
        setBeats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching beats:", error);
        setError("Failed to fetch beats");
        setLoading(false);
      });

    // Check if the user is logged in and has an active subscription
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve auth token from local storage
        if (!token) {
          setUser(null);
          return;
        }

        const userResponse = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userResponse.data); // Set user data

        // Check if the user has an active subscription
        if (
          !userResponse.data.subscription ||
          userResponse.data.subscription.status !== "active"
        ) {
          setIsSubscribed(false);
          setShowModal(true); // Show the modal if no active subscription
        } else {
          setIsSubscribed(true);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#001a33] p-4">
      {/* Hero Section */}
      <section className="text-center py-10 text-white mt-20">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-100">
          Discover Your Next Favorite Beat
        </h1>
        <p className="text-lg sm:text-xl  text-gray-300 max-w-3xl mx-auto">
          Explore an extensive collection of exclusive beats from talented
          producers around the world. Whether you’re an artist looking for the
          perfect instrumental to elevate your next track or a music enthusiast
          seeking fresh sounds, our platform offers a wide variety of genres and
          styles. Start your music journey today and unlock endless
          possibilities with our curated beat library.
        </p>
      </section>

      {/* Featured Beats Section */}
      <section className="text-center py-8">
        <h2 className="text-4xl font-bold text-white mb-6">Featured Beats</h2>
        {loading ? (
          <p className="text-lg text-gray-200">Loading beats...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : beats.length === 0 ? (
          <p className="text-lg text-gray-200 mb-4">
            No beats at the moment. Please check back later.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beats.map((beat) => (
              <BeatCard key={beat._id} beat={beat} />
            ))}
          </div>
        )}
      </section>

      {/* Show Subscription Modal if not subscribed */}
      {showModal && !isSubscribed && <SubscriptionModal />}
    </div>
  );
};

export default HomePage;
