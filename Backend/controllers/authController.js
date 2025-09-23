import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from "../config/nodemailer.js";

export const signup = async (req, res) => {
    const { fName, lName, email, phone, password } = req.body;

    if (!fName || !lName || !email || !password || !phone) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            fName,
            lName, 
            email,
            phone,
            password: hashedPassword,
            
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Welocome Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject:'Welcome To AI-Interview Preparation Platform',
            text: `Welcome to our Website. Your account has been created with eamil id: ${email}`
        }
        await transporter.sendMail(mailOptions);
        return res.json({
      success: true,
      user: {
        _id: user._id,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        phone: user.phone,
      },
    });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid Email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            user: {
                _id: user._id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async(req , res) =>{
    try{
        res.clearCookie('token' , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({success: true , message: 'Logged Out'});
    }catch(error){
        return res.json({success: false , message: error.message});
    }
}

// Send Verification OTP to user's Email
export const sendVerifyOtp = async(req , res)=>{
    try{
        const{userId} = req.body;

        const user = await UserModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false , message: "Account Already Verifed"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Account Verification OTP',
            text: `Your OtP is ${otp}. Verify Your account using this OTP.`
        }
        await transporter.sendMail(mailOptions);

        res.json({success: true , message: 'Verification OTP Sent on email'})
    }catch(error){
        res.json({success: false , message: error.message});
    }
}

export const verifyEmail = async (req , res) =>{
    const{userId , otp} = req.body;

    if(!userId || !otp) {
        return res.json({success: false , message: "Missing details"});
    }
    try{
        const user = await UserModel.findById(userId);

        if(!user){
            return res.json({success: false , message: 'User not found'});
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success: false , message: "Invalid Otp"});
        }

        if(user.verifyOtpExpiresAt < Date.now()){
            return res.json({success: false , message: "OTP Expired"});
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiresAt = 0;

        await user.save();
        return res.json({success: true , message: "Email Verified Successfully"});
            
    }catch(error){
        return res.json({success: false , message: error.message});
    }

}

// Is user Authenticated
export const isAuthenticated = async(req ,res) =>{
    try{
        return res.json({success: true});
    }catch(error){
        return res.json({success: false , message: error.message});
    }
}

export const sendResetOtp = async(req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success: false , message: "email required"})
    }
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success: false , message: "USer not found"});
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resettOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Account Verification OTP',
            text: `Your OtP is ${otp}. Verify Your account using this OTP.`
        }
        await transporter.sendMail(mailOptions);
        return res.json({success: true , message: "Otp sent to your email"});
    }catch(error){
        return res.json({success: false , message: error.message00});
    }
}

// Reset PAssword
export const resetPassword = async(req,res)=>{
    const {email , otp , newPassword} = req.body;

    if(!email || !otp || ! newPassword){
        return res.json({success: false , message: "Email , OTP and newPAssword are required"});
    }
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success: false , message: "USer not found"});
        }
        if(user.resetOtp === ' ' || user.resetOtp !== otp){
            return res.json({success: false , message: "Invalid OTP"});
        }
        if(user.resettOtpExpiresAt < Date.now()){
            return res.json({success: false , message: "OTP Expired"});
        }
        const hashedPassword = await bcrypt.hash(newPassword , 10);
        user.password = hashedPassword;
        user.resetOtp = ' ';
        user.resettOtpExpiresAt = 0;
        await user.save();

        return res.json({success: true , message: "password has been reset successfully"})
    }catch(error){
return res.json({success: false , message: error.message});
    }
}