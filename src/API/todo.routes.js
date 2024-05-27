import express from "express";
import { Todo } from "../models/todo.model.js";
import { todoValidationSchema } from "../models/todo.validation.schema.js";
const router =express.Router();



router.post("/submit/todo",async(req,res)=>{
    const newTodo=req.body;
    try{
        await todoValidationSchema.validate(newTodo);

    }
    catch (error){

        return res.status(400).send({message:error.message});
    }
    await Todo.create(newTodo);
    
    return res.status(201).send({message:`Todo  is added sucessfully`});


})

router.get("/get/todolist",async(req,res)=>{
    try{
        const data =await Todo.find();
        res.json(data);

    }catch(error){

        res.status(500).send(error);
    }
});
export default router;