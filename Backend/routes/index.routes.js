import Express from "express";
import auth_router from "./auth.js"; 
const router = Express.Router();

router.use('/auth', auth_router);

router.get('/', (req, res) => {
    res.send('Welcome to Surge-Gram API');
});

export default router;
