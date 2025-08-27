import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create account");
        return res.json();
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err);
        setError("Account creation failed.");
      });
  };

  return (
    <div className="create-account-page">
      <div className="create-account-card">
        <h2 className="create-account-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="create-account-form">
          <div>
            <label className="create-account-label">Username</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="create-account-input" required />
          </div>
          <div>
            <label className="create-account-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="create-account-input" required />
          </div>
          <div>
            <label className="create-account-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="create-account-input" required />
          </div>
          <button type="submit" className="create-account-button">Create Account</button>
          {error && <p className="create-account-error">{error}</p>}
          <p className="create-account-footer">
            Already have an account? <a href="/" className="create-account-link">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
