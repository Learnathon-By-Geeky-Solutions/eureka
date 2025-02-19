// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
// import { Link } from 'react-router'


function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>

        
      </Routes>
     
    </>
  )
}

export default App
