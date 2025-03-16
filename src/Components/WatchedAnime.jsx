import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Saved.css"; // Import CSS styles

export default function WatchedAnime() {
  const [watchedAnime, setWatchedAnime] = useState([]);

  // Fetch watched anime from Firebase
  const fetchWatchedAnime = async () => {
    const querySnapshot = await getDocs(collection(db, "watchedAnime"));
    const animeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWatchedAnime(animeData);
  };

  useEffect(() => {
    fetchWatchedAnime();
  }, []);

  // Delete anime from Firebase
  const deleteAnime = async (id) => {
    try {
      await deleteDoc(doc(db, "watchedAnime", id));
      setWatchedAnime(watchedAnime.filter((anime) => anime.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Watched Anime ({watchedAnime.length})</h2>
      <div className="anime-grid">
        {watchedAnime.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img src={anime.image} alt={anime.title} className="anime-image" />
            <h3 className="anime-title">{(anime.title_english==null)?anime.title:anime.title_english}</h3>
            <button className="delete-btn" onClick={() => deleteAnime(anime.id)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
