import { Spin } from 'antd';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../../store/zs';

type Props = {
  children:JSX.Element
};



function PrivateRoute({children}: Props) {
  const isAuth = useStore((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const isLoading = useStore((state) => state.loading);

  if (isLoading) {
    return <Spin />;
  }
  if (!isAuth && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
