import express from "express";
import path from "path";
import { dirname } from "path";
import { dbConnect } from "./db/dbconnect.js";
import { fileURLToPath } from "url";
import userRoutes from "./API/user.route.js";
import todoRoutes from "./API/todo.routes.js";
import loginRoutes from "./API/login.route.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

//Middleware to parse URL-encoded payloads

app.use(express.urlencoded({ extended: true }));

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

// console.log(path.join(__dirname,"../public"));

// joining to the routes

app.use(userRoutes);
app.use(todoRoutes);
app.use(loginRoutes);
dbConnect();


app.post("/submit/login",(req,res)=>{

  console.log(req.body);

 
})

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening to port number ${port}`);
});

