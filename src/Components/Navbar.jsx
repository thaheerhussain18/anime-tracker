import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-blue-400">Add Anime</Link>
        <Link to="/watched" className="text-white hover:text-green-400">Watched</Link>
        <Link to="/saved" className="text-white hover:text-purple-400">Saved</Link>
      </div>

      {user ? (
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-blue-400">Login</Link>
          <Link to="/signup" className="text-white hover:text-green-400">Signup</Link>
        </div>
      )}
    </nav>
  );
}
