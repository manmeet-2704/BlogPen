import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {convertToRaw, convertFromRaw} from 'draft-js'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {updatePost} from '../features/posts/postSlice'
import Spinner from './Spinner'
import {ImCross} from 'react-icons/im'

function UpdatePost({post}) {
  const [postData, setPostData]=useState({title: post.title, image: post.image, content: post.content})
  const {isError,message}=useSelector((state)=>state.posts)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const storedState=convertFromRaw(JSON.parse(post.content))
  const [editorState,setEditorState]=useState(EditorState.createWithContent(storedState))
  const [type,setType]=useState(postData.image.substring(5,10))

  const handleEditorChange = (state) => {
    setEditorState(state)
    console.log(editorState)
    setPostData({...postData,content:JSON.stringify(convertToRaw(editorState.getCurrentContent()))})
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    console.log(postData)
    if(isError) toast.error(message)

    if(!editorState.getCurrentContent().hasText()){
      toast.error('Please enter some content for your post')
      return 
    } 
    console.log(postData)
    dispatch(updatePost({postData,id:post._id}))
    navigate('/user')
    toast.success('Post Updated')
  }

  const onClick=()=>{
    setPostData({...postData,image: ''})
    setType('')
  }

  return (
    <div className="container mx-auto flex justify-center flex-col rounded-3xl w-full">
      <div className='card p-5 shadow-xl w-fit mx-auto bg-black text-4xl'>
      <h1 className="mb-2">
        Update your post 
      </h1>
      </div>
      <div className="form-control px-10">
          <form action="" className="flex mt-3 flex-col" onSubmit={onSubmit}>
            <input type="text" placeholder="Enter Title" name='title' value={postData.title} className="input input-ghost input-bordered input-accent input-lg form-group my-10 text-3xl xl:w-1/2 lg:w-1/2 w-full mx-auto" required onChange={(e)=>setPostData({...postData, title: e.target.value})}/>
            <FileBase type="file" multiple={false} onDone={({base64})=>{setPostData({...postData,image: base64})
          setType(base64.substring(5,10))}}/>
            {postData.image && 
              (
                <div className='container mt-2'>
                  {type==='image' && (<>
                    <button className='w-fit relative top-7 left-1' type='reset' onClick={onClick}><ImCross className='text-black'/></button>
                    <img src={postData.image} alt="" className='rounded-xl'/></>)}
                  {type==='video' && (<>
                    <button className='w-fit' type='reset' onClick={onClick}><ImCross /></button>
                    <video controls className='rounded-lg'>
                    <source src={postData.image} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video></>)}
                </div>
              )}
            <div className="container bg-white text-black rounded-xl mt-2">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleEditorChange}
              />
            </div>
            <button type='submit' className="btn btn-lg btn-neutral my-4 mx-auto w-1/2">Post</button>
          </form>
        </div>
      </div>
  )
}

export default UpdatePost