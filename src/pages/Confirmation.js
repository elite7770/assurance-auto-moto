import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Phone, Mail, Clock, Shield, FileText } from 'lucide-react';
import '../styles/Confirmation.css';

function Confirmation() {
  const location = useLocation();
  const { formData, estimatedPrice } = location.state || {};

  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-header">
          <CheckCircle size={64} className="success-icon" />
          <h1>Devis envoyé avec succès !</h1>
          <p className="success-message">
            Votre demande de devis a été transmise à nos experts. 
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        {formData && (
          <div className="quote-summary">
            <h2>Récapitulatif de votre demande</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <Shield size={20} />
                <span><strong>Véhicule :</strong> {formData.vehiculeType === 'auto' ? 'Voiture' : 'Moto'} {formData.marque} {formData.modele}</span>
              </div>
              <div className="summary-item">
                <FileText size={20} />
                <span><strong>Prix estimé :</strong> {estimatedPrice} MAD/an</span>
              </div>
              <div className="summary-item">
                <Mail size={20} />
                <span><strong>Contact :</strong> {formData.email}</span>
              </div>
            </div>
          </div>
        )}

        <div className="next-steps">
          <h2>Prochaines étapes</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Analyse de votre dossier</h3>
                <p>Nos experts analysent votre profil et vos besoins</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Devis personnalisé</h3>
                <p>Vous recevez une offre sur mesure sous 24h</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Signature du contrat</h3>
                <p>Validation et mise en place de votre assurance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <h2>Besoin d'aide ?</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h3>Par téléphone</h3>
                <p>+212 5 22 98 76 54</p>
                <span className="contact-hours">Lun-Ven: 8h-18h</span>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h3>Par email</h3>
                <p>devis@assurance-maroc.ma</p>
                <span className="contact-hours">Réponse sous 2h</span>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={24} />
              <div>
                <h3>En ligne</h3>
                <p>Chat en direct disponible</p>
                <span className="contact-hours">24h/24</span>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-services">
          <h2>Services complémentaires</h2>
          <div className="services-grid">
            <Link to="/assurance-auto" className="service-card">
              <Shield size={32} />
              <h3>Assurance Auto</h3>
              <p>Protection complète pour votre véhicule</p>
            </Link>
            <Link to="/assurance-moto" className="service-card">
              <Shield size={32} />
              <h3>Assurance Moto</h3>
              <p>Garanties adaptées aux motocyclistes</p>
            </Link>
            <Link to="/contact" className="service-card">
              <Shield size={32} />
              <h3>Conseil personnalisé</h3>
              <p>Accompagnement sur mesure</p>
            </Link>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/" className="return-button">Retour à l'accueil</Link>
          <Link to="/devis" className="new-quote-button">Nouveau devis</Link>
        </div>
      </div>
    </main>
  );
}

export default Confirmation;
