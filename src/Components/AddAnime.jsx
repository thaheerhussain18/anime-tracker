import { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import { useAuth } from "./AuthContext";
import "./styles.css";

export default function AddAnime() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [category, setCategory] = useState("saved");
  const [rating, setRating] = useState(0);

  const fetchAnime = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=10`);
    const data = await res.json();
    setAnimeList(data.data);
  };

  const addToList = async (anime) => {
    if (!user) return alert("Login to save anime!");

    try {
      await addDoc(collection(db, "users", user.uid, category === "watched" ? "watchedAnime" : "savedAnime"), {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        rating: rating, // Save rating
      });
      alert("Added successfully!");
    } catch (error) {
      console.error("Error adding anime: ", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Anime</h2>
      <div className="search-box">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anime..." />
        <button onClick={fetchAnime}>Search</button>
      </div>
      <div className="category-select">
        <label>Select Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="saved">Saved to Watch</option>
          <option value="watched">Watched</option>
        </select>
      </div>
      <div className="anime-list">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <h3>{anime.title}</h3>
            <label>Rating:</label>
            <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} min="0" max="10" />
            <button onClick={() => addToList(anime)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
