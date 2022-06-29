import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {createPost, reset} from '../features/posts/postSlice'
import Spinner from './Spinner';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {convertToRaw, hasText} from 'draft-js'
import FileBase from 'react-file-base64'
import {ImCross} from 'react-icons/im'

function NewPost() {
  const {user}=useSelector((state)=>state.auth)
  const {isLoading, isError, isSuccess, message}=useSelector((state)=>state.posts)

  // console.log(user.token)
  const [postData, setPostData]=useState({title: '', image: '', content: {}})
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )
  const  [content, setContent] = useState(null)
  const [type,setType]=useState('')

  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    // if(isSuccess){
    //   dispatch(reset())
    //   navigate('/user/posts')
    // }

    dispatch(reset())
  },[dispatch,isError,isSuccess,navigate,message])

  // const onChange=(e)=>{
  //   setTitle(e.target.value)
  // }

  // const onChangeFile=(e)=>{
  //   setImage(e.target.value)
  // }

  const handleEditorChange = (state) => {
    setEditorState(state);
    setPostData({...postData,content:JSON.stringify(convertToRaw(editorState.getCurrentContent()))})
    console.log(content)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    if(!editorState.getCurrentContent().hasText()){
      toast.error('Please enter some content for your post')
      return 
    } 
    dispatch(createPost(postData))
    navigate('/user')
    toast.success('Posted!')
  }

  const onClick=()=>{
    setPostData({...postData,image: ''})
    setType('')
  }

  if(isLoading) return <Spinner />

  return (
    <div className="container mx-auto flex justify-center flex-col rounded-3xl w-full">
      <div className='card p-5 shadow-xl w-fit mx-auto bg-black text-4xl'>
      <h1 className="mb-2">
        Create a new Post 
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

export default NewPost