import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative bg-white bg-opacity-10 backdrop-blur-3xl shadow-2xl w-3/4 h-3/4 flex flex-col items-center text-center p-6 rounded-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
          <nav className="w-full flex justify-between items-center px-3 py-2 z-10">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-3" />
              <h1 className="text-white text-2xl font-bold">Smart Voyage</h1>
            </div>
            <ul className="flex space-x-8 text-white">
              <li>
                <a href="/" className="hover:underline flex items-center gap-2">
                  <FaHome /> Home
                </a>
              </li>
              <li>
                <a
                  href="/nearby-locations"
                  className="hover:underline flex items-center gap-2"
                >
                  <FaMapMarkerAlt /> Nearby Locations
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:underline flex items-center gap-2"
                >
                  <FaInfoCircle /> About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline flex items-center gap-2"
                >
                  <FaEnvelope /> Contact
                </a>
              </li>
            </ul>
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTravel();
            }}
            className="flex flex-col items-center justify-center flex-grow z-10 w-full"
          >
            <div className="flex items-center justify-center mb-10 animate-bounce-in">
              <h1 className="text-white text-7xl font-bold font-serif">
                Plan Your Next Adventure
              </h1>
            </div>
            <input
              type="text"
              placeholder="Enter destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-gray-300 w-3/4"
            />
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Travel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
