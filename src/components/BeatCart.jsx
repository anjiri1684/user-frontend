import { useState, useEffect } from "react";
import BeatCard from "./BeatCard"; // Assuming BeatCard is a separate component

const BeatCart = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("/api/beats") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error("Error fetching beats:", err));
  }, []);

  return (
    <div className="beat-cart">
      {tracks.length === 0 ? (
        <div className="text-center text-gray-500">No beats available.</div>
      ) : (
        tracks.map((track) => <BeatCard key={track.id} track={track} />)
      )}
    </div>
  );
};

export default BeatCart;
