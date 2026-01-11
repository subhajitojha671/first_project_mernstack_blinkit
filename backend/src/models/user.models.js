import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
   
phoneNumber:{
    type: Number,
    required: true,
   
    unique:true,
    index:true,
},
role:{
    type:String,
    enum: ["admin","user","seller","deliveryPatner"],
    default: "user",
},
address:{
 type:String,

},
otp:{
    type:String,
    select:false,
},
  otpExpiry: {
      type: Date,
      select: false,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
refreshToken:{
    type:String
}


})

// userSchema.pre("save",async function(next){
//     if(!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password , 10);
//     next();
// })
// userSchema.methods.isPasswordCorrect = async function (password)
// {
//     return await bcrypt.compare(password , this.password);
// }

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      phoneNumber:this.phoneNumber
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m", 
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d", // ✅ fallback
    }
  );
};
const User = mongoose.model("User",userSchema);
export {User};