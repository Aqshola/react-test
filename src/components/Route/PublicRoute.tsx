import { Spin } from 'antd';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../../store/zs';
import {LocationState} from "../../types/type";

type Props = {
  children:JSX.Element
};


  


function PublicRoute({children}: Props) {
  const isAuth = useStore((state) => state.auth.isAuthenticated);
  
  const location = useLocation();

  const isLoading = useStore((state) => state.loading);
  
  if (isLoading) {
    return <Spin />;
  }
  if (isAuth && !isLoading) {
    
    
    let from = (location.state as LocationState)?.from.pathname || "/";
    return <Navigate to={from} state={{ from: location }} replace />;
    
  }
  return children;
}

export default PublicRoute;
