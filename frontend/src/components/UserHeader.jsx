import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {FaUser, FaSignOutAlt} from 'react-icons/fa'
import {IoIosCreate} from 'react-icons/io'
import {BsFilePost, BsWindowSidebar} from 'react-icons/bs'

function UserHeader() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.auth)

  const onClick=()=>{
    if(window.confirm('Are you sure?')){
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }
  }
  
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-white text-3xl'>
      <div className="container mx-auto">
        <div className="flex flex-row md:text-3xl text-lg">
          <FaUser className='inline mr-1 my-auto'/>
          <Link to='/user' className='font-bold'>
            {user.username}
          </Link>
        </div>  
        <div className="flex-1">
          <div className="flex justify-end">
            <Link to='newPost' className='btn btn-ghost btn-sm rounded-btn md:text-lg text-md'>
            <IoIosCreate className='mr-1'/>
              New
            </Link>
            <button onClick={onClick} className='btn btn-ghost btn-sm rounded-btn md:text-lg text-md'>
            <FaSignOutAlt className='mr-1'/>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default UserHeader