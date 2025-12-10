import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};
