const path=require('path')
const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv').config()
const {errorHandler}=require('./middleware/errorHandler')
const connectDb=require('./config/db')
const app=express()
const PORT=process.env.PORT || 5000
const connectionDb=require('./config/db')


connectDb()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: 1024 * 1024 * 10 }))


app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/posts',require('./routes/postRoutes'))

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'../frontend/build')))
  app.get('*',(req,res)=>res.sendFile(__dirname,'../','frontend','build','index.html'))
}else{
  app.get('/', (req, res) => {
    res.send({ message: 'Welcome to Notes-App API' })
  })
}

app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))