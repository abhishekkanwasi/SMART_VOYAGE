import Navbar from "../components/Navbar";
import {
  FaGlobeAmericas,
  FaBrain,
  FaListAlt,
  FaMapMarkedAlt,
  FaCogs,
  FaCode,
  FaUserAlt,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6 text-center">
          About Smart Voyage
        </h2>

        {/* Project Overview */}
        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6 rounded-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaGlobeAmericas className="text-blue-400" />
            Project Overview
          </h3>
          <p>
            <strong>Smart Voyage</strong> is an AI-powered travel assistant that helps users explore, understand, and plan trips with ease. It generates intelligent destination summaries, reviews, and travel itineraries using natural language processing and third-party data like Wikipedia and location services.
          </p>
        </div>

        {/* Core Features */}
        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6 rounded-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaListAlt className="text-green-400" />
            Core Features
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Destination Overview:</strong> AI-generated description of a place, including a link to Wikipedia.
            </li>
            <li>
              <strong>AI Review Summary:</strong> Summarizes multiple user reviews using AI.
            </li>
            <li>
              <strong>Genuine Reviews:</strong> Displays unaltered reviews from users.
            </li>
            <li>
              <strong>Generate Itinerary:</strong> Enter travel days and get a smart itinerary.
            </li>
            <li>
              <strong>Nearby Locations:</strong> Explore places near your selected destination.
            </li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6 rounded-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaBrain className="text-yellow-400" />
            How It Works
          </h3>
          <p>
            Users search for a destination using the input field on the home page. The system fetches data including an AI-generated overview, review summaries, and itinerary suggestions. The "Nearby Locations" tool allows quick discovery of nearby attractions.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6 rounded-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaCode className="text-purple-400" />
            Tech Stack
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>React.js</strong> — Frontend Framework</li>
            <li><strong>React Router</strong> — Navigation & Routing</li>
            <li><strong>Tailwind CSS</strong> — Utility-first CSS Framework</li>
            <li><strong>React Icons</strong> — Icon Library</li>
            <li><strong>gemini-1.5-flash</strong> — Itinerary generation</li>
            <li><strong>Wikipedia API</strong> — For destination data</li>
            <li><strong>Google Maps APIs</strong> — For review summaries & For nearby place suggestions</li>
          </ul>
        </div>

        {/* Author */}
        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6 rounded-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaUserAlt className="text-pink-400" />
            Project By
          </h3>
          <ul className="list-disc pl-6">
            <li>Abhishek</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
