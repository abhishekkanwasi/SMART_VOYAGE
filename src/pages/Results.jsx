import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import { generateItinerary } from "../utils/generateItinerary";
import Navbar from "../components/Navbar"; // <-- Step 1: Import the Navbar
import { Client } from "@googlemaps/google-maps-services-js";

export default function Results() {
  const { destination } = useParams();
  const [reviews, setReviews] = useState([]);
  const [itinerary, setItinerary] = useState("");
  const [days, setDays] = useState(3); // Default: 3-day trip
  const [loading, setLoading] = useState(true);
  const [loadingItinerary, setLoadingItinerary] = useState(false);
  const [googleSummary, setGoogleSummary] = useState("");
  const [testApiResponse, setTestApiResponse] = useState(null); // State to store API response

  useEffect(() => {
    async function fetchReviews() {
      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
          destination
        )}&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.query.search.length > 0) {
          const pageTitle = searchData.query.search[0].title;
          const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            pageTitle
          )}`;
          const summaryResponse = await fetch(summaryUrl);
          const summaryData = await summaryResponse.json();

          if (summaryData.extract) {
            setReviews([
              {
                label: summaryData.extract,
                link: summaryData.content_urls.desktop.page,
              },
            ]);
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

  useEffect(() => {
    async function fetchGoogleReviews() {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const client = new Client({});

      try {
        // Get the place ID for the given destination
        const placesResult = await client.textSearch({
          params: {
            query: destination,
            key: API_KEY,
          },
        });

        if (
          !placesResult.data.results ||
          placesResult.data.results.length === 0
        ) {
          console.log("No results found for the given destination.");
          return;
        }

        const placeId = placesResult.data.results[0].place_id;

        // Get detailed information about the place, including reviews
        const placeDetails = await client.placeDetails({
          params: {
            place_id: placeId,
            key: API_KEY,
          },
        });

        if (!placeDetails.data.result.reviews) {
          console.log("No reviews available for this destination.");
          return;
        }

        // Extract reviews and ratings
        const reviews = placeDetails.data.result.reviews.map((review) => ({
          rating: review.rating,
          text: review.text,
        }));

        // Log reviews to the VS Code terminal
        reviews.forEach((review) => {
          console.log(`Rating: ${review.rating}, Review: ${review.text}`);
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchGoogleReviews();
  }, [destination]);

  useEffect(() => {
    async function testAPI() {
      const response = await testGooglePlacesAPI("New York");
      setTestApiResponse(response); // Store the response in state
    }

    testAPI();
  }, []);

  const handleGenerateItinerary = async () => {
    setLoadingItinerary(true);
    const result = await generateItinerary(destination, days);
    setItinerary(result);
    setLoadingItinerary(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* <-- Step 2: Use the Navbar at the top */}
      <div className="p-6">
        <h2 className="text-4xl font-bold mb-4 text-center">{destination}</h2>

        {loading ? (
          <p className="text-center">Loading information...</p>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="card bg-gray-800 shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                About This Destination
              </h3>
              <Reviews reviews={reviews} />
            </div>

            {/* Summarized Review Section */}
            <div className="card bg-gray-800 shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Summarized Reviews
              </h3>
              {googleSummary ? (
                <pre className="whitespace-pre-wrap text-sm">
                  {googleSummary}
                </pre>
              ) : (
                <p>Loading reviews...</p>
              )}
            </div>

            {/* Temporary Section to Display API Test Response */}
            <div className="card bg-gray-800 shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-2">API Test Response</h3>
              {testApiResponse ? (
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(testApiResponse, null, 2)}
                </pre>
              ) : (
                <p>Loading API response...</p>
              )}
            </div>

            <div className="card bg-gray-700 shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">
                Generate AI Itinerary
              </h3>
              <input
                type="number"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="input input-bordered text-white w-full p-3 mb-4"
                placeholder="Enter number of days"
              />
              <button
                onClick={handleGenerateItinerary}
                className="btn btn-primary w-full px-6 py-3 rounded-lg"
              >
                {loadingItinerary ? "Generating..." : "Generate Itinerary"}
              </button>
            </div>

            {itinerary && (
              <div className="card bg-gray-800 shadow-lg p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  AI-Generated Itinerary
                </h3>
                <p className="whitespace-pre-line">{itinerary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
