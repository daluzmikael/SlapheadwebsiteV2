const API_BASE = 'http://localhost:5000';

const DISPLAY_TITLES = {
  'Golden Skies': 'Save Me',
  'Moonlit Eyes': 'Drunk Trunk',
};

export function getSongDisplayTitle(song) {
  return DISPLAY_TITLES[song?.title] || song?.title;
}

export function isSongPlayable(song) {
  return Boolean((song?.audio && !song?.audio_missing) || song?.page);
}

export function getSongAudioUrl(song) {
  const file = song?.audio;
  if (!file) return null;
  if (file.startsWith('http')) return file;
  const filename = file.replace(/^\/?media\//, '');
  return `${API_BASE}/media/${filename}`;
}

export function getSongPageUrl(song) {
  if (!song?.page) return null;
  if (song.page.startsWith('http')) return song.page;
  const filename = song.page.replace(/^\/?media\//, '');
  return `${API_BASE}/media/${filename}`;
}
