import express from "express";
import { uploadQuestions , getQuestions } from "../controllers/pyqQuestionsControllers.js";

const router = express.Router();


// Admin
router.post("/upload", uploadQuestions);

// Students
router.get("/", getQuestions);

export default router;
