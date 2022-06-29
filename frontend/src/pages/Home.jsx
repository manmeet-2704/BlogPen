import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header'

function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Home