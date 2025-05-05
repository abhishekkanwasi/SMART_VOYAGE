import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateReviews(destination) {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    console.error(
      "API Key is missing. Make sure your .env file is set up correctly."
    );
    return "Error: Missing API Key";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Add instruction for reviewer names to match the destination's region
    const prompt = `Generate 5 realistic, short traveler reviews for ${destination}. Each review should be concise (2-3 sentences), include a rating out of 5 stars, the visitor's name, and their experience.\nIf the destination is in India, use Indian names for the reviewers and don't use same names everytime. For other destinations, use names that are common in that region.\nFormat each review with the following structure:\n- Reviewer Name\n- Rating: X/5\n- Review text`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response || "No reviews available.";
  } catch (error) {
    console.error("Error generating reviews:", error);
    return "Error generating reviews.";
  }
}
