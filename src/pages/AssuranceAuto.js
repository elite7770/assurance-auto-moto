import React from 'react';
import './AssuranceAuto.css';
import { Link } from 'react-router-dom';

function AssuranceAuto() {
  return (
    <main className="assurance-auto-page">
      <section className="hero-auto">
        <h1>Assurance Auto</h1>
        <p>Des formules flexibles pour protéger votre voiture et votre tranquillité.</p>
        <Link to="/devis" className="cta-button">Obtenir un devis auto</Link>
      </section>

      <section className="offers-section">
        <div className="offer-card">
          <h3>Formule Tiers Simple</h3>
          <p>La couverture minimale pour être en règle, idéale pour les petits budgets.</p>
          <ul>
            <li>Responsabilité civile</li>
            <li>Défense et recours</li>
            <li>Assistance 50 km</li>
          </ul>
        </div>

        <div className="offer-card">
          <h3>Formule Tiers Étendu</h3>
          <p>Un bon compromis pour une protection contre le vol, incendie et bris de glace.</p>
          <ul>
            <li>Vol & incendie</li>
            <li>Bris de glace</li>
            <li>Assistance 0 km</li>
          </ul>
        </div>

        <div className="offer-card">
          <h3>Formule Tous Risques</h3>
          <p>La protection maximale pour rouler en toute sérénité, même en cas d’accident responsable.</p>
          <ul>
            <li>Tous risques</li>
            <li>Valeur à neuf 24 mois</li>
            <li>Véhicule de remplacement</li>
          </ul>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Prêt à protéger votre voiture ?</h2>
        <Link to="/devis" className="cta-button">Simuler mon devis Auto</Link>
      </section>
    </main>
  );
}

export default AssuranceAuto;
