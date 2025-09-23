import express from 'express';
import { generateAndSaveFeedback , getFeedback } from '../controllers/feedbackController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

// Route to generate and save feedback for a specific interview session
// POST /api/feedback/:sessionId/analyze
router.post('/:sessionId/analyze', userAuth, generateAndSaveFeedback);

router.get('/:interviewId', userAuth, getFeedback);

// You could add other feedback routes here later, e.g., GET /feedback/:sessionId
export default router;