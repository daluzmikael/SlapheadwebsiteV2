import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userId", data.user.id);
          navigate("/landing");
        } else {
          setError("Login failed: user not found.");
        }
      })
      .catch(() => {
        setError("Login failed: network or server error.");
      });
  };

  const loginRedirectMsg = new URLSearchParams(location.search).get("error") === "login_required"
    ? "Please log in to continue."
    : "";

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Slapmusic Log In</h2>
        {loginRedirectMsg && (
          <p className="login-warning">{loginRedirectMsg}</p>
        )}
        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label className="login-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="example@example.com"
              required
            />
          </div>
          <div>
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          {error && <p className="login-error">{error}</p>}
          <p className="login-footer">
            Don’t have an account? <a href="/create-account" className="login-link">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
}
