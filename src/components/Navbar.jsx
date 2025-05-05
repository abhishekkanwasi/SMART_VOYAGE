import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/react.svg"; // You can replace with '../public/logo.png' if you want your own logo

export default function Navbar() {
  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between px-0 py-3 shadow-lg z-50 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 border-b border-cyan-200"
        style={{ boxShadow: "0 4px 24px 0 rgba(0, 176, 255, 0.10)" }}
      >
        <div className="pl-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-14 w-14" />
            <span className="text-white text-2xl font-bold tracking-wide drop-shadow-sm">
              Smart Voyage
            </span>
          </Link>
        </div>
        <ul className="flex items-center space-x-8 text-white text-lg font-semibold pr-8">
          <li>
            <Link to="/" className="hover:underline flex items-center gap-2">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/nearby-locations"
              className="hover:underline flex items-center gap-2"
            >
              <FaMapMarkerAlt /> Nearby Locations
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:underline flex items-center gap-2"
            >
              <FaInfoCircle /> About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:underline flex items-center gap-2"
            >
              <FaEnvelope /> Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-20"></div>
    </>
  );
}
