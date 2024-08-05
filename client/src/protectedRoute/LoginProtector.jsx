<<<<<<< HEAD
import { useEffect } from "react";

const LoginProtector = ({ children }) => {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      window.location.href = "/";
    }
  }, [localStorage]);

  return children;
};

export default LoginProtector;
=======
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const LoginProtector = ({children}) => {
  useEffect(() => {

    if (localStorage.getItem('userToken')) {
      window.location.href = '/';
    }
  }, [localStorage]);


  return children;
  
}

export default LoginProtector;
>>>>>>> 414a2c56b023d9112bd73108d2b1ef2a4ffa8678
