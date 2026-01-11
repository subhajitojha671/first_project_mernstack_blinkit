import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler } from "../utils/ayncHandler.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req , res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer"," ");

        if(!token)
        {
            throw new ApiError(401 , "Unauthorization request , token not found");

        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user)
        {
            throw new ApiError(401, "Invalid access token , user not found")
        }

        req.user=user;
        next();
    } catch (error) {
         console.error("JWT Verification Error:", error.message);
    throw new ApiError(401, "Invalid or expired access token");
        
    }
})