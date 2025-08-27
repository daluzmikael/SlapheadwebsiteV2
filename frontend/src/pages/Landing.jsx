import './Landing.css';

export default function Landing() {
  const email = localStorage.getItem("userEmail");

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Slapmusic</h1>
        <p className="landing-subtitle">Logged in as <strong>{email}</strong></p>
      </div>
    </div>
  );
}
