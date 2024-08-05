<<<<<<< HEAD
import { Navigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/" replace />;
  }

=======
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RouteProtector =  ({ children }) => {

  if (!localStorage.getItem('userToken')){
        return <Navigate to='/' replace /> 
  }


>>>>>>> 414a2c56b023d9112bd73108d2b1ef2a4ffa8678
  return children;
};

export default RouteProtector;
