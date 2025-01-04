import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const getPosts = createAsyncThunk("posts/getPosts", async (_,thunkAPI) => {
    try {
        const response = await postService.getAllPosts();
        return response; 
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }

})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset : (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getPosts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.posts = action.payload; 
          })
          .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to fetch posts";
          });
      }
      
})

export const { reset } = postSlice.actions;
export default postSlice.reducer;