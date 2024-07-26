import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <nav className="col-12 bg-dark text-white">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
