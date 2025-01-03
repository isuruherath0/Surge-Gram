import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    imageurl: { type: String, required: true },
    noOfLikes: { type: Number, required: true , default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export default Post;