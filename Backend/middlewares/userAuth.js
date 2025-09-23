// import jwt from 'jsonwebtoken';

// const userAuth = async(req , res , next)=>{
//     const {token} = req.cookies;
//     if(!token){
//         return res.json({success: false , message: "Not Authorized . Login Again"})
//     }

//     try{
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if(tokenDecode.id){
//             req.userId = tokenDecode.id
//         }else{
//             return res.json({success: false , message: "Not Authorized. Login Again"});
//         }
//         next();
//     }
//     catch(error){
//         res.json({success: false , message: error.message});
//     }
// }

// export default userAuth;

import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    //  Use 401 status for "Unauthorized"
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Crucial Step: Find the user in the database to ensure they still exist
    // Also, exclude the password from what we attach to the request
    req.user = await UserModel.findById(decoded.id).select('-password');

    // If user is not found in DB (e.g., deleted), deny access
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found.' });
    }
    
    next(); // All good, proceed to the next function
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

export default authMiddleware;