import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="/" className="site-logo">AssurMobility</a>
        <nav className="site-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
          <NavLink to="/assurance-auto" className={({ isActive }) => isActive ? 'active' : ''}>Assurance Auto</NavLink>
          <NavLink to="/assurance-moto" className={({ isActive }) => isActive ? 'active' : ''}>Assurance Moto</NavLink>
          <NavLink to="/a-propos" className={({ isActive }) => isActive ? 'active' : ''}>À Propos</NavLink>
          {!currentUser ? (
            <NavLink to="/espace-client" className={({ isActive }) => isActive ? 'active' : ''}>Espace Client</NavLink>
          ) : (
            <div className="user-menu-container">
              <button className="user-menu-button" onClick={toggleUserMenu}>
                <span className="user-avatar-small">
                  {currentUser.name?.charAt(0) || 'U'}
                </span>
                <span className="user-name">{currentUser.name?.split(' ')[0] || 'Utilisateur'}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  <NavLink to="/dashboard" onClick={() => setShowUserMenu(false)}>
                    Mon Tableau de Bord
                  </NavLink>
                  <NavLink to="/espace-client" onClick={() => setShowUserMenu(false)}>
                    Mon Profil
                  </NavLink>
                  <button onClick={handleLogout} className="logout-menu-item">
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
