import React, { useEffect, useState } from "react";
import { generateReviews } from "../utils/generateItinerary";

const Results = ({ destination }) => {
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const generatedReviews = await generateReviews(destination);
      setReviews(generatedReviews);
    };

    fetchReviews();
  }, [destination]);

  return (
    <div>
      <section className="destination-reviews">
        <h2>Destination Reviews</h2>
        {reviews ? (
          <p>{reviews}</p>
        ) : (
          <p>Loading reviews...</p>
        )}
      </section>
    </div>
  );
};

export default Results;