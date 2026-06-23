// src/pages/Unlock.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SongPlayer from '../components/SongPlayer';
import { getSongDisplayTitle, isSongPlayable } from '../utils/songAudio';
import './Unlock.css';

export default function Unlock() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedIds, setSavedIds] = useState(new Set());

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/?error=login_required');
      return;
    }

    Promise.all([
      fetch('http://localhost:5000/api/songs').then(res => {
        if (!res.ok) throw new Error('Failed to load songs');
        return res.json();
      }),
      fetch(`http://localhost:5000/api/songs/saved/${userId}`).then(res => {
        if (!res.ok) return [];
        return res.json();
      }),
    ])
      .then(([allSongs, savedSongs]) => {
        setSongs(allSongs);
        setSavedIds(new Set(savedSongs.map(s => s.id)));
      })
      .catch(() => setError('Could not load songs. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [navigate, userId]);

  const handleSave = (songId) => {
    if (!userId) {
      navigate('/?error=login_required');
      return;
    }

    fetch(`http://localhost:5000/api/songs/${songId}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Number(userId) }),
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          alert(data.error || 'Save failed');
          return;
        }
        setSavedIds(prev => new Set([...prev, songId]));
        alert(data.message);
      })
      .catch(() => alert('Save failed: network error'));
  };

  if (loading) {
    return <div className="unlock-page"><p className="unlock-title">Loading songs...</p></div>;
  }

  if (error) {
    return <div className="unlock-page"><p className="unlock-title">{error}</p></div>;
  }

  return (
    <div className="unlock-page">
      <h2 className="unlock-title">Available Songs</h2>
      <div className="unlock-grid">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`song-card${isSongPlayable(song) ? ' song-card--playable' : ''}`}
          >
            <h3 className="song-title">{getSongDisplayTitle(song)}</h3>
            <p className="song-meta">{song.artist} · {song.length}</p>
            <SongPlayer song={song} />
            <button
              className="save-button"
              onClick={() => handleSave(song.id)}
              disabled={savedIds.has(song.id)}
            >
              {savedIds.has(song.id) ? 'Saved' : 'Save'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
