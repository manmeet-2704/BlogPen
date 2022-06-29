import {Link} from 'react-router-dom'

function Dashboard() {
  return (
    <div className="container flex justify-center">
      <Link to='newPost' className='btn btn-lg bg-emerald-200 mt-32 text-black rounded-xl hover:text-white'>Create a post</Link>
    </div>
  )
}

export default Dashboard