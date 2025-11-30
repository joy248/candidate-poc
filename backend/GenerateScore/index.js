// backend/GenerateScore/index.js
module.exports = async function (context, req) {
  // fast mocked "AI" scoring: returns structured JSON
  const candidate = (req.body && req.body.candidate) || { name: "Unknown", skills: [] };

  // Mock scoring logic (quick deterministic)
  const skillScores = (candidate.skills || ["Java", "SQL", "React"]).map((s, i) => ({
    skill: s,
    score: Math.max(30, 90 - i * 12 - (s.length % 7) * 3), // deterministic sample
    desiredLevel: 80
  }));

  const overall = Math.round(skillScores.reduce((a, b) => a + b.score, 0) / skillScores.length);

  const gaps = skillScores
    .filter(s => s.score < s.desiredLevel)
    .map(s => ({ skill: s.skill, gap: s.desiredLevel - s.score }));

  const response = {
    candidate: candidate.name,
    overallScore: overall, // 0-100
    skills: skillScores,
    gaps,
    meta: {
      generatedAt: new Date().toISOString(),
      model: "mock-ai-v1"
    }
  };

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: response
  };
};
