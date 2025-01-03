import express from 'express';
import { createPost , getAllPosts } from '../Controllers/Post.js';
import { verifyToken } from '../Middleware/authToken.js';

const post_router = express.Router();

post_router.get('/all', getAllPosts);

post_router.post('/create', verifyToken, createPost);

export default post_router;