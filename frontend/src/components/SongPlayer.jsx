import { getSongAudioUrl, isSongPlayable } from '../utils/songAudio';

export default function SongPlayer({ song }) {
  const playable = isSongPlayable(song);
  const audioUrl = getSongAudioUrl(song);

  if (playable && audioUrl) {
    return (
      <audio controls preload="none" className="song-audio">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>
    );
  }

  return (
    <div className="song-audio song-audio-locked">
      <span className="song-audio-locked-label">Coming soon</span>
      <div className="song-audio-locked-bar" aria-hidden="true">
        <span className="song-audio-locked-track" />
      </div>
    </div>
  );
}
