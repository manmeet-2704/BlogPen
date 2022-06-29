import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getPost} from '../features/posts/postSlice'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import UpdatePost from './UpdatePost'

function UpdateInterim() {
  const {post,isLoading,isSuccess,isError,message}=useSelector((state)=>state.posts)
  const {postId}=useParams()
  const dispatch=useDispatch()

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    dispatch(getPost(postId))
  },[isError,message,postId])

  console.log(post);

  if(isLoading || post && Object.keys(post).length === 0 && Object.getPrototypeOf(post) === Object.prototype) return <Spinner />

  return (
    <UpdatePost post={post} />
  )
}

export default UpdateInterim