import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must have at least 8 characters."],
    // maxLength: [32, "Password cannot have more than 32 characters."],
    // select: false, // Do not return password in queries by default
  },
  createdAt:{type:Date,default:Date.now()}
});

export default mongoose.model("User", userSchema);