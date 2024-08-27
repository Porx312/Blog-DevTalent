import React, { useContext, useEffect, useState } from 'react';
import project from "../../assets/prouecto.jpg";
import "./create.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
};

const Crearpost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        setPost(prevPost => ({ ...prevPost, picture: response.data }));
      }
    };
    getImage();

    setPost(prevPost => ({
      ...prevPost,
      categories: location.search?.split('=')[1] || 'All',
      username: account.username
    }));
  }, [file, location.search, account.username]);

  const savePost = async (e) => {
    e.preventDefault();
    await API.createPost(post);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <section className='create'>
      <div className="img-create">
        <img src={project} alt="Project" />
      </div>
      <form className='form-createpost' onSubmit={savePost}>
        <input 
          onChange={handleChange} 
          className='input-create' 
          name='title' 
          type="text" 
          placeholder="Title"
        />
        <textarea 
          onChange={handleChange} 
          className='input-create textarea' 
          name="description" 
          placeholder="Description"
        />
        <button className='create-btn' type="submit">Publicar</button>
      </form>
    </section>
  );
};

export default Crearpost;
