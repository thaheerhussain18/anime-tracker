import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import AddAnime from "./Components/AddAnime";
import WatchedAnime from "./Components/WatchedAnime";
import SavedAnime from "./Components/SavedAnime";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
       <Navbar />
       <h1>.</h1><h1>.</h1>.<h1></h1>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<AddAnime />} />
            <Route path="/watched" element={<WatchedAnime />} />
            <Route path="/saved" element={<SavedAnime />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
