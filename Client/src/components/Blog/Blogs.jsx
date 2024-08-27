import React, { useEffect, useState } from 'react'
import "./blogs.css"
import Blog from './Blog'
import { Link, useSearchParams } from 'react-router-dom'
import { API } from '../../service/api'
const Blogs = () => {
  const [posts, getPosts] = useState([]);
    
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
      const fetchData = async () => { 
          let response = await API.getAllPosts({ category : category || '' });
          if (response.isSuccess) {
              getPosts(response.data);
          }
      }
      fetchData();
  }, [category]);
  return (
   
   <section className='blogs-content'>
    <h2 className='blogs-content-h2'>Proyectos</h2>
    <Link to={"crear"} className='crear-blog'>
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Crear Blog
  </span>
</Link>
    <section className='blogs-contents-proyect'>
    {posts?.length ? posts.map(post => 
      <Blog key={post._id} post={post}/>
 ) : ""}
    </section>
   </section>
  )
}

export default Blogs
