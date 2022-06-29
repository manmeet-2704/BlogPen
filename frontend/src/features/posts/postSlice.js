import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postService from './postService'

const initialState={
  posts: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const createPost = createAsyncThunk('post/create', async (postData, thunkAPI) => {
  try {
    const token=thunkAPI.getState().auth.user.token
    return await postService.createPost(postData,token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const getPosts = createAsyncThunk('post/getAll', async (_, thunkAPI) => {
  try {
    const token=thunkAPI.getState().auth.user.token
    return await postService.getPosts(token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const getPost = createAsyncThunk('post/get', async (postId, thunkAPI) => {
  try {
    const token=thunkAPI.getState().auth.user.token
    return await postService.getPost(postId,token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deletePost=createAsyncThunk('post/delete',async(postId,thunkAPI)=>{
  try{
    const token=thunkAPI.getState().auth.user.token
    await postService.deletePost(postId,token)
    return postService.getPosts(token)
  }catch(err){
    const message=(err.message && err.response.data && err.response.data.message) || err.message || err.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const updatePost=createAsyncThunk('post/update',async(post,thunkAPI)=>{
  try{
    const token=thunkAPI.getState().auth.user.token
    await postService.updatePost(post.postData,post.id,token)
    const response=await postService.getPosts(token)
    return response
  }catch(err){
    const message = (err.message && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const postSlice=createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state)=>initialState
  },
  extraReducers: (builder)=>{
    builder
      .addCase(createPost.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(createPost.fulfilled,(state)=>{
        state.isLoading=false
        state.isSuccess=true
      })
      .addCase(createPost.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.isSuccess=false
        state.message=action.payload
      })
      .addCase(getPosts.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(getPosts.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.posts=action.payload
      })
      .addCase(getPost.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.isSuccess=false
        state.message=action.payload
      })
      .addCase(getPost.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(getPost.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.post=action.payload
      })
      .addCase(getPosts.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.isSuccess=false
        state.message=action.payload
      })
      .addCase(deletePost.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(deletePost.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.posts=action.payload
      })
      .addCase(deletePost.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.isSuccess=false
        state.message=action.payload
      })
      .addCase(updatePost.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(updatePost.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.posts=action.payload
      })
      .addCase(updatePost.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.isSuccess=false
        state.message=action.payload
      })
  }
})

export const {reset}=postSlice.actions
export default postSlice.reducer

