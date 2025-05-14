import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 border-b border-cyan-200 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img src="/logo.png" alt="Logo" className="h-12 w-12" />
            <span className="text-white text-xl sm:text-2xl font-bold tracking-wide drop-shadow-sm">
              Smart Voyage
            </span>
          </Link>

          {/* Burger Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex items-center space-x-8 text-white text-lg font-semibold">
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
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="sm:hidden px-4 pb-4">
            <ul className="flex flex-col space-y-4 text-white text-base font-medium">
              <li>
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/nearby-locations"
                  onClick={closeMenu}
                  className="flex items-center gap-2"
                >
                  <FaMapMarkerAlt /> Nearby Locations
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="flex items-center gap-2"
                >
                  <FaInfoCircle /> About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex items-center gap-2"
                >
                  <FaEnvelope /> Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Push content below fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
