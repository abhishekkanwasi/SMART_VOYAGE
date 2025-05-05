import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import Navbar from "../components/Navbar";
import { generateReviews } from "../utils/generateReviews";
import { summarizeReviews } from "../utils/googlePlaces";

export default function Results() {
  const { destination } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiReviews, setAiReviews] = useState("");
  const [loadingAiReviews, setLoadingAiReviews] = useState(false);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [positiveReviews, setPositiveReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);

  // Fetch Wikipedia information
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

  // Generate AI Reviews
  useEffect(() => {
    const fetchAIReviews = async () => {
      if (!destination) return;

      setLoadingAiReviews(true);
      try {
        const generatedReviews = await generateReviews(destination);
        setAiReviews(generatedReviews);
        // Split reviews into positive and negative
        const reviewsArr = generatedReviews
          .replace(/\*/g, "")
          .split(/\n{2,}/)
          .filter(Boolean);
        const positives = [];
        const negatives = [];
        reviewsArr.forEach((review) => {
          const lower = review.toLowerCase();
          if (
            lower.includes("1/5") ||
            lower.includes("2/5") ||
            lower.includes("bad") ||
            lower.includes("poor") ||
            lower.includes("negative") ||
            lower.includes("disappoint") ||
            lower.includes("not recommend")
          ) {
            negatives.push(review);
          } else if (
            lower.includes("4/5") ||
            lower.includes("5/5") ||
            lower.includes("excellent") ||
            lower.includes("amazing") ||
            lower.includes("great") ||
            lower.includes("wonderful") ||
            lower.includes("positive") ||
            lower.includes("enjoyed")
          ) {
            positives.push(review);
          } else {
            // If not clear, default to positive
            positives.push(review);
          }
        });
        setPositiveReviews(positives);
        setNegativeReviews(negatives);
        // Summarize the AI-generated reviews
        setLoadingSummary(true);
        const summaryText = await summarizeReviews([generatedReviews]);
        setSummary(summaryText);
      } catch (error) {
        console.error("Error generating AI reviews:", error);
        setAiReviews("Failed to generate reviews.");
        setSummary("");
        setPositiveReviews([]);
        setNegativeReviews([]);
      } finally {
        setLoadingAiReviews(false);
        setLoadingSummary(false);
      }
    };

    fetchAIReviews();
  }, [destination]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4 relative">
          <h2 className="text-4xl font-bold mx-auto absolute left-1/2 -translate-x-1/2 w-max text-center mt-8 mb-8">
            {destination}
          </h2>
        </div>
        <div className="h-10" />

        {loading ? (
          <p className="text-center">Loading information...</p>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="card bg-gray-800 shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                About This Destination
              </h3>
              <Reviews reviews={reviews.slice(0, 1)} />
            </div>

            <div className="card bg-gray-800 shadow-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-2">Summarized Review</h3>
              {loadingSummary ? (
                <div className="animate-pulse text-gray-400">
                  Summarizing reviews...
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-300">
                    {summary}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center mb-4 max-w-3xl mx-auto">
              <span
                className="cursor-pointer text-blue-700 underline text-base font-medium select-none mr-4"
                onClick={() => setShowReviews((prev) => !prev)}
                style={{ paddingLeft: 0 }}
              >
                {showReviews ? "Hide Reviews" : "View Reviews"}
              </span>
              <span className="text-gray-500 text-sm">
                (Genuine traveler experiences)
              </span>
            </div>
            {showReviews && (
              <div className="card bg-gray-800 shadow-lg p-6 mb-6 max-w-3xl mx-auto">
                {loadingAiReviews ? (
                  <div className="animate-pulse text-gray-400 text-left mb-4">
                    Generating authentic reviews...
                  </div>
                ) : (
                  <div className="space-y-8 text-left">
                    {[...positiveReviews, ...negativeReviews].length > 0 ? (
                      [...positiveReviews, ...negativeReviews].map(
                        (review, idx) => {
                          // Try to extract reviewer name (look for '- Rating:' or first line)
                          const lines = review
                            .split("\n")
                            .map((l) => l.trim())
                            .filter(Boolean);
                          let reviewer = "Reviewer";
                          let reviewTextLines = lines;
                          // Look for a line like '- Reviewer Name' or 'Reviewer Name - Rating:'
                          if (lines.length > 0) {
                            // If the first line starts with '-', remove it
                            let firstLine = lines[0]
                              .replace(/^[-\s]+/, "")
                              .trim();
                            // If the first line contains 'Rating:', split and take the left part as name
                            if (/Rating:/i.test(firstLine)) {
                              reviewer = firstLine
                                .split(/Rating:/i)[0]
                                .replace(/[-\s]+$/, "")
                                .trim();
                              reviewTextLines = [
                                firstLine.split(/Rating:/i)[1].trim(),
                                ...lines.slice(1),
                              ];
                            } else if (firstLine.length > 0) {
                              reviewer = firstLine;
                              reviewTextLines = lines.slice(1);
                            }
                          }
                          return (
                            <div
                              key={idx}
                              className="bg-gray-100 rounded-lg p-4 shadow-sm mb-2"
                            >
                              <div className="font-semibold text-blue-800 mb-1">
                                {reviewer}
                              </div>
                              {reviewTextLines.map((line, i) => (
                                <div
                                  key={i}
                                  className="text-gray-800 text-base leading-relaxed"
                                >
                                  {line}
                                </div>
                              ))}
                            </div>
                          );
                        }
                      )
                    ) : (
                      <div className="text-gray-500">No reviews available.</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Link
        to={`/itinerary/${destination}`}
        className="btn btn-primary fixed bottom-8 right-8 px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        style={{ minWidth: "200px" }}
      >
        Generate Itinerary
      </Link>
    </div>
  );
}
