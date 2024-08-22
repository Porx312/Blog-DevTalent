import React from 'react'
import "./blogs.css"
import Blog from './Blog'
const Blogs = () => {
  return (
   <section className='blogs-content'>
    <h2 className='blogs-content-h2'>Proyectos</h2>
    <button className='crear-blog'>
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Crear Blog
  </span>
</button>
    <section className='blogs-contents-proyect'>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
    </section>
   </section>
  )
}

export default Blogs
