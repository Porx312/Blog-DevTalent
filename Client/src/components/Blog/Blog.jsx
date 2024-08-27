import React from 'react'
import proyect from "../../assets/prouecto.jpg"
import github from "../../assets/icons8-github-24.png"
import arrow from "../../assets/right-arrow.png"
import { Link } from 'react-router-dom'
const Blog = ({post}) => {
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
} 
  return (
    <article  className='blog-item'>
        <div className="image-content">
            <img src={proyect} alt="proyect" />
        </div>
        <div className="text-content-blog">
            <h4>Author: {post.username}</h4>
            <h2 className='blog-item-text'>{addEllipsis(post.title, 20)}</h2>
            <p>{addEllipsis(post.description, 100)}</p>
        </div>
        <div className="more">
            <Link to={`details/${post._id}`} className='leer-mas'><img src={arrow} alt="arrow" /></Link>
            <a className='github-link' href="#"><img src={github} alt="githublogo" /></a>
        </div>
    </article>
  )
}

export default Blog
