import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res
              .status(400)
              .json({ msg: "Not all fields have been entered. " });

  
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
              .status(400)
              .json({ msg: "An account with this email already exists." });
        

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET); 
        res.status(200).json({
            token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login 

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res
              .status(400)
              .json({ msg: "Not all fields have been entered. " });

        const user = await User.findOne({ email: email });
        if (!user)
            return res
              .status(400)
              .json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res
              .status(400)
              .json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}