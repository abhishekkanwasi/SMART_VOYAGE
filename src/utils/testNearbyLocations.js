import { Client } from "@googlemaps/google-maps-services-js";

const API_KEY = "AIzaSyA3Xy3Ju5mTnbkUxNwFL36dMrDoJqqXIMY";
const PLACE_NAME = "shimla";

async function findNearbyLocations(apiKey, placeName) {
  const client = new Client({});

  try {
    // Get the place ID and coordinates for the given place name
    const placesResult = await client.textSearch({
      params: {
        query: placeName,
        key: apiKey,
      },
    });

    if (!placesResult.data.results || placesResult.data.results.length === 0) {
      console.log("No results found for the given place name");
      return;
    }

    const place = placesResult.data.results[0];
    const { lat, lng } = place.geometry.location;

    console.log(
      `Coordinates of ${placeName}: Latitude ${lat}, Longitude ${lng}`
    );

    // Find nearby locations using the coordinates
    const nearbyResult = await client.placesNearby({
      params: {
        location: { lat, lng },
        radius: 5000, // Radius in meters
        key: apiKey,
      },
    });

    if (!nearbyResult.data.results || nearbyResult.data.results.length === 0) {
      console.log("No nearby locations found");
      return;
    }

    console.log(`Nearby locations for ${placeName}:`);
    nearbyResult.data.results.forEach((location, index) => {
      console.log(`${index + 1}. ${location.name} - ${location.vicinity}`);
    });
  } catch (error) {
    console.error("Error fetching nearby locations:", error);
  }
}

findNearbyLocations(API_KEY, PLACE_NAME);
