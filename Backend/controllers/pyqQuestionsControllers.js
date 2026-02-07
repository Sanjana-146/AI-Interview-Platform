import pyqQuestionsModel from "../models/pyqQuestionsModel.js";

/* ================= ADMIN UPLOAD ================= */
export const uploadQuestions = async (req, res) => {
  try {
    const data = req.body;

    if (!data.questions || data.questions.length === 0) {
      return res.status(400).json({ message: "No questions provided" });
    }

    const saved = await pyqQuestionsModel.create(data);

    res.status(201).json({
      success: true,
      message: "Questions uploaded successfully",
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= STUDENT FETCH ================= */
export const getQuestions = async (req, res) => {
  try {
    const { company, role, round } = req.query;

    let filter = {};
    if (company) filter.company = company;
    if (role) filter.role = role;
    if (round) filter.round = round;

    const questions = await pyqQuestionsModel.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};