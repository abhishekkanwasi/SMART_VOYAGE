import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaHome,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

export default function Home() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleTravel = () => {
    if (destination.trim() !== "") {
      navigate(`/results/${encodeURIComponent(destination)}`);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Navbar />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative bg-white bg-opacity-10 backdrop-blur-3xl shadow-2xl w-full sm:w-4/5 md:w-3/4 h-full sm:h-[90%] md:h-3/4 flex flex-col items-center text-center p-4 sm:p-6 rounded-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

          {/* Navigation */}
         

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTravel();
            }}
            className="flex flex-col items-center justify-center flex-grow z-10 w-full"
          >
            <div className="mb-8 text-center px-2">
              <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-bold font-serif leading-snug">
                Plan Your Next Adventure
              </h1>
            </div>

            <input
              type="text"
              placeholder="Enter destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 text-base sm:text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-gray-300 w-11/12 sm:w-3/4 md:w-2/3"
            />

            <button
              type="submit"
              className="mt-4 px-5 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white text-base sm:text-lg font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Travel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
