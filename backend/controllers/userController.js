import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// API to register user

const registerUser = async(req ,res)=>{
    try {
        const {name,email,password,role} = req.body;
        if(!name || !password || !email){
            return res.json({success:false,message:"Missing Details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }

        //validating strong password
        if(password.length<8){
            return res.json({success:false,message:"Password should be at least 8 characters long"})
        }
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.json({success:false,message:"User already exists"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //saving user document
        const userData = {
            name,
            email,
            password:hashedPassword,
            role
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();        
        if(!newUser){
            return res.json({success:false,message:"Error creating user"});
        }
        const token = await jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(201).json({success:true,message:"User registered successfully",token,role:user.role});
    } catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// API to login user

const loginUser = async(req ,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(isValidPassword){
            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
            res.json({success:true,message:"User logged in Successfully",token,role:user.role})
        }else{
            return res.json({success:false,message: "Invalid password" })
        }   
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }

  //API to get user profile data 
 const getUserProfile = async(req,res)=>{
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }
export {registerUser,loginUser,getUserProfile} 