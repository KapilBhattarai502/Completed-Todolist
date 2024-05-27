import mongoose from "mongoose";

const {Schema}=mongoose;

const userSchema =new Schema ({
    username:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true,
        default:Date.now,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    }



    
})
export const User=mongoose.model('User',userSchema);