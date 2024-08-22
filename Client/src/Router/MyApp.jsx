import React from 'react'
import {Route,Routes, BrowserRouter} from "react-router-dom"
import Home from '../components/home/Home'
import About from '../components/About/About'
import Header from '../components/Header/Header'
import Footer from '../components/footer/Footer'
import Crearpost from '../components/create/Crearpost'
import UpdatePost from '../components/create/UpdatePost'
const MyApp = () => {
  return (
          <BrowserRouter>
          <Header/>
       <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/crear" element={<Crearpost/>} />
  <Route path="/update" element={<UpdatePost/>} />
  <Route path="/about" element={<About/>} />
</Routes>
    <Footer/>
          </BrowserRouter>
  )
}

export default MyApp
