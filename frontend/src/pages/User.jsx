import UserHeader from "../components/UserHeader"
import {useNavigate, Outlet, Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from "./NotFound"

function User() {
  const {user}=useSelector((state)=>state.auth)
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  )
}

export default User