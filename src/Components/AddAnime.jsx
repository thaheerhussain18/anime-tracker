import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./styles.css";

export default function AddAnime() {
  const [search, setSearch] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [category, setCategory] = useState("saved");

  const fetchAnime = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=10`);
    const data = await res.json();
    setAnimeList(data.data);
  };

  const addToList = async (anime) => {
    try {
      await addDoc(collection(db, category === "watched" ? "watchedAnime" : "savedAnime"), {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        rating: 0,
      });
      alert("Added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container">
      <h2>Add Anime</h2>
      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anime..."
        />
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
            <h3>{anime.title_english}</h3>
            <button onClick={() => addToList(anime)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
