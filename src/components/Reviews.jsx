export default function Reviews({ reviews }) {
  return (
    <div>
      {reviews.length === 0 ? (
        <p>No information found.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2 border-l-4 border-blue-500">
            <p>{review.label}</p>
            {review.link && (
              <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline block mt-2">
                Read more on Wikipedia →
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}
