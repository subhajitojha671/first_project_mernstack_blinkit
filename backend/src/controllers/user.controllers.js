import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { sendOtp } from "../utils/smsSender.js";
import jwt from "jsonwebtoken"

//gerenate the accessToken and refreshToken both by this  function 
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    
    const user = await User.findById(userId); // find the user by userId from db 
    // here genarate the refresh and access token for particular  user
    const refreshToken = user.generateRefreshToken(); 
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken; // update the refresh token of user model  refresh token field 
    await user.save({ validateBeforeSave: false }); // save the change without validate

    return { accessToken, refreshToken }; 
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

const sendingSms = async (phoneNumber , otp)=>{
  try {
  return await sendOtp(phoneNumber , otp);   // no +
   
  } catch (error) {
    throw new ApiError(400 , "sending sms error :: ",error.message);
  }
}

export const registerUser = asyncHandler(async (req, res)=>{
    const { phoneNumber, address } = req.body; // taking the this data  from the user  by body or form 

  console.log("Data from request:", phoneNumber, address);
  if(!phoneNumber) // check  if phone  is empty or not
  {
    throw new ApiError(400 , "Phone number is required");
  }

  if(phoneNumber.length !== 12) // check length of the  phone number is equal to the 12 with country code
  {
    throw new ApiError(400 , "Invalid phone number"); //if length not equal to 12  , throw error
  }
  const user = await User.findOne({phoneNumber}); // find  the user in db , to check have any user  with same phone  number  if find then throw error
  



 const otp =  Math.floor(1000 + Math.random() * 9000).toString();  // genarate the otp , which length is 4

  const result = await sendingSms(phoneNumber ,otp); // sending sms with passing phone number and  otp 
  //console.log("informaton about the sending sms" ,result)
  if(result.success===false) // if failed  to sent sms  then throw error
  {
    throw new ApiError(400 , `failed sent sms ${result.error.Details} `)
  }

 if(user)
 {
     user.otp = otp;
     user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
 }else{

  const user = await User.create({ // create user 
    phoneNumber:phoneNumber,
    address:address,
    otp,
    otpExpiry: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
    isVerify: false,

  })
}
  
  //temp token genarate for identify  the user id 
  const tempToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );


  const data ={ // create the object user and pass into response
    user,
    tempToken


  }
  
return res
    .status(201)
    .json(new ApiResponse(201,data, "User created successfully"));


})

export const verifyOtp = asyncHandler(async (req, res) => {
  const { tempToken, otp } = req.body;  

  if (!tempToken || !otp) throw new ApiError(400, "Temp token and OTP are required"); // if  not sent user those then throw error

  console.log("OTP and Temp Token:", otp, tempToken);

  const decoded = jwt.verify(tempToken, process.env.ACCESS_TOKEN_SECRET); // decode the tempToken to get accual userId , which  created  at the time of  create temp token
  const userId = decoded.userId;

  const user = await User.findById(userId).select("+otp +otpExpiry -refreshToken"); //find user base on this decoded userId
  if (!user) throw new ApiError(404, "User not found");
 // if (user.isVerify) throw new ApiError(400, "User already verified"); // check user already verify or not


  //otp validation 
  if (user.otp !== otp.toString()) throw new ApiError(400, "Invalid OTP"); 
  if (user.otpExpiry < Date.now()) throw new ApiError(400, "OTP expired");


  //update  this field 
  user.isVerify = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  

  //genarating both token 
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userId);
  console.log("Sending cookies:", accessToken, refreshToken);

const options = {
  httpOnly: true,
  secure: false, // false  because testing to the  localhost
  sameSite: "lax"
};

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully")); // we get the data for middleware verifyJWT , so we can user info by  req.user 
});

export const logoutUser = asyncHandler(async (req, res) => {

 
  await User.findByIdAndUpdate( // remove the token from user refreshToken 
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true } // return new data of the user  after the updating
  );

  // Cookie options must MATCH how cookies were created
  const options = {
    httpOnly: true,
    secure: false,      //for test in localhost
    sameSite: "lax",
  };


  // in res remove  all token 
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get refresh token from cookies or body
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // Verify refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find user from decoded ID
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token - user not found");
    }

    // Check if the stored refresh token matches
    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token has expired or is invalid");
    }

    // Generate new tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: false,
      sameSite:"lax"
    };

    // Send new tokens
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed")
      );
  } catch (error) {
    console.error("Token refresh error:", error);
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});
