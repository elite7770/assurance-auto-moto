import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Shield, Gauge, CheckCircle } from 'lucide-react';
import '../styles/AssuranceMoto.css';

const OfferCard = ({ title, benefits }) => (
  <div className="offer-column">
    <h3>{title}</h3>
    <ul>
      {benefits.map((b, i) => (
        <li key={i}><CheckCircle className="check-icon" /> {b}</li>
      ))}
    </ul>
  </div>
);

const OffersSection = () => (
  <section className="offers-section">
    <h2>Choisissez Votre Formule</h2>
    <div className="offers-table">
      <OfferCard title="Essentiel" benefits={['Responsabilité Civile', 'Protection juridique']} />
      <OfferCard title="Confort" benefits={['Garanties Essentiel', 'Vol & Incendie', 'Assistance 0 km']} />
      <OfferCard title="Ultimate" benefits={['Garanties Confort', 'Equipements assurés', 'Véhicule de prêt']} />
    </div>
  </section>
);

const WhyChooseUsSection = () => (
  <section className="why-choose-us">
    {[
      { icon: <Bike className="benefit-icon" />, title: 'Experts Moto', desc: 'Nos spécialistes vous accompagnent.' },
      { icon: <Shield className="benefit-icon" />, title: 'Intervention Rapide', desc: 'Dépannage en moins de 30 minutes.' },
      { icon: <Gauge className="benefit-icon" />, title: 'Formules Flexibles', desc: 'Adaptez votre contrat selon vos besoins.' },
    ].map((item, idx) => (
      <div className="benefit" key={idx}>
        {item.icon}
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
    ))}
  </section>
);

const CTASection = () => (
  <section className="cta-banner">
    <h2>Prêt à rouler en toute sécurité ?</h2>
    <Link to="/devis" className="cta-button">Obtenez votre devis moto</Link>
  </section>
);

const AssuranceMoto = () => (
  <div className="assurance-page">
    <section className="hero-section moto">
      <video autoPlay muted loop className="hero-video">
        <source src="/videos/moto-hero.mp4" type="video/mp4" />
        {/* Fallback Image */}
        <img src="/images/hero-moto.png" alt="Hero Moto" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Assurance Moto Haut de Gamme</h1>
        <p>Une couverture complète pour votre moto, pensée pour les vrais passionnés.</p>
        <Link to="/devis" className="cta-button">Obtenez votre devis</Link>
      </div>
    </section>
    <OffersSection />
    <WhyChooseUsSection />
    <div className="cta-center-wrapper">
      <CTASection />
    </div>
  </div>
);

export default AssuranceMoto;
