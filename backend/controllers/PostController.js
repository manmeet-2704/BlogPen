const asyncHandler=require('express-async-handler')
const multer=require('multer')

const User=require('../models/UserSchema')
const Post=require('../models/PostSchema')
const { rawListeners } = require('../models/UserSchema')

const getPosts=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user.id) 

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  const posts=await Post.find({user:req.user.id}).sort({createdAt:-1 })
  res.status(200).json(posts)
})

const createPost=asyncHandler(async(req,res)=>{
  const post=req.body
  const newPost=await Post.create({
    user: req.user.id,
    ...post
  })
  console.log(newPost);
  if(newPost) res.status(200).json(newPost)
  else{
    res.status(400)
    throw new Error('Invalid post data')
  }
})

const getPost=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  const post=await Post.findById(req.params.id)

  if(!post){
    res.status(404)
    throw new Error('Post not found')
  }

  if(post.user.toString()!==req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(post)
})


const updatePost=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user.id)
  
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  
  const post=await Post.findById(req.params.id)
  if(!post){
    res.status(404)
    throw new Error('Post not found')
  }
  
  console.log(req.body)
  if(post.user.toString()!==req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id,req.body,{ new: true })
  console.log(updatePost)
  res.status(200).json(post)
})

const deletePost=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  const post=await Post.findById(req.params.id)

  if(!post){
    res.status(404)
    throw new Error('Post not found')
  }

  if(post.user.toString()!==req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }

  await post.remove()

  res.status(200).json({success: true})
})

module.exports={
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost
}