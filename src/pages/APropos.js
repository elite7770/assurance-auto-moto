import React from 'react';
import { ShieldCheck, Users, Lightbulb, Handshake, Award } from 'lucide-react';
import '../styles/APropos.css';

function APropos() {
  return (
    <main className="apropos-page">
      <section className="apropos-hero-animated">
        <div className="apropos-hero-bg">
          {/* Animated SVG background */}
          <svg width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none" className="hero-svg-bg">
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <path fill="url(#heroGradient)" fillOpacity="0.7" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z;M0,120L60,140C120,160,240,200,360,210C480,220,600,200,720,180C840,160,960,120,1080,110C1200,100,1320,140,1380,160L1440,180L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z;M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
            </path>
          </svg>
          <div className="apropos-hero-overlay"></div>
        </div>
        <div className="apropos-hero-content animated">
          <h1>À propos de AssurMobility</h1>
          <p className="apropos-hero-tagline">Votre mobilité, notre mission. Plus de 20 ans d'expertise pour vous accompagner sur la route.</p>
          <p className="apropos-hero-sub">Protéger votre mobilité est notre mission depuis plus de 20 ans.</p>
        </div>
      </section>

      <section className="apropos-content-modern">
        <div className="apropos-card">
          <h2>Notre Histoire</h2>
          <p>
            Fondée en 2005, AssurMobility s'est imposée comme un acteur de confiance dans l'assurance automobile et moto.
            Grâce à une expertise pointue et une approche centrée sur le client, nous offrons des solutions personnalisées et accessibles.
          </p>

          <h2>Nos Valeurs</h2>
          <ul className="apropos-values-list">
            <li><ShieldCheck className="value-icon" /> <strong>Transparence :</strong> Des offres claires et sans surprise.</li>
            <li><Users className="value-icon" /> <strong>Proximité :</strong> Une assistance humaine 24h/7j.</li>
            <li><Lightbulb className="value-icon" /> <strong>Innovation :</strong> Outils digitaux pour simplifier votre quotidien.</li>
            <li><Handshake className="value-icon" /> <strong>Engagement :</strong> Réseau de garages partenaires partout en France.</li>
          </ul>
        </div>

        <div className="apropos-image-modern apropos-mission-circle">
          <div className="mission-statement">
            <h3>Votre mobilité,</h3>
            <h3>notre mission</h3>
            <p>20 ans d'expertise</p>
          </div>
        </div>
      </section>

      <section className="apropos-stats-modern">
        <div className="stat-modern">
          <Award className="stat-icon" />
          <h3>+20 ans</h3>
          <p>d'expertise</p>
        </div>
        <div className="stat-modern">
          <ShieldCheck className="stat-icon" />
          <h3>98%</h3>
          <p>de satisfaction client</p>
        </div>
        <div className="stat-modern">
          <Handshake className="stat-icon" />
          <h3>500+</h3>
          <p>partenaires agréés</p>
        </div>
      </section>
    </main>
  );
}

export default APropos;
