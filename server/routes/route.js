import express from "express";
import { loginUser,logoutUser, signupUser } from "../controller/user-controller.js";

const router = express.Router();

// Define the /login route
router.post('/login', loginUser);
router.post('/register', signupUser);
router.post('/logout', logoutUser);

// Export the router to use in your main server file
export default router;
