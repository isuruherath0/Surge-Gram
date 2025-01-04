import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../features/auth/authSlice.js";
import postreducer from "../features/posts/postSlice.js";

const store = configureStore({
    reducer: {
        auth: authreducer,
        post: postreducer
    }
});

export default store;