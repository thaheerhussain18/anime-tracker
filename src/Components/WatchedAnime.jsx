import { useEffect, useState } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase";
import { useAuth } from "./AuthContext";
import "./styles.css";

export default function WatchedAnime() {
  const { user } = useAuth();
  const [watchedAnime, setWatchedAnime] = useState([]);

  useEffect(() => {
    const fetchWatchedAnime = async () => {
      if (!user) return;
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "watchedAnime"));
      setWatchedAnime(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchWatchedAnime();
  }, [user]);

  const deleteAnime = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "watchedAnime", id));
      setWatchedAnime(watchedAnime.filter((anime) => anime.id !== id));
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };

  return (
    <div className="container">
      <h2>Watched Anime-{watchedAnime.length}</h2>
      <div className="anime-grid">
        {watchedAnime.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img src={anime.image} alt={anime.title} />
            <h3>{anime.title_english  || anime.title}</h3>
            <p>Rating: {anime.rating}/10</p>
            <button className="delete-btn" onClick={() => deleteAnime(anime.id)}>❌ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
