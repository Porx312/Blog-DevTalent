import React from 'react'
import project from "../../assets/prouecto.jpg"

const UpdatePost = () => {
  return (
    <section className='create'>
         <div className="img-create">
            <img src={project} alt="rer" />
        </div>
      <form className='form-createpost'>
        <input className='input-create' type="text" />
      
        <textarea className='input-create texarea' name="" id=""></textarea>
        <button className='create-btn'>Update</button>
      </form>
    </section>
  )
}

export default UpdatePost
