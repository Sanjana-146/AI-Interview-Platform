import { isAuthenticated, logout, resetPassword, sendResetOtp, sendVerifyOtp, signin, signup , verifyEmail } from "../controllers/authController.js";
import express from 'express';
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post('/signup' , signup);
authRouter.post('/signin' , signin);
authRouter.post('/logout' , logout);
authRouter.post('/send-verify-otp' , userAuth , sendVerifyOtp);
authRouter.post('/verify-account' , userAuth , verifyEmail);
authRouter.post('/is-auth' , userAuth , isAuthenticated);
authRouter.post('/send-reset-otp' , userAuth , sendResetOtp);
authRouter.post('/reset-password' , userAuth , resetPassword);

export default authRouter;
