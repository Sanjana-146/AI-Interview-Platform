import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fName:
    {
        type: String,
        required: true
    },
    lName:
    {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    verifyOtp: { 
        type: String, 
        default: '' 
    },
    verifyOtpExpiresAt: { 
        type: Number, 
        default: 0 
    },
    isAccountVerified: { 
        type: Boolean, 
        default: false 
    },
    resetOtp: { 
        type: String, 
        default: '' 
    },
    resetOtpExpires: { 
        type: Number, 
        default: 0 
    },
})

const UserModel = mongoose.models.user || mongoose.model('user' , UserSchema);

export default UserModel;