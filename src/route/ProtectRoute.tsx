import React from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
   const token = localStorage.getItem('token')
   const authUserData = localStorage.getItem('user-data')
   try {
    const  user  = authUserData && JSON.parse(authUserData)['user']

    //Logs the user payload stored in the token. By default the jwt has a property user which is an object containing the user's payload just like data when working with axios. so user.user (The first being the one from the store and fomal being from JWT directly)
    //   console.log('From Redux: ', user.user)
  
    if (!token || !user) {
      Swal.fire("Authenticate", "Login to access That Page", "info");
      return <Navigate to="/auths/login" replace />;
    }
  
    if (!allowedRoles.includes(user.roles)) {
      return <Navigate to="/unauthorized" replace />; // Not authorized to visit page
    }
   } catch (error: any) {
     throw new Error(error.message)
   }

  return children; // Return requested page
};

export default ProtectedRoute;
