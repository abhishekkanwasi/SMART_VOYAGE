import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import { generateItinerary } from "../utils/generateItinerary";

export default function Results() {
  const { destination } = useParams();
  const [reviews, setReviews] = useState([]);
  const [itinerary, setItinerary] = useState("");
  const [days, setDays] = useState(3); // Default: 3-day trip
  const [loading, setLoading] = useState(true);
  const [loadingItinerary, setLoadingItinerary] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(destination)}&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.query.search.length > 0) {
          const pageTitle = searchData.query.search[0].title;
          const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
          const summaryResponse = await fetch(summaryUrl);
          const summaryData = await summaryResponse.json();

          if (summaryData.extract) {
            setReviews([{ label: summaryData.extract, link: summaryData.content_urls.desktop.page }]);
          } else {
            setReviews([{ label: "No Wikipedia summary available." }]);
          }
        } else {
          setReviews([{ label: "No Wikipedia information found." }]);
        }
      } catch (error) {
        console.error("Error fetching Wikipedia summary:", error);
        setReviews([{ label: "Error fetching data." }]);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [destination]);

  // Function to generate AI itinerary
  const handleGenerateItinerary = async () => {
    setLoadingItinerary(true);
    const result = await generateItinerary(destination, days);
    setItinerary(result);
    setLoadingItinerary(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-4xl font-bold mb-4 text-center">{destination}</h2>

      {loading ? (
        <p className="text-center">Loading information...</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="card bg-gray-800 shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-2">About This Destination</h3>
            <Reviews reviews={reviews} />
          </div>

          {/* User Inputs for AI Itinerary */}
          <div className="card bg-gray-700 shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Generate AI Itinerary</h3>
            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="input input-bordered text-black w-full p-3 mb-4"
              placeholder="Enter number of days"
            />
            <button
              onClick={handleGenerateItinerary}
              className="btn btn-primary w-full px-6 py-3 rounded-lg"
            >
              {loadingItinerary ? "Generating..." : "Generate Itinerary"}
            </button>
          </div>

          {/* Display AI-Generated Itinerary */}
          {itinerary && (
            <div className="card bg-gray-800 shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">AI-Generated Itinerary</h3>
              <p className="whitespace-pre-line">{itinerary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
