import React, { useContext, useEffect, useState } from 'react';
import "./details.css";
import { API } from '../../service/api';
import { useNavigate, useParams } from 'react-router';
import { DataContext } from '../../context/DataProvider';

const DetailView = () => {
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
        await API.deletePost(post._id);
        navigate('/');
    };

    return (
        <section className='detailview-content'>
            <article className='blogview'>
                <div className="image">
                    {post.picture ? (
                        <img src={post.picture} alt={post.title} />
                    ) : (
                        <img src="/path/to/default-image.jpg" alt="default" />
                    )}
                </div>
                <h2>{post.title}</h2>
                <h3>Author: {post.username}</h3>
                <p>{post.description}</p>
                {account.username === post.username && (
                    <button className='delete-btn' onClick={deleteBlog}>
                        Delete
                    </button>
                )}
            </article>
            <article className='comment'>
                {/* Comments section can be implemented here */}
            </article>
        </section>
    );
};

export default DetailView
