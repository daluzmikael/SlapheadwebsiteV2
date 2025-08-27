// src/pages/Wishlist.jsx
export default function Wishlist() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Saved Pets and Wishlist</h2>
        <div className="grid grid-cols-3 gap-4">
          {["Honey", "Snoopy", "Ginger", "Bear", "Lily", "Delilah"].map(pet => (
            <div key={pet} className="text-center">
              <img src="/placeholder.jpg" alt={pet} className="w-full h-32 object-cover" />
              <p className="font-semibold mt-2">{pet}</p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
          ))}
        </div>
      </div>
    );
  }