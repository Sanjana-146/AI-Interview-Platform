import InterviewModel from "../models/interviewFormModel.js";
import {generateQuestions} from "../utils/geminiai.js";

export const submitInterviewForm = async ( req , res) =>{
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
  const userId = req.userId;

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

    res.status(201).json({
      success: true,
      message: "Interview form submitted successfully",
      questions,
      sessionId: interviewData._id,
    });

  } catch (error) {
    console.error("Error in submitInterviewForm:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default submitInterviewForm;
