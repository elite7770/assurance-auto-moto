import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="/" className="site-logo">AssurMobility</a>
        <nav className="site-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
          <NavLink to="/assurance-auto" className={({ isActive }) => isActive ? 'active' : ''}>Assurance Auto</NavLink>
          <NavLink to="/assurance-moto" className={({ isActive }) => isActive ? 'active' : ''}>Assurance Moto</NavLink>
          <NavLink to="/a-propos" className={({ isActive }) => isActive ? 'active' : ''}>À Propos</NavLink>
          <NavLink to="/espace-client" className={({ isActive }) => isActive ? 'active' : ''}>Espace Client</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
