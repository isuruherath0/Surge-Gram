import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/post";

const getAllPosts = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};

const addLikeorRemoveLike = async (postId, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/like`, 
            { id: postId }, 
            { 
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error in liking or removing like:", error);
        throw error; 
    }
};

export default { getAllPosts , addLikeorRemoveLike };