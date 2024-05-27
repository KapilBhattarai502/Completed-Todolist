import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { emailValidationSchema } from "./todo.validation.schema.js";

export const validateUserEmail = async (req, res, next) => {
    const loginCredentials = req.body;

    try {
        await emailValidationSchema.validate(loginCredentials.email);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    next();
};

export const loginUser = async (req, res) => {
    const loginCredentials = req.body;

    const user = await User.findOne({ email: loginCredentials.email });

    if (!user) {
        return res.status(404).json({ message: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(loginCredentials.password, user.password);

    if (!passwordMatch) {
        return res.status(404).json({ message: "Invalid Credentials" });
    }

    // Assuming you have a homepage URL, you can send it as a redirect
    return res.status(200).json({ redirect: '/Homepage.html' });
};
