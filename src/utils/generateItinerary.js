import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export async function generateItinerary(destination, days) {
  try {
    const prompt = `Generate a detailed ${days}-day travel itinerary for ${destination}. Include morning, afternoon, and evening activities each day. Focus on famous attractions, local food, and unique experiences.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Sorry, we couldn't generate the itinerary. Please try again.";
  }
}