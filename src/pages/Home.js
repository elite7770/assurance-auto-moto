import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Protégez ce qui compte le plus</h1>
          <p>Votre mobilité, notre expertise. Assurance Auto & Moto sur-mesure, rapide et fiable.</p>
          <Link to="/devis" className="cta-button">Obtenir un devis</Link>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500x300" alt="Assurance Auto & Moto" />
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>Couverture complète</h3>
          <p>Des garanties adaptées à vos besoins pour rouler en toute sérénité.</p>
        </div>
        <div className="feature-card">
          <h3>Assistance 24h/7j</h3>
          <p>Un service d’assistance réactif disponible à tout moment.</p>
        </div>
        <div className="feature-card">
          <h3>Devis en 3 minutes</h3>
          <p>Obtenez une estimation claire et rapide en ligne.</p>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Ce que disent nos clients</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <p>"Service impeccable, rapide et à l’écoute. J'ai assuré ma moto en quelques minutes."</p>
            <span>- Sophie L.</span>
          </div>
          <div className="testimonial-card">
            <p>"Des offres claires et une équipe réactive en cas de sinistre. Je recommande !"</p>
            <span>- Marc D.</span>
          </div>
          <div className="testimonial-card">
            <p>"Le devis en ligne est super pratique, tout est transparent."</p>
            <span>- Julien R.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
