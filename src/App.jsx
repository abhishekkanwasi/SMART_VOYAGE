import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import ItineraryPage from "./pages/ItineraryPage";
import NearbyLocations from "./pages/NearbyLocations";
import About from "./pages/about";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:destination" element={<Results />} />
        <Route path="/itinerary/:destination" element={<ItineraryPage />} />
        <Route path="/nearby-locations" element={<NearbyLocations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
