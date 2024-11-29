import { useState, useEffect } from "react";
import BeatCard from "./BeatCard"; // Import BeatCard component

const AllBeats = () => {
  const [beats, setBeats] = useState([]);

  useEffect(() => {
    // Fetch beats from your API or state
    fetch("http://localhost:5000/api/beats") // Adjust API endpoint
      .then((res) => res.json())
      .then((data) => setBeats(data))
      .catch((err) => console.log("Error fetching beats", err));
  }, []);

  const handleAddToCart = (beatId) => {
    console.log(`Add beat ${beatId} to cart`);
    // Add logic to add to cart
  };

  const handlePlay = (beatId) => {
    console.log(`Play beat ${beatId}`);
    // Logic to handle playback
  };

  const handleDownload = (beatId) => {
    console.log(`Download beat ${beatId}`);
    // Handle downloading
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        Available Beats
      </h2>
      {beats.length > 0 ? (
        beats.map((beat) => (
          <BeatCard
            key={beat._id}
            beat={beat}
            onAddToCart={handleAddToCart}
            onPlay={handlePlay}
            onDownload={handleDownload}
          />
        ))
      ) : (
        <p className="text-white text-center">
          No beats available at the moment.
        </p>
      )}
    </div>
  );
};

export default AllBeats;
