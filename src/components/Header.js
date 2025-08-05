import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <a href="/" className="site-logo">AssurMobility</a>
        <nav className="site-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Accueil</NavLink>
          <NavLink to="/assurance-auto" className={({ isActive }) => isActive ? 'active' : ''}>Assurance Auto</NavLink>
          <NavLink to="/assurance-moto" className={({ isActive }) => isActive ? 'active' : ''}>Assurance Moto</NavLink>
          <NavLink to="/devis" className={({ isActive }) => isActive ? 'active' : ''}>Devis</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
