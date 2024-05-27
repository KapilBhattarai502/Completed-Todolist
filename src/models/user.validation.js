import * as Yup from "yup";

export const registerUserValidationSchema=Yup.object({
    username:Yup.string().max(55,"first name must be at max 55 characters").trim().required("username is required"),
    
    
    email:Yup.string().email().required("Email is required"),
   
    password:Yup.string().required("Password is required")



})