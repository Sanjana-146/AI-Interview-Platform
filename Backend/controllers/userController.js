import UserModel from "../models/userModel.js";

// export const getUserData = async(req , res) =>{
//    try{
//     const {userId} = req.body;

//     const user = await UserModel.findById(userId);

//     if(!user){
//         return res.json({success: false , message: "user not found"})
//     }

//     res.json({
//         success: true,
//         UserData:{
//             name: user.name,
//             isAccountverified: user.isAccountverified
//         }
//     });
//    }
//    catch(error){
//      res.json({success: false , message: error.message})
//    }
// }

//  Get Logged-in User's Data
export const getMe = async (req, res) => {
  try {
    // req.user is attached by the authMiddleware
    const user = req.user;
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Update User Details
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id; // from authMiddleware
    const updateData = {};
    if (req.body.fName) updateData.fName = req.body.fName;
    if (req.body.lName) updateData.lName = req.body.lName;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.phone) updateData.phone = req.body.phone;
    if (req.body.profilePic) updateData.profilePic = req.body.profilePic;


    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData }, // Use the dynamically built object
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.json({ success: true, message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Controller to handle profile picture upload
export const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const userId = req.user._id;
        const profilePicUrl = req.file.path; // The secure URL from Cloudinary

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { profilePic: profilePicUrl },
            { new: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile picture updated!", user: updatedUser });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error uploading image." });
    }
};