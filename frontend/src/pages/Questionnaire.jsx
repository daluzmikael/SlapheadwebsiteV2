import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Questionnaire.css';

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const questions = [
    "How old are you?", "How active are you?", "Did you have pets growing up?", "Are you scared of hospitals?",
    "Would be a tolerant owner?", "Compromises to illness?", "Any financial limitations?", "Did you grow up on a farm?",
    "Who else do you live with?", "Do you work remotely?", "How many other pets this household?", "What is your Height/Weight?",
    "Do you have any kids?", "How many older people living with you?"
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
        navigate("/matching");
      })
      .catch(err => {
        console.error("Submit failed:", err);
        alert("Failed to submit questionnaire. Try again.");
      });
  };

  return (
    <div className="questionnaire-page">
      <h2 className="questionnaire-title">Pet Recommendation Questionnaire</h2>
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
