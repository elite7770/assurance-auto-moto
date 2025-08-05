import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <h1>Contactez-nous</h1>

      <section className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Envoyer</button>

          {submitted && <p className="success-message">Message envoyé ! Nous vous répondrons rapidement.</p>}
        </form>

        <div className="contact-info">
          <h2>Nos coordonnées</h2>
          <p><strong>Adresse :</strong> 123 Avenue de la Mobilité, Paris</p>
          <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
          <p><strong>Email :</strong> contact@assurmobility.fr</p>
          <div className="map-placeholder">
            <p>Carte Google Maps (Simulation)</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
