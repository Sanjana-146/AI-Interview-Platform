import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      default: "IPS Academy"
    },

    company: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["Tech", "Non-Tech"],
      required: true
    },

    round: {
      type: String,
      enum: ["Coding", "Interview"],
      required: true
    },

    timeRange: {
      type: String, // 15 Days, 1 Month etc.
      required: true
    },

    questions: {
      type: [String],
      required: true
    },

    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("pyqQuestions", questionSchema);
