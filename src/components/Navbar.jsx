import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-gray-900 fixed top-0 w-full flex justify-between items-center px-6 py-4 shadow-lg z-50">
        <h1 className="text-white text-xl font-bold">Smart Voyage</h1>
        <ul className="flex space-x-8 text-white">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/destinations" className="hover:underline">
              Destinations
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/nearby-locations" className="hover:underline">
              Nearby Locations
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-20"></div>
    </>
  );
}
