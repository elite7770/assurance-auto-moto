import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#1E40AF'
      }}>
        Chargement...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/espace-client" replace />;
  }

  return children;
};

export default ProtectedRoute;
