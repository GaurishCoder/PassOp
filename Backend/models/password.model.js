import mongoose, { Types } from "mongoose";
import jwt from "jsonwebtoken"

const passwordSchema = mongoose.Schema({
  url: {
    type: String,
    unquie: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unquie: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    unquie: true,
    required: true,
    trim: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
});

const Password = mongoose.model("Password", passwordSchema);

passwordSchema.methods.generateToken = (passwordData)=>{
    return jwt.sign(passwordData,process.env.JWT_SECRET)
}

export default Password;