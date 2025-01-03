import express from 'express';
import { login, register } from '../Controllers/auth.js'; 

const auth_router = express.Router(); 


auth_router.post('/register', register);
auth_router.post('/login', login);

export default auth_router;
