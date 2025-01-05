import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/auth";   

//Login 

export const login = async (userdata) => {

    const response = await axios.post(`${API_URL}/login`, userdata );

    if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const register = async (formData) => {
    const response = await axios.post(`${API_URL}/register`, formData);
    if (response.status === 200) {
        // const token = response.data.token;
        // localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export default { login, register, logout, getCurrentUser, getToken };


