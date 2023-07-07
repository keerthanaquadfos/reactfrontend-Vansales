import React from 'react' 
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => { 
  if(localStorage.getItem('token') && localStorage.getItem('roleId')==="1"){
    return children;
  }else{
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;