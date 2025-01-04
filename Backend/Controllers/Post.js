import Post from "../Models/Post.js";
import jwt from "jsonwebtoken";

//Get all Posts

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user' , 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//create a new post

export const createPost = async (req, res) => {
    try {
        const { imageurl } = req.body;
        let  token = req.header("Authorization");

        if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
        }
          
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res
              .status(401)
              .json({ msg: "Token verification failed, authorization denied" });

        const newPost = new Post({
            imageurl,
            user: verified.id
        });

        const savedPost = await newPost.save();

        res.status(200).json(savedPost);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//add a like or remove like  to a post 

export const addLikeorRemoveLike = async (req, res) => {
    try {
        let  token = req.header("Authorization");

        if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
        }
          
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res
              .status(401)
              .json({ msg: "Token verification failed, authorization denied" });

        
        const id = req.body.id;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        

        if (!post.likes.includes(verified.id)) {
            post.likes.push(verified.id);
        } else {
            post.likes = post.likes.filter((userId) => userId.toString() !== verified.id.toString());
        }

        await post.save();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




