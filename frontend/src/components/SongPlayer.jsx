import { getSongAudioUrl, getSongPageUrl } from '../utils/songAudio';

export default function SongPlayer({ song }) {
  const playableAudio = Boolean(song?.audio && !song?.audio_missing);
  const audioUrl = getSongAudioUrl(song);
  const pageUrl = getSongPageUrl(song);

  if (playableAudio && audioUrl) {
    return (
      <audio controls preload="none" className="song-audio">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>
    );
  }

  if (pageUrl) {
    return (
      <a
        className="song-page-link"
        href={pageUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open track page <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <div className="song-audio song-audio-locked">
      <span className="song-audio-locked-label">
        Coming soon
      </span>
      <div className="song-audio-locked-bar" aria-hidden="true">
        <span className="song-audio-locked-track" />
      </div>
    </div>
  );
}
