import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          BeyondChats
        </Link>

        <span className="text-muted small">
          Article Viewer
        </span>
      </div>
    </nav>
  );
}
