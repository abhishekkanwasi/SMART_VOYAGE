import logo from "../assets/logo.png"; // Import logo

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 fixed top-0 w-full flex items-center shadow-lg">
      <img src={logo} alt="Logo" className="h-12 ml-4" />
      <h1 className="text-white text-2xl ml-4 font-bold">Smart Voyage</h1>
    </nav>
  );
}
