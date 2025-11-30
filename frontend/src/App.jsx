// frontend/src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import ScoreCard from "./components/ScoreCard";
import FeedbackBox from "./components/FeedbackBox";
import "./style.css";

const API_BASE = "/api";

const candidates = [
  { id: 1, name: "Alice Kumar", skills: ["Java", "SQL", "React"] },
  { id: 2, name: "Ravi Sharma", skills: ["Golang", "Kubernetes", "Docker"] }
];

export default function App() {
  const [selected, setSelected] = useState(candidates[0]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function generateScore() {
    setLoading(true);
    setScore(null);
    try {
      const res = await axios.post(`${API_BASE}/GenerateScore`, { candidate: selected });
      setScore(res.data);
    } catch (e) {
      alert("Error generating score: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function requestFeedback(action, codeSnippet) {
    setFeedback(null);
    try {
      const res = await axios.post(`${API_BASE}/GenerateFeedback`, { candidate: selected.name, action, codeSnippet });
      setFeedback(res.data);
    } catch (e) {
      alert("Error generating feedback: " + e.message);
    }
  }

  return (
    <div className="app">
      <h1>Recruiter Dashboard — Candidate PoC</h1>
      <div className="topbar">
        <select value={selected.id} onChange={e => setSelected(candidates.find(c => c.id === +e.target.value))}>
          {candidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={generateScore} disabled={loading}>{loading ? "Evaluating..." : "Trigger AI Evaluation"}</button>
      </div>

      {score && <ScoreCard score={score} />}

      <div className="miniapp">
        <h2>Code block / Quick decision</h2>
        <p>Example snippet (editable):</p>
        <textarea id="code" defaultValue={`function check(a, b) { return a == b }`} rows={6} />
        <div>
          <button onClick={() => requestFeedback("approve", document.getElementById("code").value)}>Approve</button>
          <button onClick={() => requestFeedback("reject", document.getElementById("code").value)}>Reject</button>
        </div>
        {feedback && <FeedbackBox feedback={feedback} />}
      </div>
    </div>
  );
}
