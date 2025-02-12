export default function Reviews({ reviews }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-2">Top Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
              <p className="text-yellow-400">⭐ {review.rating}</p>
              <p className="italic">"{review.text}"</p>
              <p className="text-sm text-gray-400">- {review.author_name}</p>
            </div>
          ))
        )}
      </div>
    );
  }
  