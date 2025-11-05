import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from  './routes/authroutes.js';
import userRouter from "./routes/userRoutes.js";
import interviewRouter from "./routes/interviewroutes.js";
import feedbackRoutes from './routes/feedbackroutes.js'; 
import contactRouter from "./routes/contactUs.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://ai-interview-platform-frontend.onrender.com' // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

app.use(cookieParser());

// API Endpoints
app.get('/' , (req , res)=> res.send("API is working"));
app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)
app.use('/api/interview' , interviewRouter)
app.use('/api/feedback' , feedbackRoutes)
app.use('/api' , contactRouter)

app.listen(port , ()=> console.log(`Server is running on PORT: ${port}`));
