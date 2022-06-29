import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { register,reset } from '../features/auth/authSlice'
import Spinner from './Spinner'

function Register() {
  const [formData, setFormData]=useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name,email,username,password,password2}=formData

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {user,isLoading,isError,isSuccess,message}=useSelector(state=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/login')
    }

    dispatch(reset())
  },[isError, isSuccess, user, message, navigate, dispatch])

  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    
    if(password2!==password){
      toast.error('Passwords do not match')
    }else{
      const userData={
        name,
        username,
        email,
        password
      }
      
      dispatch(register(userData))
    }
  }

  if(isLoading) return <Spinner />

  return (
    <>
    <div className="container mx-auto flex justify-center flex-col rounded-3xl  mb-10 xl:w-1/2 lg:w-1/2 md:w-2/3 sm:w-full">
      <h1 className="text-3xl mx-auto w-fit mt-2">Register</h1>
      <div className="form-control px-10"> 
          <form action="" className="flex flex-col" onSubmit={onSubmit}>
            <input type="text" placeholder="Enter Name" name='name' value={name} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <input type="text" placeholder="Enter Username" name='username' value={username} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <input type="email" placeholder="Enter Email" name='email' value={email} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <input type="password" placeholder="Enter Password" name='password' value={password} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <input type="password" placeholder="Confirm Password" name='password2' value={password2} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <button className="btn w-full mb-4">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
