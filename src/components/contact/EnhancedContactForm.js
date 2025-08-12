import React, { useState } from 'react';
import '../../styles/EnhancedContactForm.css';

const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
    preferredContact: 'email',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const urgencyOptions = [
    { value: 'low', label: 'Faible', description: 'Question générale' },
    { value: 'normal', label: 'Normale', description: 'Demande standard' },
    { value: 'high', label: 'Élevée', description: 'Urgent - 24h' },
    { value: 'critical', label: 'Critique', description: 'Immédiat' },
  ];

  const subjectOptions = [
    'Demande de devis',
    'Déclaration de sinistre',
    'Modification de contrat',
    'Question technique',
    'Réclamation',
    'Autre',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          urgency: 'normal',
          preferredContact: 'email',
        });
        setSelectedFiles([]);
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="enhanced-contact-form">
      <div className="contact-header">
        <h2>Contactez-nous</h2>
        <p>Notre équipe est là pour vous aider. Choisissez le moyen qui vous convient le mieux.</p>
      </div>
      <div className="contact-methods">
        <div className="contact-method">
          <div className="method-icon">📞</div>
          <h3>Téléphone</h3>
          <p>01 23 45 67 89</p>
          <span className="method-hours">Lun-Ven: 8h-19h</span>
        </div>
        <div className="contact-method">
          <div className="method-icon">✉️</div>
          <h3>Email</h3>
          <p>contact@assurmobility.fr</p>
          <span className="method-hours">Réponse sous 24h</span>
        </div>
        <div className="contact-method">
          <div className="method-icon">💬</div>
          <h3>Chat en direct</h3>
          <p>Assistant virtuel</p>
          <span className="method-hours">24h/24</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-section">
          <h3>Informations personnelles</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom *</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom *</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Détails de votre demande</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Sujet *</label>
              <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required>
                <option value="">Sélectionnez un sujet</option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="urgency">Urgence</label>
              <select id="urgency" name="urgency" value={formData.urgency} onChange={handleInputChange}>
                {urgencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows="5" placeholder="Décrivez votre demande en détail..." required />
          </div>
          <div className="form-group">
            <label htmlFor="preferredContact">Moyen de contact préféré</label>
            <select id="preferredContact" name="preferredContact" value={formData.preferredContact} onChange={handleInputChange}>
              <option value="email">Email</option>
              <option value="phone">Téléphone</option>
              <option value="chat">Chat</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Pièces jointes (optionnel)</h3>
          <div className="file-upload-area">
            <input type="file" id="fileUpload" multiple onChange={handleFileSelect} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="file-input" />
            <label htmlFor="fileUpload" className="file-upload-label">
              <span className="upload-icon">📎</span>
              <span>Cliquez pour ajouter des fichiers</span>
              <span className="upload-hint">PDF, JPG, PNG, DOC (max 10MB par fichier)</span>
            </label>
          </div>
          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <h4>Fichiers sélectionnés :</h4>
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                  <button type="button" onClick={() => removeFile(index)} className="remove-file">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? <><span className="loading-spinner"></span>Envoi en cours...</> : 'Envoyer le message'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            <div>
              <h4>Message envoyé avec succès !</h4>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EnhancedContactForm;



