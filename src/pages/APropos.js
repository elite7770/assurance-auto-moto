import React from 'react';
import './APropos.css';

function APropos() {
  return (
    <main className="apropos-page">
      <section className="apropos-hero">
        <h1>À propos de AssurMobility</h1>
        <p>Protéger votre mobilité est notre mission depuis plus de 20 ans.</p>
      </section>

      <section className="apropos-content">
        <div className="apropos-text">
          <h2>Notre Histoire</h2>
          <p>
            Fondée en 2005, AssurMobility s'est imposée comme un acteur de confiance dans l'assurance automobile et moto.
            Grâce à une expertise pointue et une approche centrée sur le client, nous offrons des solutions personnalisées et accessibles.
          </p>

          <h2>Nos Valeurs</h2>
          <ul>
            <li><strong>Transparence :</strong> Des offres claires et sans surprise.</li>
            <li><strong>Proximité :</strong> Une assistance humaine 24h/7j.</li>
            <li><strong>Innovation :</strong> Outils digitaux pour simplifier votre quotidien.</li>
            <li><strong>Engagement :</strong> Réseau de garages partenaires partout en France.</li>
          </ul>
        </div>

        <div className="apropos-image">
          <img src="https://via.placeholder.com/500x300" alt="Notre Équipe" />
        </div>
      </section>

      <section className="apropos-stats">
        <div className="stat">
          <h3>+20 ans</h3>
          <p>d'expertise</p>
        </div>
        <div className="stat">
          <h3>98%</h3>
          <p>de satisfaction client</p>
        </div>
        <div className="stat">
          <h3>500+</h3>
          <p>partenaires agréés</p>
        </div>
      </section>
    </main>
  );
}

export default APropos;
