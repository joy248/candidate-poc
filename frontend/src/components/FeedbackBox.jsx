// frontend/src/components/FeedbackBox.jsx
import React from "react";
import "../style.css";

export default function FeedbackBox({ feedback }) {
  if (!feedback) return null;
  return (
    <div className="feedback">
      <h4 style={{marginBottom:8}}>AI Feedback</h4>
      <ul style={{paddingLeft:16, margin:0}}>
        {feedback.suggestions.map((s, i) => (
          <li key={i} style={{marginBottom:8}}>
            <strong>{s.title}:</strong> {s.suggestion}
          </li>
        ))}
      </ul>
      <div className="muted tiny" style={{marginTop:8}}>{feedback.meta?.generatedAt}</div>
    </div>
  );
}
