import { useEffect, useState } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase";
import { useAuth } from "./AuthContext";
import "./styles.css";

export default function SavedAnime() {
  const { user } = useAuth();
  const [savedAnime, setSavedAnime] = useState([]);

  useEffect(() => {
    const fetchSavedAnime = async () => {
      if (!user) return;
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "savedAnime"));
      setSavedAnime(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchSavedAnime();
  }, [user]);

  const deleteAnime = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "savedAnime", id));
      setSavedAnime(savedAnime.filter((anime) => anime.id !== id));
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };

  return (
    <div className="container">
      <h2>Saved to Watch</h2>
      <div className="anime-grid">
        {savedAnime.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img src={anime.image} alt={anime.title} />
            <h3>{anime.title}</h3>
            <button className="delete-btn" onClick={() => deleteAnime(anime.id)}>❌ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
