// frontend/src/components/FeedbackBox.jsx
import React from "react";

export default function FeedbackBox({ feedback }) {
  return (
    <div className="feedback">
      <h3>Feedback — {feedback.candidate}</h3>
      <ul>
        {feedback.suggestions.map((s, i) => (
          <li key={i}><strong>{s.title}:</strong> {s.suggestion}</li>
        ))}
      </ul>
      <p className="meta">Generated at: {feedback.meta.generatedAt}</p>
    </div>
  );
}
