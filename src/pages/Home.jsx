import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleTravel = () => {
    if (destination.trim() !== "") {
      navigate(`/results/${encodeURIComponent(destination)}`);
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Frosted Glass Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative bg-white bg-opacity-10 backdrop-blur-3xl shadow-2xl  w-3/4 h-3/4 flex flex-col items-center text-center p-6 rounded-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Navigation Bar Inside the Glass Box */}
          <nav className="w-full flex justify-between items-center px-3 py-2">
            <h1 className="text-white text-xl font-bold">Smart Voyage</h1>
            <ul className="flex space-x-8 text-white">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Destinations</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </nav>

          {/* Main Content Inside Glass Box */}
          <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-white text-6xl font-bold font-serif mb-10">Plan Your Next Adventure</h1>

            <input 
              type="text" 
              placeholder="Enter destination..." 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-gray-300 w-3/4"
            />
            <button 
              onClick={handleTravel} 
              className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Travel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
