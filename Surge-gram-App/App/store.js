import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../features/auth/authSlice.js";

const store = configureStore({
    reducer: {
        auth: authreducer
    }
});

export default store;