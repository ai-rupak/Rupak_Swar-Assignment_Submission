import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must have at least 8 characters."],
  },
  role: {
    type: String,
    enum: ["accountant", "manager"],
    // default: "accountant",
  },
  createdAt:{type:Date,default:Date.now()}
});

export default mongoose.model("User", userSchema);