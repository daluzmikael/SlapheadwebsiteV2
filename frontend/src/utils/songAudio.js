const API_BASE = 'http://localhost:5000';

const TITLE_TO_AUDIO = {
  'Save Me': 'saveme.mp3',
  'Drunk Trunk': 'drunktrunk.mp3',
  'Golden Skies': 'saveme.mp3',
  'Moonlit Eyes': 'drunktrunk.mp3',
};

const DISPLAY_TITLES = {
  'Golden Skies': 'Save Me',
  'Moonlit Eyes': 'Drunk Trunk',
};

export function getSongDisplayTitle(song) {
  return DISPLAY_TITLES[song?.title] || song?.title;
}

export function isSongPlayable(song) {
  return Boolean(song?.audio || TITLE_TO_AUDIO[song?.title]);
}

export function getSongAudioUrl(song) {
  const file = song?.audio || TITLE_TO_AUDIO[song?.title];
  if (!file) return null;
  if (file.startsWith('http')) return file;
  const filename = file.replace(/^\/?media\//, '');
  return `${API_BASE}/media/${filename}`;
}
