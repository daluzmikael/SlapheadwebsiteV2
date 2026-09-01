import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Questionnaire.css';

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const questions = [
    "Which genres do you listen to most?",
    "Name three artists you keep coming back to.",
    "Do you prefer high-energy or laid-back music?",
    "When do you listen most: commuting, working, exercising, or relaxing?",
    "Do you usually seek new releases or familiar favorites?",
    "Do you prefer singles, albums, or playlists?",
    "Which decade of music do you enjoy most?",
    "Do lyrics or production matter more to you?"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to submit the questionnaire.");
      return;
    }

    fetch("http://localhost:5000/api/questionnaire/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, answers })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to submit questionnaire");
        return res.json();
      })
      .then(data => {
        alert("Questionnaire submitted!");
        navigate("/search");
      })
      .catch(err => {
        console.error("Submit failed:", err);
        alert("Failed to submit questionnaire. Try again.");
      });
  };

  return (
    <div className="questionnaire-page">
      <h2 className="questionnaire-title">Listening Profile</h2>
      <form onSubmit={handleSubmit} className="questionnaire-form">
        {questions.map((q, i) => (
          <div key={i}>
            <label className="questionnaire-label">{q}</label>
            <input
              type="text"
              className="questionnaire-input"
              onChange={(e) => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
              required
            />
          </div>
        ))}
        <button type="submit" className="questionnaire-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
