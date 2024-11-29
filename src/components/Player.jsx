/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const Player = ({ url, play }) => {
  const wavesurferRef = useRef(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      waveColor: "violet",
      progressColor: "purple",
    });

    wavesurfer.load(url);

    if (play) {
      wavesurfer.play();
    } else {
      wavesurfer.pause();
    }

    return () => {
      wavesurfer.destroy();
    };
  }, [url, play]);

  return <div ref={wavesurferRef}></div>;
};

export default Player;
