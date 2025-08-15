import UserModel from "../models/userModel.js";

export const getUserData = async(req , res) =>{
   try{
    const {userId} = req.body;

    const user = await UserModel.findById(userId);

    if(!user){
        return res.json({success: false , message: "user not found"})
    }

    res.json({
        success: true,
        UserData:{
            name: user.name,
            isAccountverified: user.isAccountverified
        }
    });
   }
   catch(error){
     res.json({success: false , message: error.message})
   }
}