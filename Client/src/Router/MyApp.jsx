import React from 'react'
import {Route,Routes, BrowserRouter} from "react-router-dom"
import Home from '../components/home/Home'
import About from '../components/About/About'
import Header from '../components/Header/Header'
import Footer from '../components/footer/Footer'
const MyApp = () => {
  return (
          <BrowserRouter>
          <Header/>
       <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About/>} />
</Routes>
    <Footer/>
          </BrowserRouter>
  )
}

export default MyApp
