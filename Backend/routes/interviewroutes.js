import express from "express";
import userAuth from "../middleware/userAuth.js";
import { submitInterviewForm } from "../controller/interviewController.js";
import multer from "multer";

const interviewRouter = express.Router();

// 1. Configure multer to save uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure you have an 'uploads' directory in your backend root
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// 2. Apply the 'upload.single('resume')' middleware first to parse the form data.
// The 'userAuth' middleware runs after the body has been populated.
interviewRouter.post("/submitForm", upload.single('resume'), userAuth, submitInterviewForm);

export default interviewRouter;
