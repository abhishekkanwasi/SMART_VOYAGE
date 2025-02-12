export default function Itinerary({ destination }) {
    const sampleItinerary = [
      "🛫 Day 1: Arrival & City Tour",
      "🏛️ Day 2: Visit Historical Sites",
      "🏞️ Day 3: Nature & Adventure",
      "🍽️ Day 4: Food & Culture",
      "🏖️ Day 5: Relax & Depart",
    ];
  
    return (
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2">Suggested Itinerary</h3>
        <ul className="list-disc pl-6">
          {sampleItinerary.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  