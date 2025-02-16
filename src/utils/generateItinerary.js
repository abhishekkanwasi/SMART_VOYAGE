export async function generateItinerary(destination, days) {
  const apiKey = import.meta.env.VITE_API_KEY; // Get API key from .env
  if (!apiKey) {
    console.error("API Key is missing. Make sure your .env file is set up correctly.");
    return "Error: Missing API Key";
  }

  try {
    const response = await fetch("https://api.example.com/generate-itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // Attach API Key
      },
      body: JSON.stringify({ destination, days }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching itinerary: ${response.statusText}`);
    }

    const data = await response.json();
    return data.itinerary || "No itinerary found.";
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Error generating itinerary.";
  }
}
console.log("Loaded API Key:", import.meta.env.VITE_API_KEY);

