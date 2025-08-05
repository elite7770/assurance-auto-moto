    import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h2>AssurMobility</h2>
          <p>Protégez ce qui compte le plus - Votre mobilité, notre expertise.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Nos Offres</h4>
            <ul>
              <li><a href="/assurance-auto">Assurance Auto</a></li>
              <li><a href="/assurance-moto">Assurance Moto</a></li>
              <li><a href="/devis">Demander un Devis</a></li>
            </ul>
          </div>
          <div>
            <h4>Informations</h4>
            <ul>
              <li><a href="/a-propos">À propos</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/espace-client">Espace Client</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 AssurMobility. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
