import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateItinerary(destination, days) {
  const apiKey = import.meta.env.VITE_API_KEY; // Load API key

  console.log("Loaded API Key:", apiKey); // Debugging log

  if (!apiKey) {
    console.error("API Key is missing. Make sure your .env file is set up correctly.");
    return "Error: Missing API Key";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a ${days}-day travel itinerary for ${destination}. Include top attractions and activities.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response || "No itinerary found.";
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Error generating itinerary.";
  }
}
