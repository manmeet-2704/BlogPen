import {Link} from 'react-router-dom'

function Header() {
  return (
     <nav className='navbar mb-12 shadow-lg bg-neutral text-white'>
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link to='/' className='sm:text-4xl text-lg font-bold'>
            Welcome!
          </Link>
        </div>  
        <div className="flex-1">
          <div className="flex justify-end">
            <Link to='login' className='btn btn-ghost md:btn-md md:text-xl rounded-btn'>
              Login
            </Link>
            <Link to='register' className='btn btn-ghost md:btn-md md:text-xl rounded-btn'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header