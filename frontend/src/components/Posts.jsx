import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getPosts,reset} from '../features/posts/postSlice'
import Spinner from './Spinner'
import Post from './PostItem'
import { Link } from 'react-router-dom'

function Posts() {
  const {posts,isLoading,isSuccess}=useSelector((state)=>state.posts)
  console.log(posts)
  const dispatch=useDispatch()

  useEffect(()=>{
    return ()=>{
      if(isSuccess){
        dispatch(reset())
      }
    }
  },[dispatch,isSuccess])

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])

  if(isLoading) return <Spinner />

  if(posts.length===0){
    return <div className="container text-5xl flex justify-center"><h1>No posts :(</h1></div>
  }
  return (
    <div className="container card">
      <p className='text-5xl m-5 card-title w-fit mx-auto'>Your Posts</p>
    <div className='card-body grid grid-cols-1 gap-8 xl:grid-cols-2 items-center lg:grid-cols-3 md:grid-cols-2'>
        {posts.map((post,index)=>(
          <Post key={post.id} post={post}/>
        ))}
      </div>
      </div>
  )
}

export default Posts