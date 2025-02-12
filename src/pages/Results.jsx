import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import Itinerary from "../components/Itinerary";

export default function Results() {
  const { destination } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // Step 1: Find the correct Wikipedia page ID
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
          destination
        )}&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.query.search.length > 0) {
          const pageTitle = searchData.query.search[0].title; // Best match title

          // Step 2: Use the correct Wikipedia Page Title to fetch the summary
          const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
          const summaryResponse = await fetch(summaryUrl);
          const summaryData = await summaryResponse.json();

          if (summaryData.extract) {
            setReviews([
              { label: summaryData.extract, link: summaryData.content_urls.desktop.page },
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{destination}</h2>
      {loading ? <p>Loading information...</p> : <Reviews reviews={reviews} />}
      <Itinerary destination={destination} />
    </div>
  );
}
