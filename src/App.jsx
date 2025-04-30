import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import NearbyLocations from "./pages/NearbyLocations";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:destination" element={<Results />} />
        <Route path="/nearby-locations" element={<NearbyLocations />} />
      </Routes>
    </div>
  );
}
