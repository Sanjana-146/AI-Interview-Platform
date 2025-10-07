import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'; // To load your .env file

// FIX: Removed the extra, nested runTest function definition.
async function runTest() {
    try {
        // --- ADD THIS BLOCK TO DEBUG ---
        console.log("--- Checking Environment Variables ---");
        console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
        console.log("---------------------------------");
        // --- END DEBUG BLOCK ---

        console.log("Starting Gemini test...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Model initialized successfully.");

        const prompt = "What is the capital of France? Respond in one word.";
    
        console.log("Generating content...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("--- SUCCESS ---");
        console.log("Gemini Response:", text);
        console.log("-----------------");

    } catch (error) {
        console.error("--- TEST FAILED ---");
        console.error("The test script encountered an error:", error);
        console.error("-------------------");
    }
}

runTest();

    
