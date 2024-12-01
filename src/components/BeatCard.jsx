/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaDownload,
  FaPlus,
  FaCartPlus,
  FaLink,
} from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BeatCard = ({ beat, isPlaying }) => {
  const [currentPlaying, setCurrentPlaying] = useState(isPlaying);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);
  const { addToCart } = useCart();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const abortController = new AbortController();

    if (beat?.audioFile && waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet",
        progressColor: "purple",
        height: 80,
        xhr: {
          requestHeaders: {
            signal: abortController.signal,
          },
        },
      });

      wavesurferRef.current.load(beat.audioFile);

      wavesurferRef.current.on("ready", () => {
        if (isMounted.current) {
          setIsLoading(false);
        }
      });

      wavesurferRef.current.on("error", (error) => {
        console.error("Error loading audio file:", error);
        if (isMounted.current) {
          setIsLoading(false);
        }
      });

      return () => {
        isMounted.current = false;
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
        abortController.abort();
      };
    }
  }, [beat]);

  useEffect(() => {
    // Whenever the isPlaying prop changes, update currentPlaying state
    setCurrentPlaying(isPlaying);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (currentPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setCurrentPlaying(!currentPlaying);
  };

  const handleFavorite = async () => {
    try {
      const response = await axios.post(`/api/favorites/${beat.id}`, {
        isFavorite: !isFavorite,
      });
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (beat.price > 0) {
      setShowDownloadModal(true); // Show modal if beat is paid
    } else {
      startDownload(); // Download immediately if it's free
    }
  };

  const handleProceedToPayment = async () => {
    addToCart(beat); // Add the beat to the cart
    navigate("/checkout"); // Proceed to checkout page
    setShowDownloadModal(false); // Close modal
  };

  const startDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await axios.get(`/api/download/${beat.id}`);
      const downloadUrl = response.data.downloadUrl;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = beat.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading beat:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      addToCart(beat);
      alert(`${beat.title} has been added to your cart!`);
    }
  };

  const handleAddToPlaylist = async () => {
    try {
      const response = await axios.post(`/api/playlist/add`, {
        beatId: beat.id,
      });
      alert(response.data.message || "Added to playlist!");
    } catch (error) {
      console.error("Error adding to playlist:", error);
      // alert("Failed to add to playlist.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "beats/" + beat.title);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div
      className={`beat-card p-6 bg-gray-800 text-white rounded-lg shadow-xl flex flex-col md:flex-row items-center mb-7 ${
        currentPlaying ? "border-4 border-blue-500" : ""
      }`}
    >
      <div className="beat-image w-32 h-32 mb-4 md:mb-0 mr-4">
        <img
          src={beat?.image || "default-image-url"}
          alt="Beat Cover"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="beat-info flex-1">
        <h3 className="text-xl font-semibold text-blue-400">
          Name: {beat.title}
        </h3>
        <p className="text-sm text-gray-400">Artist: {beat.artist}</p>
        <p className="text-xs text-gray-500">
          {beat.genre} | {beat.bpm} BPM
        </p>
        <p className="text-lg font-bold text-yellow-500">
          Price: ${beat.price}
        </p>
        <p className="text-sm text-gray-300">Desc: {beat.description}</p>
      </div>
      <div
        ref={waveformRef}
        className="waveform flex-grow h-24 rounded-lg mx-2"
      >
        {isLoading && <p>Loading...</p>}
      </div>
      <div className="beat-controls flex space-x-4">
        <button
          onClick={handlePlayPause}
          className={`p-3 rounded-full ${
            currentPlaying ? "bg-red-600" : "bg-blue-600"
          } hover:bg-blue-700 transition`}
        >
          {currentPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button
          onClick={handleFavorite}
          className={`p-3 rounded-full ${
            isFavorite ? "bg-yellow-500" : "bg-gray-600"
          } hover:bg-yellow-600 transition`}
        >
          <FaHeart size={24} />
        </button>
        <button
          onClick={handleAddToPlaylist}
          className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition"
        >
          <FaPlus size={24} />
        </button>
        <button
          onClick={handleDownload}
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 transition"
        >
          {isDownloading ? (
            <span>Downloading...</span>
          ) : (
            <FaDownload size={24} />
          )}
        </button>
        {isLoggedIn && (
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 transition"
          >
            <FaCartPlus size={24} />
          </button>
        )}
        <button
          onClick={handleCopyLink}
          className="p-3 rounded-full bg-gray-500 hover:bg-gray-600 transition"
        >
          <FaLink size={24} />
        </button>
      </div>

      {linkCopied && <span className="text-green-500 mt-2">Link copied!</span>}

      {/* Modal for purchase confirmation */}
      {showDownloadModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">
              To download this beat, you need to pay ${beat.price}.
            </p>
            <button
              onClick={handleProceedToPayment}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Proceed to Payment
            </button>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="mt-2 px-6 py-2 bg-gray-400 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeatCard;
