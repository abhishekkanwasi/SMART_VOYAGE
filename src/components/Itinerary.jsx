export default function Itinerary({ destination }) {
  const sampleItinerary = [
    { day: "Day 1", activity: "🛫 Arrival & City Tour" },
    { day: "Day 2", activity: "🏛️ Visit Historical Sites" },
    { day: "Day 3", activity: "🏞️ Nature & Adventure" },
    { day: "Day 4", activity: "🍽️ Food & Culture" },
    { day: "Day 5", activity: "🏖️ Relax & Depart" },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2">Suggested Itinerary</h3>
      <ul className="timeline timeline-vertical">
        {sampleItinerary.map((item, index) => (
          <li key={index} className="timeline-item">
            <div className="timeline-badge bg-blue-500 text-white">{item.day}</div>
            <div className="timeline-content p-4 bg-gray-800 rounded-lg">{item.activity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
