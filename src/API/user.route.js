import express from "express";
import { registerUserValidationSchema } from "../models/user.validation.js";
import { User } from "../models/user.model.js";
import { registerUser, validateNewUser } from "../models/user.service.js";

const router = express.Router();

// CREATE

router.post(
  "/user/login",
  async (req, res, next) => {
    const newUser = req.body;

    //validating new user

    try {
      await registerUserValidationSchema.validate(newUser);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    const newUser = req.body;

    try {
      await User.create(newUser);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(200).send("User is registered Successfully");
  }
);

//READ
router.get("/user/details/:id", async (req, res) => {
  const userId = req.params.id;

  //finding user with the given id
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).send("No user with given id");
  }

  return res.status(200).send(user);
});

//UPDATE
router.put("/user/edit/:id", async (req, res, next) => {
  const updateId = req.params.id;
  const user = await User.findOne({ _id: updateId });
  if (!user) {
    return res.status(404).send("No user with this Id");
  }
  //validate the upated information
  const updateInfo = req.body;
  try {
    registerUserValidationSchema.validate(updateInfo);
  } catch (error) {
    return res.status(200).send({ message: error.message });
  }
  // store the updated data on database

  const newUserDetails = req.body;
  await User.updateOne(
    { _id: updateId },
    {
      $set: {
        firstName: newUserDetails.firstName,
        lastName: newUserDetails.lastName,
        date: newUserDetails.date,
        email: newUserDetails.email,
        country: newUserDetails.country,
        city: newUserDetails.city,
        contactNumber: newUserDetails.contactNumber,
        gender: newUserDetails.gender,
      },
    }
  );

  return res.status(200).send({ message: "Users data edited Successfully" });
});

//DELETE
router.delete("/user/delete/:id",async(req,res)=>{
    const deleteId=req.params.id;
    const user =await User.findOne({_id:deleteId});
    if(!user){
        return res.status(404).send("No user with this Id");
    }
    //if user exists 
    await User.deleteOne({_id:deleteId});
    return res.status(200).send("User deleted Sucessfully");
})

//sending json data as a response in the froentend 

router.get('/api/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).send(err);
  }
});

//handling user registration 
router.post("/submit/register",validateNewUser,registerUser);





export default router;
