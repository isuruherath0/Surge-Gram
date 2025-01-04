import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/post";

const getAllPosts = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};



export default { getAllPosts };