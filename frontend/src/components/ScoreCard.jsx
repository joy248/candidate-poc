// frontend/src/components/ScoreCard.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import "../style.css";

export default function ScoreCard({ score }) {
  if (!score) return null;

  const labels = score.skills.map(s => s.skill);
  const data = {
    labels,
    datasets: [{
      label: 'Skill score',
      data: score.skills.map(s => s.score),
      backgroundColor: '#7fb3ff'
    }]
  };

  return (
    <div className="scorecard">
      <h2>{score.candidate} — Overall: {score.overallScore}</h2>
      <div style={{ maxWidth: '100%', marginBottom: 12 }}>
        <Bar data={data} />
      </div>

      <h4 style={{marginBottom:8}}>Skill gaps</h4>
      <div>
        {score.skills.map(s => (
          <div key={s.skill} className="skill-row">
            <div style={{flex:1}}>
              <strong>{s.skill}</strong>
              <div className="tiny muted">desired: {s.desiredLevel}</div>
            </div>
            <div style={{width: '40%', textAlign:'right'}}>
              <div className="progress" style={{width:'100%'}}>
                <div style={{
                  width: `${s.score}%`,
                  background: s.score >= 80 ? '#10b981' : s.score >= 50 ? '#f59e0b' : '#ef4444'
                }} />
              </div>
              <div className="tiny muted" style={{marginTop:6}}>score: {s.score}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="muted tiny" style={{marginTop:12}}>Generated at: {score.meta?.generatedAt}</div>
    </div>
  );
}
