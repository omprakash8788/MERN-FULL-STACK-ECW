
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const createToken = (id)=>{
    return jwt.sign({
        id,
    },process.env.JWT_SECRET )
}

// Route for user login logic
const loginUser = async(req, res)=>{
  

    try {
        const {email, password}=req.body;
    
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User does not exists"});
        }
        // if user match
        const isMatch = await bcrypt.compare(password, user.password)
        //  user.password <--- This is the password we save in database
        // check 
        if(isMatch){
            // then generate token
            const token = createToken(user._id)
            res.json({
                success:true,
                token
            })
        }
        else{
            // generate response if invalid details 
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error);
        // Genereate response if any error while login
        res.json({success:false, message:error.message})
        
        
    }

}

// Route for user registration
const registerUser = async(req, res)=>{

    try {
        const {name, email, password}= req.body; 

        
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User Already Exists"});
          
        }

        // Validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please Enter a valid email"});
        }

        // check password
           if(password.length<8){
            return res.json({success:false, message:"Please enter a strong password"});
        }

        // hashing user password -> hash the password And store that in data base
        const salt = await bcrypt.genSalt(10);
        // using this salt we can hash the user password
        const hashedPassword = await bcrypt.hash(password, salt);


        // After that create the user
        const newUser = new userModel({
            // here provide user details
            name,
            email,
            password:hashedPassword
        })
        // After that save the user in database.
        const user = await newUser.save(); 
        const token = createToken(user._id);
        // After set token as a response
        res.json({success:true, token})

         
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    

}


// Route for Admin login
const adminLogin=async(req,res)=>{

}


export {loginUser, registerUser, adminLogin}