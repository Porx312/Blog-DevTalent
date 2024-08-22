import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../model/user.js";
import jwt from "jsonwebtoken"
import Token from "../model/token.js";
dotenv.config();

export const signupUser = async (req, res) => {
    try {
        // Validate input
        const { username, name, password } = req.body;
        if (!username || !name || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const user = new User({
            username,
            name,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({ msg: 'Signup successful' });

    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ msg: 'Error while signing up user' });
    }
};
export const loginUser = async (req, res) => {
    try {
        // Find user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ msg: "Username does not match" });
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password does not match' });
        }

        // Generate JWT tokens
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: "15m" }); // Use "15m" for a short-lived access token
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY, { expiresIn: "7d" }); // Use "7d" for a longer-lived refresh token

        // Store refresh token in the database
        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        // Return tokens and user information
        res.status(200).json({ 
            accessToken, 
            refreshToken, 
            name: user.name, 
            username: user.username 
        });
        
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ msg: 'Error while logging in the user' });
    }
};


export const logoutUser = async (req, res) => {
    const token = req.body.token;

    try {
        // Delete the token from the database
        await Token.deleteOne({ token });

        // Send success response
        return res.status(204).json({ msg: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ msg: 'Error while logging out' });
    }
};
