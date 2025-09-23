import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { getMe , updateUser, uploadProfilePic } from '../controllers/userController.js';
import upload from '../config/cloudinary.js';

const userRouter = express.Router();

userRouter.get('/Me' , userAuth , getMe); // Get current user data
userRouter.put('/updateUser' , userAuth , updateUser); // update user data
userRouter.post('/upload-pic' , userAuth , upload.single('profilePic'), uploadProfilePic); // update user profile-picture

export default userRouter;