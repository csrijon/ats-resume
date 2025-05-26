import 'dotenv/config';
import express from "express";
import fetch from "node-fetch"; // Ensure this is installed: npm install node-fetch
import Resume from "../models/Resume.js";

const router = express.Router();

// 🎯 Scoring logic
function scoreResume(text) {
  let score = 0;
  const suggestions = [];

  if (text.includes("Objective") || text.includes("Summary")) score += 10;
  if (text.includes("Experience")) score += 20;
  if (text.includes("Skills")) score += 20;
  if (text.includes("Education")) score += 20;
  if (text.match(/\b(led|created|developed|managed|improved)\b/i)) score += 20;
  if (text.length > 1000) score += 10;
  else suggestions.push("Add more content to improve depth");

  if (score > 100) score = 100;
  return { score, suggestions };
}

// 🔧 Gemini REST API call
async function generateWithGemini(prompt) {
  const apiKey = "AIzaSyDlwaDUx0rcZeR3OlY5Jk3NaGbWdUMq8FQ"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Gemini API error: ${errorData}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

// ✅ POST /
router.post("/", async (req, res) => {
  const { resumeId } = req.body;

  if (!resumeId) return res.status(400).json({ error: "Missing resumeId" });

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

 const prompt = `
You are a resume writing expert. Improve the following resume to achieve a 90%+ ATS score. Structure the improved resume in proper professional resume format. Include these sections clearly:
- Name and Contact Information (at the top)
- LinkedIn, GitHub links
- Education
- Projects (with tech stack, responsibilities, and achievements)
- Internships
- Technical Skills
- Certifications

Ensure:
- Bullet points are used for accomplishments.
- Strong action verbs are used.
- All sections are clearly labeled.
- No extra commentary or explanation is returned.

Return only the improved resume **as properly formatted plain text** that can be converted to PDF.

Original Resume:
${resume.text}
`;



    const improvedText = await generateWithGemini(prompt);
    const improvedScore = scoreResume(improvedText);

    res.json({
      improvedText,
      scoreData: improvedScore,
    });
  } catch (error) {
    console.error("Improvement error:", error);
    res.status(500).json({ error: "Failed to improve resume" });
  }
});

export default router;
