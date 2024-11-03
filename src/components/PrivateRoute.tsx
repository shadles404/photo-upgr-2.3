import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return auth?.currentUser ? <>{children}</> : <Navigate to="/login" />;
}