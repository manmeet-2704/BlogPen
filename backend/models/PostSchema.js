const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  image: {
    type: String,
  },
  content: {
    type: JSON,
    required: [true, 'Please add some content']
  }
},{
  timestamps: true
})

module.exports=mongoose.model('Post', postSchema)