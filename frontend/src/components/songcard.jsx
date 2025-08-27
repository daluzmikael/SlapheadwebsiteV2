// src/components/songcard.jsx

export default function SongCard({ id, title, artist, length, plays, unlocked, genre }) {
  return (
    <div className="border p-4 rounded shadow text-center bg-white song-card">
      {image && (
        <img
          src={`/images/${image}`}
          alt={`${name} the ${species}`}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">{species} • {breed}</p>

      {onRemove ? (
        <button
          onClick={() => onRemove(id)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      ) : onSave ? (
        <button
          onClick={() => onSave(id)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Save
        </button>
      ) : null}
    </div>
  );
}
