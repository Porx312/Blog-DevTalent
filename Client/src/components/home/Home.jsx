import React from 'react'
import Blogs from '../Blog/Blogs'
import "./home.css"
import Category from '../category/Category'
const Home = () => {
  return (
    <div>
     <section className='presentation'>
        <div className='text-content-presentation'>
            <h2>Descubre, Comparte y Mejora tus Proyectos

</h2>
            <p>Bienvenido a una comunidad apasionada donde puedes mostrar tus proyectos, compartir tus ideas, y recibir valioso feedback. Aquí, cada creación cuenta, y cada conversación te impulsa a llevar tu trabajo al siguiente nivel.</p>
        </div>
     </section>
     <Category/>
    <Blogs/>
    </div>
  )
}

export default Home
