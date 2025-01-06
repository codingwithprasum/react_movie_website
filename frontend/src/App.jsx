import React from 'react'
import "./css/App.css"
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Favourites from './pages/Favourites'
import {MovieProvider} from "./contexts/MovieContext"
import Navbar from './components/Navbar'

const App = () => {
  return(
    <MovieProvider>
      <Navbar/>
   <main className='main-content'>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/favourites' element={<Favourites/>} />
    </Routes>
   </main>
   </MovieProvider>
  )  
}

export default App
