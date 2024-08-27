import { Navigate, Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/footer/Footer";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    const token = sessionStorage.getItem('accessToken');
    return isAuthenticated && token ? 
      <>
        <Header/>
        <Outlet />
        <Footer/>
      </> : <Navigate replace to='/account' />
  };

  export  default PrivateRoute
  