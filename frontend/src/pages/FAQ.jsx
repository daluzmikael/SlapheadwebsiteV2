import './FAQ.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      // Delay redirect slightly to let router mount properly
      setTimeout(() => {
        navigate("/?error=login_required");
      }, 0);
    }
  }, [navigate]);

  const questions = [
    {
      question: "How do I unlock a song?",
      answer: "Buy a mini CD case, and there will be a QR code on the back. Scan it to take you to the unlock page. Then there is a password inside, type it into the field to unlock the song."
    },
    {
      question: "What is the unlock fee?",
      answer: "Unlocking is free but the dics cost a dollar."
    },
    {
      question: "Are the songs licensed?",
      answer: "Yes, all songs are licensed and legally cleared to be streamed on this platform."
    },
    {
      question: "Can I return a CD case after purchase?",
      answer: "No, all sales are final."
    },
    {
      question: "Where can I find cases?",
      answer: "Check out our online stores section or look for us at your nearest walmart."
    }
  ];

  return (
    <div className="faq-page">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-grid">
        {questions.map((q, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{q.question}</h3>
            <p className="faq-answer">{q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
