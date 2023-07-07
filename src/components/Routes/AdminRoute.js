import React from 'react' 
import { Navigate } from 'react-router-dom'
const AdminRoute = ({children}) => { 
  if(localStorage.getItem('token') && localStorage.getItem('roleId')==="2"){
    return children;
  }else{
    return <Navigate to="/login" />;
  }
}

export default AdminRoute;