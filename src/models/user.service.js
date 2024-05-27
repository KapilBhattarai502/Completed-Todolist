import { registerUserValidationSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import * as bcrypt from "bcrypt";

export const validateNewUser =async(req,res,next)=>{
    //extract new user data from req body 
    const newUser=req.body;
    //validate new user 
    try{
        await registerUserValidationSchema.validate(newUser)
    } catch(error){
        // if validation fails,throw error 
        return res.status(400).send({message:error.message});
    }
    next();}

    export const registerUser=async(req,res)=>{
    
        //extract new user data from req.body
        const newUser=req.body;
        //check if user with this email exists 
        const user =await User.findOne({email:newUser.email});
    
        
        if(user){
            return res.status(409).send({message:"User with this email already exists"});
    
        }
        //hash password using bcrypt
        const hashedPassword=await bcrypt.hash(newUser.password,10);
        // // console.log(hashedPassword);
        newUser.password=hashedPassword;
    
        //create user
        await User.create(newUser);
    
        return res.status(201).send({message:"user is registered suceessfully "});
    
    }
