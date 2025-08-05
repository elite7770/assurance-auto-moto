import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <h1>Merci pour votre demande !</h1>
        <p>Nous avons bien reçu votre demande de devis. Un conseiller vous contactera prochainement.</p>
        <Link to="/" className="return-button">Retour à l'accueil</Link>
      </div>
    </main>
  );
}

export default Confirmation;
