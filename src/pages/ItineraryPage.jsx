import { useParams } from "react-router-dom";
import { useState } from "react";
import { generateItinerary } from "../utils/generateItinerary";
import Navbar from "../components/Navbar";

export default function ItineraryPage() {
  const { destination } = useParams();
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setItinerary("");
    try {
      const result = await generateItinerary(destination, days);
      setItinerary(result);
    } catch (err) {
      setError("Failed to generate itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Generate Itinerary for {destination}
        </h2>
        <div className="mb-4 flex flex-col items-center">
          <label className="mb-2 text-lg">Number of Days:</label>
          <input
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="p-2 rounded text-black w-32 text-center"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="btn btn-primary w-full py-2 text-lg font-semibold rounded mb-4"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {itinerary && (
          <div className="mt-6 whitespace-pre-line bg-gray-700 p-4 rounded">
            {itinerary}
          </div>
        )}
      </div>
    </div>
  );
}
