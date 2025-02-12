export default function Reviews({ reviews }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-2">About This Destination</h3>
        {reviews.length === 0 ? (
          <p>No information found.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
              <p>{review.label}</p>
              {review.link && (
                <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  Read more on Wikipedia
                </a>
              )}
            </div>
          ))
        )}
      </div>
    );
  }
  