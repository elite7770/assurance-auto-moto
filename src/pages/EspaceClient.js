import React, { useState } from 'react';
import './EspaceClient.css';

function EspaceClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler une vérification simple
    if (email === 'client@example.com' && password === 'password123') {
      setMessage('Connexion réussie ! Bienvenue dans votre espace client.');
    } else {
      setMessage('Email ou mot de passe incorrect.');
    }
  };

  return (
    <main className="espace-client-page">
      <h1>Connexion à l'Espace Client</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Se connecter</button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </main>
  );
}

export default EspaceClient;
