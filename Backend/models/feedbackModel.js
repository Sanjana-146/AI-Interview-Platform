import mongoose from "mongoose";

const questionBreakdownSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  feedback: { type: String, required: true },
  score: { type: Number, required: true },
}, { _id: false }); // No separate _id for subdocuments

const feedbackSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interviews',
    required: true,
    unique: true, // Ensures only one feedback document per interview
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  overallScore: { type: Number, required: true },
  overallFeedback: { type: String, required: true },
  strengths: [String],
  areasForImprovement: [String],
  questionBreakdown: [questionBreakdownSchema],
}, { timestamps: true });

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

export default FeedbackModel;