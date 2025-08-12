import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, FileText, CreditCard, Bell } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import '../styles/EspaceClient.css';

function EspaceClient() {
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    navigate('/dashboard');
    return null;
  }

  return (
    <main className="espace-client-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Left Side - Branding & Features */}
          <div className="auth-left">
            <h1>Espace Client</h1>
            <p>
              Accédez à votre espace personnel pour gérer vos polices d'assurance, 
              suivre vos sinistres et consulter vos documents en toute sécurité.
            </p>
            
            <div className="features">
              <div className="feature-item">
                <Shield size={20} />
                <span>Gestion des polices d'assurance</span>
              </div>
              <div className="feature-item">
                <FileText size={20} />
                <span>Suivi des sinistres en temps réel</span>
              </div>
              <div className="feature-item">
                <CreditCard size={20} />
                <span>Paiements et facturation en ligne</span>
              </div>
              <div className="feature-item">
                <Bell size={20} />
                <span>Notifications personnalisées</span>
              </div>
            </div>
          </div>

          {/* Right Side - Authentication Forms */}
          <div className="auth-right">
            {/* Tab Navigation */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                <Lock size={18} />
                Connexion
              </button>
              <button 
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                <User size={18} />
                Inscription
              </button>
            </div>

            {/* Form Content */}
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default EspaceClient;