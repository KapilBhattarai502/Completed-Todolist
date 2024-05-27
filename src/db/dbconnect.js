import mongoose from "mongoose";
import 'dotenv/config';

const dbConnect =async()=>{
    try{

        await mongoose.connect(`mongodb+srv://kapilbhattarai502:${process.env.DB_PASSWORD}@trainingdatabase.jyqv7zv.mongodb.net/`);
        console.log("DB CONNECTED SUCESSFULLY!!!");

    }catch(error){
        console.log("Problem in Connecting....");
        console.log(error.message);
        

    }

}
export {dbConnect};