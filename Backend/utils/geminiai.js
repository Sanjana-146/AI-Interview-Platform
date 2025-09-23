// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function generateQuestions(payload) {
//   const { jobRole, techStack, difficulty, duration, jobExperience, company } = payload;

//   // Decide how many questions based on duration
//   let numQuestions;
//   if (duration == 30) numQuestions = 5;
//   else if (duration == 45) numQuestions = 8;
//   else numQuestions = 12;

//   const prompt = `
//     You are an expert interview question generator.
//     Create ${numQuestions} ${difficulty} interview questions
//     for the role of ${jobRole} at ${company}.
//     Experience Level: ${jobExperience} years
//     Tech Stack: ${techStack}.
//     Each question should be clear and concise.

// Example output:
// [
//   {"id":1,"text":"Explain how closures work in JavaScript.","expectedSeconds":60},
//   {"id":2,"text":"Describe your experience with React hooks.","expectedSeconds":45}
// ]
// `.trim();

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt
//   });

//   try {
//     return JSON.parse(response.text);
//   } catch {
//     const match = response.text.match(/\[.*\]/s);
//     if (match) return JSON.parse(match[0]);
//     throw new Error("Could not parse questions from Gemini response");
//   }
// }
 
// // ✨ NEW: Add this function to analyze the transcript
// export async function analyzeTranscript(transcript) {
//   const prompt = `
//     You are an expert AI interview coach. Your task is to analyze an interview transcript and provide constructive feedback.
    
//     The user was given the following questions and provided these answers:
//     ${transcript.map((item, index) => `Question ${index + 1}: ${item.question}\nAnswer ${index + 1}: ${item.answer || "(No answer provided)"}`).join('\n\n')}

//     Please analyze the user's performance based on the following criteria:
//     1.  **Clarity and Conciseness:** Was the answer clear, to the point, and easy to understand?
//     2.  **Relevance:** Did the answer directly address the question asked?
//     3.  **Technical Depth:** Did the answer demonstrate sufficient knowledge for the role and experience level?
//     4.  **Communication Skills:** Was the language professional and well-structured?

//     Provide your analysis in the following JSON format ONLY. Do not include any text or markdown formatting before or after the JSON object.

//     {
//       "overallScore": <A numerical score from 0 to 100 representing overall performance>,
//       "overallFeedback": "<A 2-3 sentence summary of the user's performance, highlighting key takeaways>",
//       "strengths": [
//         "<A key strength identified from the answers>",
//         "<Another key strength>"
//       ],
//       "areasForImprovement": [
//         "<A specific area where the user can improve>",
//         "<Another area for improvement>"
//       ],
//       "questionBreakdown": [
//         {
//           "question": "<The first question>",
//           "answer": "<The user's answer to the first question>",
//           "feedback": "<Specific, constructive feedback for this particular answer>",
//           "score": <A numerical score from 0 to 100 for this specific answer>
//         }
//       ]
//     }
//   `.trim();

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     // Clean up potential markdown and parse
//     const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
//     return JSON.parse(jsonText);
//   } catch (error) {
//     console.error("Error parsing Gemini analysis response:", error);
//     throw new Error("Could not parse the analysis from Gemini response.");
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

// ✨ FIXED: Initialize genAI and the model once at the top of the file.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Using gemini-1.5-flash for speed and cost-effectiveness

export async function generateQuestions(payload) {
  const { jobRole, techStack, difficulty, duration, jobExperience, company } = payload;

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

    Provide your response as a valid JSON array ONLY, like this example:
    [
      {"id":1,"text":"Explain how closures work in JavaScript.","expectedSeconds":60},
      {"id":2,"text":"Describe your experience with React hooks.","expectedSeconds":45}
    ]
  `.trim();

  try {
    // ✨ FIXED: Use the 'model' variable defined at the top.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown formatting from the response
    const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating questions from Gemini:", error);
    throw new Error("Could not parse questions from the AI response.");
  }
}

export async function analyzeTranscript(transcript) {
  const prompt = `
    You are an expert AI interview coach. Your task is to analyze an interview transcript and provide constructive feedback.
    
    The user was given the following questions and provided these answers:
    ${transcript.map((item, index) => `Question ${index + 1}: ${item.question}\nAnswer ${index + 1}: ${item.answer || "(No answer provided)"}`).join('\n\n')}

    Please analyze the user's performance.
    
    You MUST provide your analysis in the specified JSON format ONLY. Do not include any text or markdown formatting before or after the JSON object.
    The 'questionBreakdown' array MUST contain an entry for every question provided.
    For every entry in the 'questionBreakdown' array, you MUST include a 'score'.
    If an answer is blank, nonsensical, or you cannot determine a score, you MUST assign a score of 0. Do NOT omit the score field for any reason.

    {
      "overallScore": <A numerical score from 0 to 100 for overall performance>,
      "overallFeedback": "<A 2-3 sentence summary of the user's performance>",
      "strengths": ["<A key strength>", "<Another key strength>"],
      "areasForImprovement": ["<A specific area for improvement>", "<Another area>"],
      "questionBreakdown": [
        {
          "question": "<The first question>",
          "answer": "<The user's answer>",
          "feedback": "<Specific feedback for this answer>",
          "score": <A numerical integer score from 0 to 100 for this specific answer. This field is mandatory.>
        }
      ]
    }
  `.trim();

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown and parse
    const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const analysis = JSON.parse(jsonText);

    // --- SAFETY NET: Manually validate the data before returning ---
    // This ensures that even if the AI makes a mistake, your application won't crash.
    if (analysis.questionBreakdown && Array.isArray(analysis.questionBreakdown)) {
        analysis.questionBreakdown.forEach(item => {
            if (item.score === undefined || item.score === null) {
                console.warn("AI response was missing a score. Defaulting to 0.", item);
                item.score = 0; // Assign a default value if missing
            }
        });
    }

    return analysis;
  } catch (error) {
    console.error("Error parsing Gemini analysis response:", error);
    throw new Error("Could not parse the analysis from the AI response.");
  }
}