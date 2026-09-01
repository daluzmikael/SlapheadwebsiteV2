import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SongPlayer from '../components/SongPlayer';
import { getSongDisplayTitle, isSongPlayable } from '../utils/songAudio';
import './Guide.css';

function groupByArtist(songs) {
  const artists = {};

  songs.forEach((song) => {
    if (!artists[song.artist]) {
      artists[song.artist] = {
        name: song.artist,
        songs: [],
        genres: new Set(),
      };
    }
    artists[song.artist].songs.push(song);
    artists[song.artist].genres.add(song.genre);
  });

  return Object.values(artists)
    .map((artist) => ({
      ...artist,
      genres: [...artist.genres],
      playableCount: artist.songs.filter(isSongPlayable).length,
    }))
    .sort((a, b) => {
      if (a.name === 'slaphead') return -1;
      if (b.name === 'slaphead') return 1;
      return a.name.localeCompare(b.name);
    });
}

function ArtistAvatar({ name }) {
  return (
    <div className="artist-avatar" aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function Guide() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedArtist = searchParams.get('artist');

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/?error=login_required');
      return;
    }

    fetch('http://localhost:5000/api/songs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load artists');
        return res.json();
      })
      .then((data) => setSongs(data))
      .catch(() => setError('Could not load artists. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const artists = useMemo(() => groupByArtist(songs), [songs]);
  const activeArtist = artists.find((artist) => artist.name === selectedArtist);

  const openArtist = (name) => {
    setSearchParams({ artist: name });
  };

  const closeArtist = () => {
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="guide-page">
        <p className="guide-title">Loading artists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guide-page">
        <p className="guide-title">{error}</p>
      </div>
    );
  }

  if (selectedArtist && !activeArtist) {
    return (
      <div className="guide-page">
        <button type="button" className="guide-back-button" onClick={closeArtist}>
          ← All Artists
        </button>
        <p className="guide-title">Artist not found.</p>
      </div>
    );
  }

  if (activeArtist) {
    return (
      <div className="guide-page">
        <button type="button" className="guide-back-button" onClick={closeArtist}>
          ← All Artists
        </button>

        <header className="artist-profile-header">
          <ArtistAvatar name={activeArtist.name} />
          <div>
            <h2 className="guide-title artist-profile-name">{activeArtist.name}</h2>
            <p className="artist-profile-meta">
              {activeArtist.songs.length} track{activeArtist.songs.length !== 1 ? 's' : ''}
              {activeArtist.playableCount > 0 && (
                <> · {activeArtist.playableCount} available now</>
              )}
            </p>
            <p className="artist-profile-genres">{activeArtist.genres.join(' · ')}</p>
          </div>
        </header>

        <div className="artist-catalog">
          {activeArtist.songs.map((song) => (
            <div
              key={song.id}
              className={`catalog-card${isSongPlayable(song) ? ' catalog-card--playable' : ''}`}
            >
              <h3 className="catalog-title">{getSongDisplayTitle(song)}</h3>
              <p className="catalog-meta">{song.length} · {song.genre}</p>
              <SongPlayer song={song} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="guide-page">
      <h2 className="guide-title">Artist Profiles</h2>
      <p className="guide-subtitle">Browse singers and explore their catalogs.</p>

      <div className="artist-grid">
        {artists.map((artist) => (
          <button
            key={artist.name}
            type="button"
            className="artist-card"
            onClick={() => openArtist(artist.name)}
          >
            <ArtistAvatar name={artist.name} />
            <h3 className="artist-card-name">{artist.name}</h3>
            <p className="artist-card-count">
              {artist.songs.length} track{artist.songs.length !== 1 ? 's' : ''}
            </p>
            <p className="artist-card-genres">
              {artist.genres.slice(0, 2).join(' · ')}
              {artist.genres.length > 2 ? ' · …' : ''}
            </p>
            {artist.playableCount > 0 && (
              <span className="artist-card-badge">{artist.playableCount} playable</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
