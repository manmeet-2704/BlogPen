import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "./Spinner"

function Login() {
  const [formData, setFormData]=useState({
    email: '',
    password: ''
  })

  const {email, password}=formData

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {user,isLoading,isError,isSuccess,message}=useSelector(state=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/user')
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

    const userData={
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) return <Spinner />

  return (
    <>
    <div className="container mx-auto flex justify-center flex-col rounded-3xl xl:w-1/2 lg:w-1/2 md:w-2/3 sm:w-full">
      <h1 className="text-3xl mx-auto w-fit mt-2">Login</h1>
      <div className="form-control px-10">
          <form action="" className="flex flex-col" onSubmit={onSubmit}>
            <input type="email" placeholder="Enter Email" name='email' value={email} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <input type="password" placeholder="Enter Password" name='password' value={password} className="input input-ghost input-bordered input-accent input-lg form-group my-5" required onChange={onChange}/>
            <button className="btn w-full mb-4">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
