import {FaLinkedinIn, FaGithub} from 'react-icons/fa'
import {SiGmail} from 'react-icons/si'

function Footer() {
  const footerYear=new Date().getFullYear()
  return (
    <footer className="footer bottom-0 text-primary-content flex mb-1">
        <p className='text-gray ml-2'>Copyright &copy; {footerYear} BlogPen</p>
        <div className="flex text-2xl ml-auto mr-2">
          <a href="https://www.linkedin.com/in/manmeet-singh-ajmani-0a84541a2/" className='hover:text-white'><FaLinkedinIn /></a>
          <a href="https://github.com/manmeet-2704" className='hover:text-white'><FaGithub /></a>
          <a href="mailto: msajmani2704@gmail.com" className='hover:text-white'><SiGmail /></a>
        </div>
    </footer>
  )
}

export default Footer