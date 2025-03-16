import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import AddAnime from "./AddAnime";
import WatchedList from "./WatchedList";
import SavedList from "./SavedList";
import "./styles.css";

export default function Home() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddAnime />} />
        <Route path="/watched" element={<WatchedList />} />
        <Route path="/saved" element={<SavedList />} />
      </Routes>
    </Router>
  );
}
