function About() {
  return (
    <div className='card p-5 shadow-xl'>
      <h1 className="text-6xl mb-2 flex flex-row">
        <img src="assets/logo.png" className="w-14 mr-1"/>
        <p>BlogPen</p>
      </h1>
      <p className="mb-4 text-2xl font-light">
        Welcome! Just login and start posting blogs and notes with a rich text editor, videos and pictures.
      </p>
      <p className="text-lg text-gray-400">
        Version <span className='text-white'>1.0.0</span>
      </p>
    </div>
  )
}

export default About