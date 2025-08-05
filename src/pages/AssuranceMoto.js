import React from 'react';
import './AssuranceMoto.css';
import { Link } from 'react-router-dom';

function AssuranceMoto() {
  return (
    <main className="assurance-moto-page">
      <section className="hero-moto">
        <h1>Assurance Moto</h1>
        <p>Des formules adaptées à tous les motards, du quotidien aux passionnés.</p>
        <Link to="/devis" className="cta-button">Obtenir un devis moto</Link>
      </section>

      <section className="offers-section">
        <div className="offer-card">
          <h3>Formule Essentielle</h3>
          <p>La protection de base pour rouler en toute légalité avec responsabilité civile.</p>
          <ul>
            <li>Responsabilité civile</li>
            <li>Défense et recours</li>
            <li>Assistance 50 km</li>
          </ul>
        </div>

        <div className="offer-card">
          <h3>Formule Confort</h3>
          <p>Un équilibre entre protection et budget pour les motards réguliers.</p>
          <ul>
            <li>Garantie vol & incendie</li>
            <li>Bris d’optique</li>
            <li>Assistance 0 km</li>
          </ul>
        </div>

        <div className="offer-card">
          <h3>Formule Premium</h3>
          <p>Une couverture maximale pour les motards exigeants et passionnés.</p>
          <ul>
            <li>Tous risques</li>
            <li>Valeur à neuf 24 mois</li>
            <li>Prêt de véhicule</li>
          </ul>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Besoin d’un devis personnalisé ?</h2>
        <Link to="/devis" className="cta-button">Simuler mon devis Moto</Link>
      </section>
    </main>
  );
}

export default AssuranceMoto;
