import { useEffect, useState } from 'react';
import SongPlayer from '../components/SongPlayer';
import { getSongDisplayTitle, isSongPlayable } from '../utils/songAudio';
import './Search.css';

const API_BASE = 'http://localhost:5000';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSongs = (search = '') => {
    setLoading(true);
    setError('');
    const path = search
      ? `/api/songs/search?query=${encodeURIComponent(search)}`
      : '/api/songs';

    fetch(`${API_BASE}${path}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load songs');
        return res.json();
      })
      .then(setResults)
      .catch(() => setError('Could not load the catalog. Is the backend running?'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    loadSongs(query.trim());
  };

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    if (!nextQuery.trim()) {
      loadSongs();
    }
  };

  return (
    <div className="search-page">
      <h2 className="search-title">Search Music</h2>
      <p className="search-subtitle">Find tracks by title, artist, or genre.</p>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Try an artist, song, or genre..."
          value={query}
          onChange={handleQueryChange}
          className="search-input"
          aria-label="Search the music catalog"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading ? (
        <p className="search-empty">Loading catalog...</p>
      ) : error ? (
        <p className="search-empty search-error">{error}</p>
      ) : results.length === 0 ? (
        <p className="search-empty">No matching songs found.</p>
      ) : (
        <div className="search-grid">
          {results.map((song) => (
            <article
              key={song.id}
              className={`search-card${isSongPlayable(song) ? ' search-card--available' : ''}`}
            >
              {song.image ? (
                <img src={`/images/${song.image}`} alt="" className="search-image" />
              ) : (
                <div className="search-artwork" aria-hidden="true">
                  <span>{song.artist.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <h3 className="search-name">{getSongDisplayTitle(song)}</h3>
              <p className="search-artist">{song.artist}</p>
              <p className="search-genre">{song.genre} · {song.length}</p>
              <SongPlayer song={song} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
