const router=require('express').Router()
const {getPosts,createPost,getPost,deletePost,updatePost}=require('../controllers/PostController')
// const multer=require('multer')

const {protect}=require('../middleware/authMiddleware')

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './frontend/public/uploads')
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + file.originalname)
//   }
// })



// const upload = multer({ storage })

router.route('/:id').get(protect,getPost).delete(protect,deletePost).put(protect,updatePost)
router.route('/').get(protect,getPosts).post(protect,createPost)

module.exports=router