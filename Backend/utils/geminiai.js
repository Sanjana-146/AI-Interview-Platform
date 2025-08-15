import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateQuestions(payload) {
  const { jobRole, techStack, difficulty, duration, jobExperience, company } = payload;

  // Decide how many questions based on duration
  let numQuestions;
  if (duration == 30) numQuestions = 5;
  else if (duration == 45) numQuestions = 8;
  else numQuestions = 12;

  const prompt = `
    You are an expert interview question generator.
    Create ${numQuestions} ${difficulty} interview questions
    for the role of ${jobRole} at ${company}.
    Experience Level: ${jobExperience} years
    Tech Stack: ${techStack}.
    Each question should be clear and concise.

Example output:
[
  {"id":1,"text":"Explain how closures work in JavaScript.","expectedSeconds":60},
  {"id":2,"text":"Describe your experience with React hooks.","expectedSeconds":45}
]
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  try {
    return JSON.parse(response.text);
  } catch {
    const match = response.text.match(/\[.*\]/s);
    if (match) return JSON.parse(match[0]);
    throw new Error("Could not parse questions from Gemini response");
  }
}
 
