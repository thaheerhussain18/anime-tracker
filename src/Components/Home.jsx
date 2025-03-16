import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import AddAnime from "./AddAnime";
import WatchedAnime from "./WatchedAnime";
import SavedAnime from "./SavedAnime";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><AddAnime /></PrivateRoute>} />
          <Route path="/watched" element={<PrivateRoute><WatchedAnime /></PrivateRoute>} />
          <Route path="/saved" element={<PrivateRoute><SavedAnime /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
