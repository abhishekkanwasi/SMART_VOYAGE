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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Smart Voyage</h1>
      <input
        type="text"
        placeholder="Enter destination..."
        className="p-3 w-80 rounded-lg text-black"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
