import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import {getPost, reset} from '../features/posts/postSlice'
import {Editor, convertFromRaw, EditorState} from 'draft-js'
import Spinner from './Spinner'

function SinglePost() {
  const {post,isLoading,isSuccess,isError,message}=useSelector((state)=>state.posts)
  const dispatch=useDispatch()
  const {postId}=useParams()
  useEffect(()=>{
    if(isError) toast.error(message)
    
    dispatch(getPost(postId))
  },[isError,message,postId])

  if(isLoading || post && Object.keys(post).length === 0 && Object.getPrototypeOf(post) === Object.prototype) return <Spinner />

  const type=post.image.substring(5,10)
  console.log(type)

  const storedState=convertFromRaw(JSON.parse(post.content))

   return (
      <div className="card flex flex-col shadow-xl shadow-white p-4 w-full sm:w-4/5 mx-auto">
        <div className="card-title mx-auto font-bold text-5xl mb-5">{post.title}</div>
        <div className="container flex-col rounded-lg">
          {type==='image' &&<img src={post.image} alt="" />}
          {type==='video' && (<video controls>
            <source src={post.image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>)}
          <p className='text-secondary text-sm'>{post.createdAt.substring(0,10)}</p>
        </div>
        <div className="container text-2xl">
        <Editor editorState={EditorState.createWithContent(storedState)} readOnly={true} />
        </div>
      </div>
   )
}

export default SinglePost