/* eslint-disable react/prop-types */
// BeatContext.js
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

const BeatContext = createContext();

export const BeatProvider = ({ children }) => {
  const [beats, setBeats] = useState([]);

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const response = await api.get("/api/beats");
        setBeats(response.data);
      } catch (error) {
        console.error("Failed to fetch beats", error);
      }
    };
    fetchBeats();
  }, []);

  return (
    <BeatContext.Provider value={{ beats }}>{children}</BeatContext.Provider>
  );
};

export default BeatContext;
