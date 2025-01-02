import Express from "express";



const router = Express.Router();

// Import your route handlers here
// const userRoutes = require('./user.routes');
// const postRoutes = require('./post.routes');

// Define your routes here
// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);

router.get('/', (req, res) => {
    res.send('Welcome to Surge-Gram API');
});

export default router;

