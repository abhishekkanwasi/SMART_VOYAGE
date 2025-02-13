import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination.trim() !== "") {
      navigate(`/results/${encodeURIComponent(destination)}`);
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Large Frosted Glass Box */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative bg-opacity-30 backdrop-blur-2xl shadow-lg w-3/4 h-3/4 flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-6xl font-bold text-white mb-6">🌍 Smart Voyage</h1>
          <p className="text-xl text-gray-300 mb-6">Find the best travel reviews & itinerary</p>
          
          {/* Search Bar */}
          <input 
            type="text"
            className="w-1/2 p-3 text-black placeholder-gray-600 bg-white bg-opacity-80 border-none focus:ring-2 focus:ring-white"
            placeholder="Enter your destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            className="mt-4 px-6 py-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
