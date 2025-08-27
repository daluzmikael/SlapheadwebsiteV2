//Delete this file later

import './Guide.css';

export default function Guide() {
  const categories = ["Dog", "Cat", "Equine", "Rodent", "Reptile", "Bird"];

  const careInfo = {
    Dog: ["Exercise", "Leash & Collar", "Training", "Vaccinations"],
    Cat: ["Litter Box", "Scratching Posts", "Enrichment", "Flea Treatments"],
    Equine: ["Stabling", "Diet & Feeding", "Hoof Care", "Medical Information"],
    Rodent: ["Cage Care", "Toys", "Bedding", "Diet"],
    Reptile: ["Heat Lamps", "Terrarium", "Humidity", "Supplements"],
    Bird: ["Cage Size", "Wing Trimming", "Toys & Misc.", "Diet Types"]
  };

  return (
    <div className="guide-page">
      <h2 className="guide-title">Pet Supply and Care Guide</h2>
      <div className="guide-grid">
        {categories.map((type) => (
          <div key={type} className="guide-card">
            <img
              src={`/${type.toLowerCase()}.jpg`}
              alt={`${type} Care`}
              className="guide-image"
            />
            <div className="guide-card-content">
              <p className="guide-card-title">{type} Care</p>
              <ul className="guide-card-list">
                {careInfo[type].map((item, idx) => (
                  <li key={idx}> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
