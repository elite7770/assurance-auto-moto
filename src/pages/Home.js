import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

function Home() {
  return (
    <main className="home-page">

      <section className="hero-section">
        <img src="/images/home-hero.jpg" alt="Hero" className="hero-video" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Assurez Votre Mobilité en Toute Confiance</h1>
          <p>Des formules flexibles pour Auto & Moto, adaptées à votre style de vie.</p>
          <Link to="/devis" className="cta-button">Obtenir un devis</Link>
        </div>
      </section>

      <FeaturesSection />

      <TestimonialsSection />

    </main>
  );
}

export default Home;
