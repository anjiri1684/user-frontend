import { useState, useEffect } from "react";
import BeatCard from "./BeatCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const BeatList = () => {
  const [beats, setBeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Track the currently playing beat

  useEffect(() => {
    // Fetch beats from your API
    fetch("https://niva-beats-backend.onrender.com/api/beats")
      .then((res) => res.json())
      .then((data) => setBeats(data))
      .catch((err) => console.error("Error fetching beats", err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePlay = (playingBeatId) => {
    const playingBeat = beats.find((beat) => beat._id === playingBeatId);
    setCurrentlyPlaying(playingBeat); // Set the playing beat
  };

  const handleAddToCart = (beat) => {
    if (cart.some((item) => item._id === beat._id)) {
      alert("You can only purchase a beat once.");
    } else {
      navigate("/checkout", { state: { beat } });
    }
  };

  const filteredBeats = beats.filter(
    (beat) =>
      beat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beat.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beat.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-[#012e59]">
      <input
        type="text"
        placeholder="Search beats..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 rounded"
      />

      {/* Currently Playing Section */}
      {currentlyPlaying && (
        <div className="mb-6">
          <div className="p-6 bg-[#0d1f2f] rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {currentlyPlaying.name}
              </h2>
              <p className="text-gray-400">By {currentlyPlaying.artist}</p>
            </div>
            <img
              src={currentlyPlaying.coverImage} // Replace with the correct key for the beat's image
              alt={currentlyPlaying.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
          {/* Audio player */}
          <div className="mt-4 flex items-center space-x-4">
            <button className="p-2 bg-blue-500 rounded text-white">Play</button>
            <button
              onClick={() => handleAddToCart(currentlyPlaying)}
              className="p-2 bg-green-500 rounded text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Beat List */}
      {filteredBeats.length > 0 ? (
        <div className="space-y-4">
          {filteredBeats
            .filter((beat) => beat._id !== currentlyPlaying?._id) // Exclude the playing beat
            .map((beat) => (
              <div key={beat._id} className="relative">
                <BeatCard
                  beat={beat}
                  onPlay={handlePlay}
                  onAddToCart={handleAddToCart}
                  isPlaying={beat._id === currentlyPlaying?._id} // Highlight playing beat
                />
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-white">No beats found.</p>
      )}
    </div>
  );
};

export default BeatList;
