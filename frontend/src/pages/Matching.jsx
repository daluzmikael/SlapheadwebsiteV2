import { useEffect, useState } from "react";
import './Matching.css';

export default function Matching() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pets")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Initial load failed:", err));
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;

    fetch(`http://localhost:5000/api/pets/search?query=${encodeURIComponent(query)}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => console.error("Search failed:", err));
  };

  return (
    <div className="matching-page">
      <h2 className="matching-title">Pet Compatibility Matching</h2>

      <div className="matching-search">
        <input
          type="text"
          placeholder="Search for cats, golden retrievers, calm, age 3..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="matching-input"
        />
        <button
          onClick={handleSearch}
          className="matching-button"
        >
          Search
        </button>
      </div>

      {results.length === 0 ? (
        <p className="matching-empty">No pets found.</p>
      ) : (
        <div className="matching-grid">
          {results.map(pet => (
            <div key={pet.id} className="matching-card">
              <img src="/placeholder.jpg" alt={pet.name} className="matching-image" />
              <p className="matching-name">{pet.name}</p>
              <p className="matching-info">{pet.species} • {pet.breed} • Age {pet.age}</p>
              <p className="matching-temperament">{pet.temperament}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
