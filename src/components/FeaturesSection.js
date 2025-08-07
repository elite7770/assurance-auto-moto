import React from 'react';
import '../styles/FeaturesSection.css';
import { ShieldCheck, Headset, Timer } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="feature-icon" />,
    title: "Couverture Complète",
    desc: "Des formules d'assurance personnalisées pour vous protéger dans toutes les situations.",
  },
  {
    icon: <Headset className="feature-icon" />,
    title: "Assistance 24h/7j",
    desc: "Nos experts sont disponibles à tout moment pour vous accompagner.",
  },
  {
    icon: <Timer className="feature-icon" />,
    title: "Devis en 3 Minutes",
    desc: "Obtenez votre estimation rapidement grâce à notre formulaire simplifié.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-wrapper">
        <h2>Nos Engagements</h2>
        <p className="section-subtitle">Des garanties solides pour une mobilité en toute sérénité</p>
        <div className="features-cards">
          {features.map((f, index) => (
            <div key={index} className="feature-item">
              <div className="icon-bubble">
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
