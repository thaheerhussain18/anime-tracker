import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAnime from "./Components/AddAnime";
import WatchedAnime from "./Components/WatchedAnime";
import SavedAnime from "./Components/SavedAnime";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { AuthProvider } from "./Components/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <div className="p-6">
            <Routes>
              {/* Protected Routes */}
              <Route path="/" element={<PrivateRoute><AddAnime /></PrivateRoute>} />
              <Route path="/watched" element={<PrivateRoute><WatchedAnime /></PrivateRoute>} />
              <Route path="/saved" element={<PrivateRoute><SavedAnime /></PrivateRoute>} />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
