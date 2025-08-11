import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/espace-client');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    // Simulate file upload
    setTimeout(() => {
      alert('Document téléchargé avec succès !');
      setSelectedFile(null);
      setUploading(false);
    }, 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'En cours': return 'status-pending';
      case 'Terminé': return 'status-completed';
      default: return 'status-default';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-details">
            <h1>Bonjour, {currentUser?.name || 'Utilisateur'} !</h1>
            <p>{currentUser?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Se déconnecter
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Vue d'ensemble
        </button>
        <button 
          className={`nav-tab ${activeTab === 'policies' ? 'active' : ''}`}
          onClick={() => setActiveTab('policies')}
        >
          Mes Polices
        </button>
        <button 
          className={`nav-tab ${activeTab === 'claims' ? 'active' : ''}`}
          onClick={() => setActiveTab('claims')}
        >
          Mes Sinistres
        </button>
        <button 
          className={`nav-tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
        <button 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profil
        </button>
      </nav>

      {/* Content Area */}
      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Polices Actives</h3>
                <p className="stat-number">{currentUser?.policies?.length || 0}</p>
                <p className="stat-label">polices en cours</p>
              </div>
              <div className="stat-card">
                <h3>Sinistres</h3>
                <p className="stat-number">{currentUser?.claims?.length || 0}</p>
                <p className="stat-label">sinistres déclarés</p>
              </div>
              <div className="stat-card">
                <h3>Prime Totale</h3>
                <p className="stat-number">
                  {currentUser?.policies?.reduce((sum, policy) => sum + policy.premium, 0) || 0}€
                </p>
                <p className="stat-label">par an</p>
              </div>
              <div className="stat-card">
                <h3>Prochain Renouvellement</h3>
                <p className="stat-number">30 jours</p>
                <p className="stat-label">Auto - POL001</p>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Actions Rapides</h3>
              <div className="action-buttons">
                <button className="action-btn">Nouveau Devis</button>
                <button className="action-btn">Déclarer un Sinistre</button>
                <button className="action-btn">Modifier le Profil</button>
                <button className="action-btn">Contacter le Support</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="policies-section">
            <h2>Mes Polices d'Assurance</h2>
            <div className="policies-grid">
              {currentUser?.policies?.map((policy) => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-header">
                    <h3>{policy.type} - {policy.vehicle}</h3>
                    <span className={`status-badge ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>
                  <div className="policy-details">
                    <p><strong>Numéro:</strong> {policy.id}</p>
                    <p><strong>Début:</strong> {formatDate(policy.startDate)}</p>
                    <p><strong>Fin:</strong> {formatDate(policy.endDate)}</p>
                    <p><strong>Prime:</strong> {policy.premium}€/an</p>
                  </div>
                  <div className="policy-actions">
                    <button className="btn-secondary">Voir les Détails</button>
                    <button className="btn-primary">Renouveler</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="claims-section">
            <h2>Mes Sinistres</h2>
            <div className="claims-list">
              {currentUser?.claims?.map((claim) => (
                <div key={claim.id} className="claim-card">
                  <div className="claim-header">
                    <h3>Sinistre #{claim.id}</h3>
                    <span className={`status-badge ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </div>
                  <div className="claim-details">
                    <p><strong>Date:</strong> {formatDate(claim.date)}</p>
                    <p><strong>Description:</strong> {claim.description}</p>
                    <p><strong>Montant:</strong> {claim.amount}€</p>
                  </div>
                  <div className="claim-actions">
                    <button className="btn-secondary">Suivre l'Avancement</button>
                    <button className="btn-primary">Ajouter des Documents</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="new-claim-form">
              <h3>Déclarer un Nouveau Sinistre</h3>
              <form onSubmit={handleSubmitClaim}>
                <div className="form-group">
                  <label>Description du sinistre</label>
                  <textarea rows="4" placeholder="Décrivez les circonstances du sinistre..."></textarea>
                </div>
                <div className="form-group">
                  <label>Document de preuve</label>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {selectedFile && <p className="file-info">Fichier sélectionné: {selectedFile.name}</p>}
                </div>
                <button type="submit" disabled={uploading} className="btn-primary">
                  {uploading ? 'Envoi en cours...' : 'Déclarer le Sinistre'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-section">
            <h2>Mes Documents</h2>
            <div className="upload-area">
              <h3>Télécharger un Document</h3>
              <form onSubmit={handleSubmitClaim}>
                <div className="form-group">
                  <label>Type de document</label>
                  <select>
                    <option>Justificatif de sinistre</option>
                    <option>Facture de réparation</option>
                    <option>Certificat d'assurance</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fichier</label>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <button type="submit" disabled={uploading} className="btn-primary">
                  {uploading ? 'Téléchargement...' : 'Télécharger'}
                </button>
              </form>
            </div>

            <div className="documents-list">
              <h3>Documents Téléchargés</h3>
              <div className="document-item">
                <span>📄 Certificat_Auto_2024.pdf</span>
                <span>15/01/2024</span>
                <button className="btn-secondary">Télécharger</button>
              </div>
              <div className="document-item">
                <span>📄 Facture_Reparation_001.pdf</span>
                <span>20/02/2024</span>
                <button className="btn-secondary">Télécharger</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Mon Profil</h2>
            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input type="text" defaultValue={currentUser?.name?.split(' ')[0] || ''} />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" defaultValue={currentUser?.name?.split(' ')[1] || ''} />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={currentUser?.email || ''} />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input type="tel" defaultValue="+33 6 12 34 56 78" />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <textarea rows="3" defaultValue="123 Rue de la Paix, 75001 Paris"></textarea>
              </div>
              <button className="btn-primary">Sauvegarder les Modifications</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
