import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import SinglePost from './components/SinglePost';
import UpdatePost from './components/UpdatePost';
import UpdateInterim from './components/UpdateInterim';
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='' element={<About />} />
          </Route>
          <Route path='/user' element={<PrivateRoute />}>
            <Route path='/user' element={<User />} >
              <Route path='' element={<Posts />} />
              <Route path='newPost' element={<NewPost />}></Route>
              <Route path='updatePost/:postId' element={<UpdateInterim />}></Route>
              <Route path='posts/:postId' element={<SinglePost />}></Route>
            </Route>
          </Route>
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
      {/* <footer className='fixed bottom-0'> */}

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
