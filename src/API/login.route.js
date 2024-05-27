import express from "express";
import { loginUser, validateUserEmail } from "../models/login.service.js";
const router=express.Router();

router.post("/submit/login",validateUserEmail,loginUser);

export default router;