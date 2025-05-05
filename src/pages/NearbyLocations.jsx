import { useState } from "react";
import Navbar from "../components/Navbar";
import { findNearbyLocations } from "../utils/googlePlaces";

export default function NearbyLocations() {
  const [destination, setDestination] = useState("");
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNearbyLocations([]);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const locations = await findNearbyLocations(apiKey, destination);
      setNearbyLocations(locations);
      if (locations.length === 0) setError("No nearby locations found.");
    } catch (err) {
      setError("Failed to fetch nearby locations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Find Nearby Locations
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center mb-6"
        >
          <input
            type="text"
            placeholder="Enter a destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-2 rounded text-black w-full mb-4 text-center"
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full py-2 text-lg font-semibold rounded disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Nearby Locations"}
          </button>
        </form>
        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        {nearbyLocations.length > 0 && (
          <ul className="list-disc pl-5">
            {nearbyLocations.map((location, idx) => (
              <li key={idx} className="mb-2">
                <strong>* {location.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
