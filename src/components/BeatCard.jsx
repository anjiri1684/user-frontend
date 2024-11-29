/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const BeatCard = ({ track }) => {
  const [playing, setPlaying] = useState(false);
  const [wave, setWave] = useState(null);

  const togglePlay = () => {
    if (wave) {
      if (playing) {
        wave.pause();
      } else {
        wave.play();
      }
      setPlaying(!playing);
    }
  };

  useEffect(() => {
    if (track.audioUrl) {
      const newWave = WaveSurfer.create({
        container: `#waveform-${track.id}`,
        waveColor: "gray",
        progressColor: "black",
        cursorColor: "transparent",
        height: 50,
        barWidth: 2,
      });
      newWave.load(track.audioUrl);
      setWave(newWave);

      return () => {
        newWave.destroy();
      };
    }
  }, [track.audioUrl]);

  if (!track.audioUrl) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center">
        <p className="text-gray-400">Audio not available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center">
      <img
        src={track.image || "https://placehold.co/60x60"}
        alt={track.title}
        className="w-16 h-16 rounded mr-4"
      />
      <div className="flex-1">
        <h4 className="text-xl font-bold">{track.title}</h4>
        <p className="text-gray-400">{track.artist}</p>
        <p className="text-gray-400">{track.genre}</p>
      </div>
      <div className="flex items-center">
        <div id={`waveform-${track.id}`} className="w-48 h-8 mr-4"></div>
        <button className="text-white mx-1" onClick={togglePlay}>
          {playing ? "Pause" : "Play"}
        </button>
        <button
          className="text-white mx-1"
          onClick={() => console.log("Liked track", track.id)}
        >
          ♥
        </button>
        <button
          className="text-white mx-1"
          onClick={() => console.log("Downloaded track", track.id)}
        >
          ↓
        </button>
        <button
          className="text-white mx-1"
          onClick={() => navigator.clipboard.writeText(track.link)}
        >
          🔗
        </button>
      </div>
    </div>
  );
};

export default BeatCard;
