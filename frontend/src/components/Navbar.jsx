import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo / Title */}
        <Link to="/" className="text-xl font-bold">
          BeyondChats
        </Link>

        {/* Right side */}
        <span className="text-sm text-gray-500">
          Article Viewer
        </span>

      </div>
    </nav>
  );
}
