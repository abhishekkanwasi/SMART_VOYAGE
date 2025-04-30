import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Updated to use the new API key from the environment variable

export async function getGooglePlacesReviews(destination) {
  if (!API_KEY) {
    console.error(
      "API Key is missing. Make sure your .env file is set up correctly."
    );
    return [];
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: destination,
          key: API_KEY,
        },
      }
    );

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const placeId = response.data.results[0].place_id;

      const detailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: API_KEY,
            fields: "review",
          },
        }
      );

      if (
        detailsResponse.data &&
        detailsResponse.data.result &&
        detailsResponse.data.result.reviews
      ) {
        return detailsResponse.data.result.reviews.map((review) => review.text);
      }
    }

    return [];
  } catch (error) {
    console.error("Error fetching Google Places reviews:", error);
    return [];
  }
}

export async function getGooglePlacesSummary(destination) {
  // Simulate a summarized review using the same LLM used for itinerary generation
  return `The destination ${destination} is highly rated for its scenic beauty, vibrant culture, and historical significance. Visitors often praise its friendly locals and diverse attractions, making it a must-visit location.`;
}

export async function summarizeReviews(reviews) {
  if (!API_KEY) {
    console.error(
      "API Key is missing. Make sure your .env file is set up correctly."
    );
    return "Error: Missing API Key";
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `generarte a summarized review of the imported reviews.:
${reviews.join("\n")}`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response || "No summary found.";
  } catch (error) {
    console.error("Error summarizing reviews:", error);
    return "Error summarizing reviews.";
  }
}

export async function testGooglePlacesAPI(destination) {
  if (!API_KEY) {
    console.error(
      "API Key is missing. Make sure your .env file is set up correctly."
    );
    return "Error: Missing API Key";
  }

  try {
    console.log("Testing Google Places API with destination:", destination);

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: destination,
          key: API_KEY,
        },
      }
    );

    console.log("Google Places API Text Search Response:", response.data);

    if (response.data && response.data.results) {
      return response.data.results;
    } else {
      console.error("No results found in Google Places API response.");
      return "No results found.";
    }
  } catch (error) {
    console.error("Error testing Google Places API:", error);
    return "Error testing Google Places API.";
  }
}

export async function findNearbyLocations(apiKey, placeName) {
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
      return [];
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
      return [];
    }

    return nearbyResult.data.results.map((location) => ({
      name: location.name,
      vicinity: location.vicinity,
    }));
  } catch (error) {
    console.error("Error fetching nearby locations:", error);
    return [];
  }
}
