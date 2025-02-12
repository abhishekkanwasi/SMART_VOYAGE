import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import Itinerary from "../components/Itinerary";

const API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";

export default function Results() {
  const { destination } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          const placeId = data.results[0].place_id;
          const detailsResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${API_KEY}`
          );
          const detailsData = await detailsResponse.json();
          setReviews(detailsData.result.reviews || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [destination]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{destination}</h2>
      {loading ? <p>Loading reviews...</p> : <Reviews reviews={reviews} />}
      <Itinerary destination={destination} />
    </div>
  );
}
