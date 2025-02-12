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
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Box */}
      <div className="relative bg-black bg-opacity-60 p-8 rounded-lg text-center z-10 w-full max-w-lg shadow-lg">
        <h1 className="text-5xl font-bold text-white mb-6">🌍 Smart Voyage</h1>
        <p className="text-lg text-gray-300 mb-6">Find the best travel reviews & itinerary</p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="text"
            placeholder="Enter destination..."
            className="input input-bordered text-white placeholder-gray-300 w-full sm:w-80 p-3 rounded-lg bg-gray-800 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary w-full sm:w-auto px-6 py-3 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
