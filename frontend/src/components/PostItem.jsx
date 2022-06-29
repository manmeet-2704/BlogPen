import {Link} from 'react-router-dom'
import {FaRegTrashAlt, FaPencilAlt} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux' 
import { deletePost } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

function Post({post}) {
  const {title,image,content,_id}=post
  console.log(_id);
  let createdAt=post.updatedAt.substring(0,10)

  const dispatch=useDispatch()

  const {isLoading, isError, message}=useSelector((state)=>state.posts)

  const onClick=(id)=>{
    if(window.confirm('Are you sure?')){
      dispatch(deletePost(id))
      if(isError) toast.error(message)
      toast.success('Post Deleted')
    }
  }

  if(isLoading) return <Spinner />

  return (
    <div className='card shadow-xl shadow-gray-500 compact side bg-neutral-400 mb-5 border border-neutral w-4/5 mx-auto'>
      <div className="flex-col card-body">
          <Link to={`posts/${_id}`}><h2 className="card-title text-5xl mb-2 font-bold text-amber-400">{title}</h2></Link>
          <div className='grid grid-cols-1 lg:grid-cols-2 w-full'>
        <div>
          <div className="avatar">
            {image!=="" && <div className="shadow rounded-xl">
              <img src={image} />
            </div>}
          </div>
        </div>
      <div className='flex flex-col'>
        <div className='container mt-auto flex flex-row-reverse mb-3'>
          <button className="mr-2 badge badge-error badge-lg" onClick={()=>onClick(_id)}>
            <FaRegTrashAlt />
          </button>
          <Link to={`updatePost/${_id}`} className="mr-2 badge badge-primary badge-lg">
            <FaPencilAlt />
          </Link>
        </div>
        <div className='flex flex-row-reverse mr-2'>
          <div className="badge badge-secondary">{createdAt}</div>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Post