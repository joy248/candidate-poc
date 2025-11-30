// backend/GenerateFeedback/index.js
module.exports = async function (context, req) {
  const { candidate, action, codeSnippet } = req.body || {};

  // Basic quick rule-based feedback
  const suggestions = [];

  suggestions.push({
    title: "Communication",
    suggestion: "Ask the candidate to explain past projects focusing on impact and quantifiable outcomes."
  });

  suggestions.push({
    title: "Algorithmic thinking",
    suggestion: "Give a medium-difficulty algorithm question and watch for tradeoffs, then probe time/space complexity."
  });

  if (codeSnippet && codeSnippet.includes("==")) {
    suggestions.push({
      title: "Code quality",
      suggestion: "Prefer === in JavaScript, and add unit tests for edge cases."
    });
  }

  if (action === "approve") {
    suggestions.push({ title: "Next step", suggestion: "Move candidate to take-home assignment and send follow-up email." });
  } else if (action === "reject") {
    suggestions.push({ title: "Reject reasons", suggestion: "Document primary skill-gap and suggested re-apply timeline (6 months)." });
  }

  context.res = {
    status: 200,
    body: {
      candidate: candidate || "Unknown",
      suggestions,
      meta: { generatedAt: new Date().toISOString(), engine: "mock-feedback-v1" }
    }
  };
};
