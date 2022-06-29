const asyncHandler=require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/UserSchema')

const registerUser=asyncHandler(async (req,res)=>{
  const {name,username,email,password}=req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please include all fields')
  }

  const userExists=await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  const salt=await bcrypt.genSalt(10)
  const hashPassword=await bcrypt.hash(password,salt)

  const user=await User.create({
    name,
    username,
    email,
    password: hashPassword
  })

  if(user){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser=asyncHandler(async (req,res)=>{
  const {email,password}=req.body

  const user=await User.findOne({email})

  if(user && (await bcrypt.compare(password,user.password))){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      notes: user.notes
    })
  }else{
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const getMe=asyncHandler(async (req,res)=>{
  const user={
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    notes: req.user.notes
  }
  res.status(200).json(user)
})

const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: '30d'
  })
}

module.exports={
  registerUser,
  loginUser,
  getMe
}