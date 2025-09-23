import mongoose from "mongoose";
const { Schema } = mongoose;

const InterviewFormSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user", // Should match your UserModel collection name
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
      trim: true,
    },
    jobExperience: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // Changed from String to Number
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    techStack: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // Add resumePath to the schema
    resumePath: {
      type: String,
      required: true,
    },
    status: {
    type: String,
    enum: ['pending', 'completed'], // Use enum for defined states
    default: 'pending'
  },
  },
  { timestamps: true }
);

const InterviewModel = mongoose.models.interviews || mongoose.model('interviews', InterviewFormSchema);
export default InterviewModel;
