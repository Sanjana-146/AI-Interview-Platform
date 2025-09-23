import FeedbackModel from "../models/feedbackModel.js";
import InterviewModel from "../models/interviewFormModel.js";
import { analyzeTranscript } from "../utils/geminiai.js";

export const generateAndSaveFeedback = async (req, res) => {
  const { sessionId } = req.params;
  const { transcript } = req.body;
  const userId = req.user._id; // From your auth middleware

  if (!sessionId || !transcript || !Array.isArray(transcript) || transcript.length === 0) {
    return res.status(400).json({ success: false, message: "Session ID and a valid transcript are required." });
  }

  try {
    // 1. Check if the interview session exists and belongs to the user
    const interview = await InterviewModel.findOne({ _id: sessionId, userId });
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview session not found." });
    }

    // Optional: Check if feedback already exists for this session
    const existingFeedback = await FeedbackModel.findOne({ interviewId: sessionId });
    if (existingFeedback) {
        return res.status(409).json({ success: false, message: "Feedback for this session has already been generated.", feedback: existingFeedback });
    }

    // 2. Get the analysis from the AI
    const analysisResult = await analyzeTranscript(transcript);

    // 3. Create a new feedback document
    const newFeedback = new FeedbackModel({
      interviewId: sessionId,
      userId: userId,
      ...analysisResult // Spread the results from the AI
    });

    // 4. Save the feedback
    await newFeedback.save();

    // 5. Update the original interview's status to 'completed'
    interview.status = 'completed';
    await interview.save();

    // 6. Send the feedback back to the client
    res.status(201).json({
      success: true,
      message: "Feedback generated successfully.",
      feedback: newFeedback
    });

  } catch (error) {
    console.error("Error in generateAndSaveFeedback:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ New controller function to get feedback by interview ID
export const getFeedback = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const userId = req.user._id;

        // Find the feedback ensuring it belongs to the logged-in user for security
        const feedback = await FeedbackModel.findOne({ interviewId, userId });

        if (!feedback) {
            return res.status(404).json({ success: false, message: "Feedback not found for this session." });
        }

        res.status(200).json({ success: true, feedback });

    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ success: false, message: "Server error while fetching feedback." });
    }
};