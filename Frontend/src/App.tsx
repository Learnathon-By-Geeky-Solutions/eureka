// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
// import { Link } from 'react-router'


function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/register' element={<Register/>}/>
        
      </Routes>
     
    </>
  )
}

export default App
