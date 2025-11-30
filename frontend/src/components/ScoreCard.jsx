// frontend/src/components/ScoreCard.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

export default function ScoreCard({ score }) {
  const labels = score.skills.map(s => s.skill);
  const data = {
    labels,
    datasets: [{
      label: 'Skill score',
      data: score.skills.map(s => s.score),
      barPercentage: 0.6
    }]
  };

  return (
    <div className="scorecard">
      <h2>{score.candidate} — Overall: {score.overallScore}</h2>
      <div style={{ maxWidth: 600 }}>
        <Bar data={data} />
      </div>

      <h3>Skill gaps</h3>
      <ul>
        {score.gaps.length === 0 && <li>No gaps identified</li>}
        {score.gaps.map(g => (
          <li key={g.skill}>
            <strong>{g.skill}</strong> — gap: {g.gap}
            <div className="progress"><div style={{ width: `${Math.min(100, (100 - g.gap))}%`}} /></div>
          </li>
        ))}
      </ul>
      <p className="meta">Generated at: {score.meta.generatedAt}</p>
    </div>
  );
}
