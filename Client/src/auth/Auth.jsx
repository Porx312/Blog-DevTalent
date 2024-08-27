import React, { useContext, useEffect, useState } from 'react';
import LoginRegisterLayout from '../layout/LoginRegisterLayout';
import { useNavigate } from 'react-router';
import { API } from '../service/api.js';
import { DataContext } from '../context/DataProvider';

const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  username: '',
  password: ''
};

const Auth = ({ setIsAuthenticated}) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState('');
  const [account, toggleAccount] = useState('login');

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);


  useEffect(() => {
      showError(false);
  }, [login])

  const onValueChange = (e) => {
      setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const onInputChange = (e) => {
      setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  const loginUser = async () => {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
          showError('');

          sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
          setAccount({ name: response.data.name, username: response.data.username });
          
          setIsAuthenticated(true)
          setLogin(loginInitialValues);
          navigate('/');
      } else {
          showError('Something went wrong! please try again later');
      }
  }

  const signupUser = async () => {
      let response = await API.userSignup(signup);
      if (response.status === 201) {
          showError('');
          setSignup(signupInitialValues);
          toggleAccount('login');
          console.log("hecho")
      } else {
          showError('Something went wrong! please try again later');
      }
  }

  const toggleSignup = () => {
      account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  }

  return (
    <>
      {account === "login" ? (
        <LoginRegisterLayout>

          <h2>Sign in</h2>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={login.username}
            onChange={(e) => onValueChange(e)}
          />
          <label htmlFor="passwordLogin">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={login.password}
            onChange={(e) => onValueChange(e)}
          />
          <button className="signin-btn" onClick={()=> loginUser()}>iniciar seccion</button>
          <div className="line"><span></span> or <span></span></div>
          <button className="register"onClick={() => toggleSignup()} >Crea una cuneta</button>
        </LoginRegisterLayout>
      ) : (
        <LoginRegisterLayout>
          <h2>Register</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={signup.name}
            onChange={(e) => onInputChange(e)}
           
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={signup.username}
            onChange={(e) => onInputChange(e)}
          />
         
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={signup.password}
            onChange={(e) => onInputChange(e)}
          />
          <button className="signin-btn" onClick={signupUser}>Register</button>
          <div className="line"><span></span> or <span></span></div>
          <button className="register" onClick={() => toggleSignup()}>Sign In</button>
        </LoginRegisterLayout>
      )}
    </>
  );
};

export default Auth;
