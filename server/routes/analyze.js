import express from "express";
import fetch from "node-fetch";
import Resume from '../models/Resume.js';

const router = express.Router();

const API_KEY = "AIzaSyDr_hswX8K-WvYnIGcyMdya1gnOTA9mZDE";

// Simple manual resume scoring function (fallback)
function manualAnalyzeResume(text) {
  const keywords = ["JavaScript", "Node.js", "React", "API", "SQL", "Git"];
  const sections = ["Education", "Experience", "Skills", "Projects"];
  const actionVerbs = ["developed", "managed", "created", "led", "improved"];

  let keywordCount = 0;
  for (const kw of keywords) {
    if (text.toLowerCase().includes(kw.toLowerCase())) keywordCount++;
  }
  const keywordScore = Math.min((keywordCount / keywords.length) * 40, 40);

  let sectionCount = 0;
  for (const sec of sections) {
    if (text.toLowerCase().includes(sec.toLowerCase())) sectionCount++;
  }
  const sectionScore = Math.min((sectionCount / sections.length) * 20, 20);

  let actionVerbCount = 0;
  for (const verb of actionVerbs) {
    if (text.toLowerCase().includes(verb.toLowerCase())) actionVerbCount++;
  }
  const actionVerbScore = Math.min((actionVerbCount / actionVerbs.length) * 20, 20);

  const formattingScore = text.includes("\n-") || text.includes("•") ? 18 : 10;

  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).length;
  const avgSentenceLength = words / (sentences.length || 1);
  let readabilityScore = 20;
  if (avgSentenceLength > 25) readabilityScore = 15;
  if (avgSentenceLength > 35) readabilityScore = 10;

  const totalScore = Math.round(keywordScore + sectionScore + actionVerbScore + formattingScore + readabilityScore);

  const suggestions = [];
  if (keywordScore < 30) suggestions.push("Add more role-specific keywords.");
  if (actionVerbScore < 15) suggestions.push("Use stronger action verbs.");
  if (formattingScore < 15) suggestions.push("Fix inconsistent formatting.");
  if (readabilityScore < 15) suggestions.push("Improve readability with shorter sentences.");

  return {
    score: totalScore,
    breakdown: {
      keyword_matching: Math.round(keywordScore),
      section_presence: Math.round(sectionScore),
      action_verbs_metrics: Math.round(actionVerbScore),
      formatting: formattingScore,
      readability: readabilityScore,
    },
    suggestions,
  };
}

router.post("/", async (req, res) => {
  const { resumeId, useManual = false } = req.body;

  if (!resumeId) {
    return res.status(400).json({ error: "Resume ID is required" });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const resumeDoc = await Resume.findById(resumeId);
    if (!resumeDoc) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const resumeText = resumeDoc.text || resumeDoc.content;

    if (useManual) {
      const manualResult = manualAnalyzeResume(resumeText);
      return res.json(manualResult);
    }

    const prompt = `
You are an ATS resume analyzer. Analyze the following resume text and give a score out of 100 based on:
- Keyword Matching (40%)
- Section Presence (20%)
- Action Verbs & Metrics (20%)
- Formatting (20%)
- Readability (20%)

Resume:
${resumeText}

Respond in JSON like this:
{
  "score": 87,
  "breakdown": {
    "keyword_matching": 35,
    "section_presence": 17,
    "action_verbs_metrics": 18,
    "formatting": 18,
    "readability": 18
  },
  "suggestions": [
    "Add more role-specific keywords.",
    "Use stronger action verbs.",
    "Fix inconsistent formatting."
  ]
}
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `GenAI API error: ${errorText}` });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({ error: "No response from GenAI" });
    }

    // Remove markdown code block ticks if present
    const cleanedText = rawText.trim()
      .replace(/^```json\s*/, '')
      .replace(/```$/, '');

    try {
      const parsed = JSON.parse(cleanedText);
      return res.json(parsed);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response text:", rawText);
      return res.status(500).json({ error: "Invalid JSON from GenAI" });
    }
  } catch (err) {
    console.error("Fetch or network error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
