import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, CheckCircle } from 'lucide-react';
import '../styles/AssuranceAuto.css';

const OfferCard = ({ title, benefits }) => (
  <div className="offer-column">
    <h3>{title}</h3>
    <ul>
      {benefits.map((b, i) => (
        <li key={i}>
          <CheckCircle className="check-icon" /> {b}
        </li>
      ))}
    </ul>
  </div>
);

const OffersSection = () => (
  <section className="offers-section">
    <h2>Nos Formules Auto</h2>
    <div className="offers-table">
      <OfferCard title="Basique" benefits={['Responsabilité Civile', 'Protection juridique']} />
      <OfferCard title="Standard" benefits={['Garanties Basique', 'Vol et Incendie', 'Assistance 0 km']} />
      <OfferCard title="Premium" benefits={['Garanties Standard', 'Equipements assurés', 'Indemnisation renforcée']} />
    </div>
  </section>
);

const WhyChooseUsSection = () => (
  <section className="why-choose-us">
    {[
      { icon: <Car className="benefit-icon" />, title: 'Expertise Auto', desc: 'Spécialistes de l\'assurance auto à votre service.' },
      { icon: <Shield className="benefit-icon" />, title: 'Assistance rapide', desc: 'Intervention sous 30 minutes en cas de panne.' },
      { icon: <Clock className="benefit-icon" />, title: 'Options personnalisées', desc: 'Formules adaptées à tous les conducteurs.' },
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
    <h2>Roulez assuré en toute sérénité</h2>
    <Link to="/devis" className="cta-button">
      Obtenez votre devis auto
    </Link>
  </section>
);

const AssuranceAuto = () => (
  <div className="assurance-page">
    <section className="hero-section auto">
      <video autoPlay muted loop className="hero-video">
        <source src="/videos/auto-hero.mp4" type="video/mp4" />
        {/* Fallback Image */}
        <img src="/images/hero-auto.png" alt="Hero" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Assurance Auto adaptée à vos besoins</h1>
        <p>
          Que vous soyez conducteur occasionnel ou quotidien, nous avons la formule qu’il vous faut.
        </p>
        <Link to="/devis" className="cta-button">
          Obtenez votre devis
        </Link>
      </div>
    </section>
    <OffersSection />
    <WhyChooseUsSection />
    <div className="cta-center-wrapper">
      <CTASection />
    </div>
  </div>
);

export default AssuranceAuto;