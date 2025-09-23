import { text } from "express";
import InterviewModel from "../models/interviewFormModel.js";
import { generateQuestions } from "../utils/geminiai.js";

export const submitInterviewForm = async (req, res) => {
  // Multer populates req.body with text fields and req.file with the file
  const {
    company,
    jobRole,
    jobExperience,
    duration,
    difficulty,
    techStack,
  } = req.body;
  const resume = req.file;

  // The userId is assumed to be handled by your userAuth middleware
  const userId = req.user._id;

  // Check for missing fields, including the resume file
  if (
    !company ||
    !jobRole ||
    jobExperience === undefined ||
    !duration ||
    !difficulty ||
    !techStack ||
    !resume
  ) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const interviewData = new InterviewModel({
      userId,
      company,
      jobRole,
      jobExperience: Number(jobExperience),
      duration: Number(duration), // Convert duration to number
      difficulty,
      techStack,
      resumePath: resume.path // Save the path to the uploaded resume
    });

    await interviewData.save();

    const questions = await generateQuestions({
      company,
      jobRole,
      jobDescription: company, // Using company as a proxy for job description
      jobExperience: Number(jobExperience),
      duration: Number(duration),
      difficulty,
      techStack
    });

    const introQues = {
      id: 1,
      text: "Tell me about yourself.",
      expectedSeconds: 90
    };

    const finalQuestions = [introQues];
    if(questions && Array.isArray(questions)){
      questions.forEach((q,index)=>{
        finalQuestions.push({
          ...q,
          id: index+2
        });
      });
    }
    res.status(201).json({
      success: true,
      message: "Interview form submitted successfully",
      questions: finalQuestions,
      sessionId: interviewData._id,
    });
  } catch (error) {
    console.error("Error in submitInterviewForm:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ New controller function to get user's interviews
export const getUserInterviews = async (req, res) => {
  try {
    // Get the user's ID from the auth middleware
    const userId = req.user._id;

    // Find all interviews that match the userId and sort them by most recent
    const interviews = await InterviewModel.find({
      userId: userId,
      status: 'completed' // <-- Add this filter=
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, interviews });

  } catch (error) {
    console.error("Error fetching user interviews:", error);
    res.status(500).json({ success: false, message: "Failed to fetch interviews." });
  }
};

