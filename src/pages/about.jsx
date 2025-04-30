import Navbar from "../components/Navbar"; // Import the Navbar component

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* Include the Navbar at the top */}

      <div className="p-6">
        <h2 className="text-4xl font-bold mb-4 text-center">About Smart Voyage</h2>

        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Project Overview</h3>
          <p>
            Smart Voyage is an AI-powered platform designed to provide users with personalized travel recommendations. Whether you're looking for a relaxing beach getaway or an adventurous mountain trek, Smart Voyage offers tailored suggestions to help you find the perfect destination for your travel needs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
          <p>
            Users can enter the name of a destination or a specific theme (e.g., adventure, relaxation), and the platform will generate recommendations based on past user reviews and AI algorithms. Additionally, the AI can generate personalized itineraries based on the chosen destination and duration.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p>
            Our mission is to make travel planning as easy and enjoyable as possible. We aim to provide users with up-to-date information, personalized recommendations, and an efficient way to plan their trips, all while ensuring an enjoyable experience.
          </p>
        </div>
      </div>
    </div>
  );
}
