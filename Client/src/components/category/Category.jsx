import React from 'react';
import { NavLink } from 'react-router-dom';
import './category.css';
import { categories } from '../../constants/data';

const Category = () => {
  return (
    <section className='category-section'>
      <ul className='category-content'>
        {categories.map(item => (
          <li key={item.id} className='category-item'>
            <NavLink
              to={`/category/${item.id}`} // Asegúrate de que esta ruta sea válida en tu configuración de enrutamiento
              className={({ isActive }) => (isActive ? 'is-active-category' : '')}
            >
              {item.type}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Category;
