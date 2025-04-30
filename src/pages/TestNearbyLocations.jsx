import { useEffect, useState } from "react";
import { findNearbyLocations } from "../utils/testNearbyLocations";

export default function TestNearbyLocations() {
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNearbyLocations() {
      const API_KEY = "AIzaSyA3Xy3Ju5mTnbkUxNwFL36dMrDoJqqXIMY";
      const placeName = "Shimla"; // Test location

      try {
        const locations = await findNearbyLocations(API_KEY, placeName);
        setNearbyLocations(locations);
      } catch (error) {
        console.error("Error fetching nearby locations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNearbyLocations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Test Nearby Locations for Shimla</h1>
      {loading ? (
        <p>Loading nearby locations...</p>
      ) : (
        <ul className="list-disc pl-5">
          {nearbyLocations.map((location, index) => (
            <li key={index} className="mb-2">
              <strong>{location.name}</strong> - {location.vicinity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}