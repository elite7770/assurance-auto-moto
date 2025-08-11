import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wrapper">
        <div className="footer-branding">
          <h2>AssurMobility</h2>
          <p>Protégez ce qui compte le plus — votre mobilité, notre expertise.</p>
        </div>

        <div className="footer-nav">
          <div className="footer-section">
            <h4>Nos Offres</h4>
            <ul>
              <li><a href="/assurance-auto">Assurance Auto</a></li>
              <li><a href="/assurance-moto">Assurance Moto</a></li>
              <li><a href="/devis">Demander un devis</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Informations</h4>
            <ul>
              <li><a href="/a-propos">À propos</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/espace-client">Espace client</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Suivez-nous</h4>
            <ul className="social-links">
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://linkedin.com">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-cta">
        <p>Inscrivez-vous à notre newsletter pour recevoir nos conseils et offres exclusives.</p>
        <form>
          <input type="email" placeholder="Votre email" aria-label="Email" />
          <button type="submit">S’abonner</button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 AssurMobility. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
