import express from "express";
import { loginUser,logoutUser, signupUser } from "../controller/user-controller.js";
import { authenticateToken, createNewToken } from "../controller/jwt-controller.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controller/post-controller.js";

const router = express.Router();

// Define the /login route
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);

router.post("toke", createNewToken)

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);


router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);


// Export the router to use in your main server file
export default router;
