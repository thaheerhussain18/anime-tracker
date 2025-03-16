import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Saved.css"; // Import CSS styles

export default function SavedAnime() {
  const [savedAnime, setSavedAnime] = useState([]);

  // Fetch saved anime from Firebase
  const fetchSavedAnime = async () => {
    const querySnapshot = await getDocs(collection(db, "savedAnime"));
    const animeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSavedAnime(animeData);
  };

  useEffect(() => {
    fetchSavedAnime();
  }, []);

  // Delete anime from Firebase
  const deleteAnime = async (id) => {
    try {
      await deleteDoc(doc(db, "savedAnime", id));
      setSavedAnime(savedAnime.filter((anime) => anime.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Saved to Watch ({savedAnime.length})</h2>
      <div className="anime-grid">
        {savedAnime.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img src={anime.image} alt={anime.title} className="anime-image" />
            <p className="anime-title">{(anime.title_english)}</p>
            <button className="delete-btn" onClick={() => deleteAnime(anime.id)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
