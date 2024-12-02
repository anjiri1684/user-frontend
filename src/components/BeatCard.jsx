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

const BeatCard = ({ beat }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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

  const handlePlayPause = () => {
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
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

  const startDownload = async () => {
    try {
      setIsDownloading(true);

      // Log the beat ID to verify it's the correct one
      console.log("Starting download for beat ID:", beat.id);

      // Call the backend to get the download URL
      const response = await axios.get(`/api/download/${beat.id}`);

      // Log the response to verify the URL
      console.log("Download URL:", response.data.downloadUrl);

      const downloadUrl = response.data.downloadUrl;

      // Ensure the download URL is valid
      if (!downloadUrl) {
        throw new Error("Download URL not found.");
      }

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = beat.name || "beat-file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading beat:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (beat?.price > 0 && !beat?.isPaidSuccessfully) {
      // Show modal to inform user that payment is required
      setShowDownloadModal(true);
    } else {
      // Proceed with download if it's free or paid
      startDownload();
    }
  };

  const handleProceedToPayment = async () => {
    addToCart(beat); // Add the beat to the cart
    navigate("/checkout"); // Proceed to checkout page
    setShowDownloadModal(false); // Close modal
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
      alert("Failed to add to playlist.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "beats/" + beat.title);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="beat-card p-6 bg-gray-800 text-white rounded-lg shadow-xl flex flex-col md:flex-row items-center mb-7">
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
        className="waveform flex-grow h-24  rounded-lg mx-2"
      >
        {isLoading && <p>Loading...</p>}
      </div>
      <div className="beat-controls flex space-x-4">
        <button
          onClick={handlePlayPause}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
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
        <div className="modal fixed inset-0 bg-[#001a33] bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content bg-white p-8 rounded-lg shadow-xl w-96">
            <h3 className="text-2xl font-semibold text-slate-50 mb-4">
              To Download, Purchase the Beat
            </h3>
            <p className="text-sm text-slate-50 mb-6">
              You need to purchase this beat before downloading.
            </p>
            <button
              onClick={handleProceedToPayment}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Go to Payment
            </button>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition ml-4"
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
