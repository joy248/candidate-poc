// frontend/src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import ScoreCard from "./components/ScoreCard";
import FeedbackBox from "./components/FeedbackBox";
import "./style.css";

const API_BASE = "/api";

const candidates = [
  {
    id: 1,
    name: "Alice Kumar",
    title: "Backend Engineer",
    location: "Hyderabad, IN",
    skills: ["Java", "SQL", "React"]
  },
  {
    id: 2,
    name: "Ravi Sharma",
    title: "SRE",
    location: "Bengaluru, IN",
    skills: ["Golang", "Kubernetes", "Docker"]
  },
  {
    id: 3,
    name: "Sneha Patel",
    title: "Frontend Engineer",
    location: "Chennai, IN",
    skills: ["React", "TypeScript", "CSS"]
  }
];

export default function App() {
  const [selected, setSelected] = useState(candidates[0]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("function check(a, b) { return a == b }");
  const [showActivity, setShowActivity] = useState(true);

  async function generateScore() {
    setLoading(true);
    setScore(null);
    setFeedback(null);
    try {
      const res = await axios.post(`${API_BASE}/GenerateScore`, { candidate: selected });
      setScore(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate score");
    } finally {
      setLoading(false);
    }
  }

  async function requestFeedback(action) {
    setFeedback(null);
    try {
      const res = await axios.post(`${API_BASE}/GenerateFeedback`, {
        candidate: selected.name,
        action,
        codeSnippet: code
      });
      setFeedback(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to request feedback");
    }
  }

  return (
    <div className="page">
      <div className="left-col">
        <div className="brand">
          <div className="logo">AI</div>
          <div>
            <h1>Recruiter Dashboard</h1>
            <div className="muted">Smart candidate assessment</div>
          </div>
        </div>

        <div className="panel">
          <label className="label">Pick candidate</label>
          <select
            value={selected.id}
            onChange={(e) => setSelected(candidates.find(c => c.id === +e.target.value))}
            className="select"
          >
            {candidates.map(c => <option key={c.id} value={c.id}>{c.name} — {c.title}</option>)}
          </select>

          <button className="btn primary" onClick={generateScore} disabled={loading}>
            {loading ? "Evaluating..." : "Run AI Evaluation"}
          </button>
        </div>

        <div className="panel small">
          <h3 className="panel-title">Candidate Summary</h3>
          <div className="summary-row">
            <div className="avatar">{selected.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
            <div>
              <div className="name">{selected.name}</div>
              <div className="muted small">{selected.title} • {selected.location}</div>
              <div className="muted tiny">Skills: {selected.skills.join(', ')}</div>
            </div>
          </div>
        </div>

        <div className="panel small">
          <h3 className="panel-title">Quick Stats</h3>
          <div className="stat">
            <div className="stat-value">{score ? score.overallScore : '-'}</div>
            <div className="stat-label">Overall score</div>
          </div>
          <div className="stat-grid">
            <div className="stat-mini">
              <div className="stat-value">{score ? score.skills[0].score : '—'}</div>
              <div className="stat-label tiny">Top skill</div>
            </div>
            <div className="stat-mini">
              <div className="stat-value">{score ? score.gaps.length : '—'}</div>
              <div className="stat-label tiny">Gaps</div>
            </div>
            <div className="stat-mini">
              <div className="stat-value">3</div>
              <div className="stat-label tiny">Interviews</div>
            </div>
          </div>
        </div>

        <div className="panel small">
          <h3 className="panel-title">Activity</h3>
          <button className="linkish" onClick={() => setShowActivity(s => !s)}>{showActivity ? 'Hide' : 'Show'} timeline</button>
          {showActivity && (
            <ul className="timeline">
              <li><strong>2025-11-28</strong> • Phone screen</li>
              <li><strong>2025-11-30</strong> • Tech rounds</li>
              <li><strong>2025-12-01</strong> • Recruiter review</li>
            </ul>
          )}
        </div>

      </div>

      <div className="right-col">
        <div className="hero">
          <div className="hero-left">
            <h2>{selected.name} — <span className="muted">Assessment</span></h2>
            <p className="muted">Quick insights and recommended next steps. Click Run AI Evaluation to produce a report.</p>
          </div>

          <div className="hero-cards">
            <div className="mini-card">⚡ Real-time</div>
            <div className="mini-card">🔒 Secure</div>
            <div className="mini-card">📧 Email</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="main-card">
            <div className="card-title-row">
              <h3>Evaluation Report</h3>
              <div className="muted tiny">{score ? score.meta?.generatedAt : 'No report yet'}</div>
            </div>

            {score ? (
              <ScoreCard score={score} />
            ) : (
              <div className="empty-state">
                <p>No evaluation yet. Use the left control to choose candidate and run evaluation.</p>
              </div>
            )}
          </div>

          <div className="side-card">
            <h3>Quick Code Review</h3>
            <textarea className="code-box" value={code} onChange={e => setCode(e.target.value)} />
            <div className="action-row">
              <button className="btn success" onClick={() => requestFeedback("approve")}>Approve</button>
              <button className="btn danger" onClick={() => requestFeedback("reject")}>Reject</button>
            </div>

            {feedback && <FeedbackBox feedback={feedback} />}
          </div>
        </div>

        <footer className="footer">
          <div>© {new Date().getFullYear()} Candidate PoC</div>
          <div className="muted tiny">Deployed with Vercel & Azure Functions</div>
        </footer>
      </div>
    </div>
  );
}
