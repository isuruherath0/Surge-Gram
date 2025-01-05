import {createSlice  , createAsyncThunk} from '@reduxjs/toolkit'; 
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');


const initialState = {
    user: user ? user : null,
    token : token ? token : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

//createAsyncThunk

//login

export const login = createAsyncThunk("auth/login", async (user , thunkAPI) => {
    try {
        return await authService.login(user);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }

})


//register

export const register = createAsyncThunk("auth/register", async (user , thunkAPI) => {
    try {
        return await authService.register(user);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }

})

//logout

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.isError = true;
            state.message = action.payload;
        },
        clearError: (state) => {
            state.isError = false;
            state.message = "";
        },
        clearSuccess: (state) => {
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.token = null;
        });
    }
})

export const { setError, clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;




