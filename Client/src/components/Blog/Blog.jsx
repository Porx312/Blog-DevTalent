import React from 'react'
import proyect from "../../assets/prouecto.jpg"
import github from "../../assets/icons8-github-24.png"
import arrow from "../../assets/right-arrow.png"
const Blog = () => {
  return (
    <article className='blog-item'>
        <div className="image-content">
            <img src={proyect} alt="proyect" />
        </div>
        <div className="text-content-blog">
            <h2 className='blog-item-text'>Blog de Nft</h2>
            <p>este es un blog de nft que he creado con diferentes lengujaes y lo he hecho paso a paso</p>
        </div>
        <div className="more">
            <button className='leer-mas'><img src={arrow} alt="arrow" /></button>
            <a className='github-link' href="#"><img src={github} alt="githublogo" /></a>
        </div>
    </article>
  )
}

export default Blog
