import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../components/home/Home';
import Crearpost from '../components/create/Crearpost';
import Auth from '../auth/Auth';
import PrivateRoute from './PrivateRoute';
import DetailView from '../components/details/DetailView';

const MyApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para autenticación */}
        <Route path='/account' element={<Auth setIsAuthenticated={setIsAuthenticated} />} />

        {/* Rutas privadas que requieren autenticación */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          {/* Ruta principal */}
          <Route path='/' element={<Home />} />

          {/* Ruta para crear un post */}
          <Route path='/crear' element={<Crearpost />} />

          {/* Ruta para ver detalles de un post */}
          <Route path='/details/:id' element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyApp;
