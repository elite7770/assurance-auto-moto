import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  CreditCard, 
  User, 
  Bell, 
  Download, 
  Eye, 
  Plus,
  Search,
  Calendar,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout, addDocument, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claimDocModalClaim, setClaimDocModalClaim] = useState(null);
  const [claimDocFile, setClaimDocFile] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Mock data for enhanced functionality
  const mockNotifications = useMemo(() => [
    {
      id: 1,
      type: 'renewal',
      title: 'Renouvellement de police',
      message: 'Votre police Auto POL001 expire dans 30 jours',
      date: '2024-12-15',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      title: 'Paiement reçu',
      message: 'Votre paiement de 450 MAD a été reçu',
      date: '2024-12-10',
      read: true
    },
    {
      id: 3,
      type: 'claim',
      title: 'Mise à jour sinistre',
      message: 'Votre sinistre CLM001 a été traité',
      date: '2024-12-08',
      read: false
    }
  ], []);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, [mockNotifications]);

  const handleLogout = () => {
    logout();
    navigate('/espace-client');
  };

  const handleNewQuote = () => {
    navigate('/devis');
  };

  const handleContactSupport = () => {
    navigate('/contact');
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

  const handleTrackClaim = (claim) => {
    setActiveTab('claims');
    setSelectedClaim(claim);
  };

  const handleAddClaimDocuments = (claim) => {
    setActiveTab('claims');
    setClaimDocModalClaim(claim);
    setClaimDocFile(null);
  };

  const handleSubmitClaimDocument = async (e) => {
    e.preventDefault();
    if (!claimDocFile || !claimDocModalClaim) {
      alert('Veuillez sélectionner un fichier');
      return;
    }
    const file = claimDocFile;
    const sizeMb = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    const newDoc = {
      id: `DOC${Date.now()}`,
      name: file.name,
      type: 'Document de sinistre',
      uploadDate: new Date().toISOString().slice(0, 10),
      policyId: claimDocModalClaim.policyId || null,
      size: sizeMb
    };
    addDocument(newDoc);

    if (currentUser) {
      const updatedClaims = (currentUser.claims || []).map(c => {
        if (c.id === claimDocModalClaim.id) {
          const existingDocs = Array.isArray(c.documents) ? c.documents : [];
          return { ...c, documents: [...existingDocs, file.name] };
        }
        return c;
      });
      updateUser({ ...currentUser, claims: updatedClaims });
    }

    alert('Document ajouté au sinistre');
    setClaimDocModalClaim(null);
    setClaimDocFile(null);
  };

  const handleViewPolicyDetails = (policy) => {
    setActiveTab('policies');
    setSelectedPolicy(policy);
  };

  const handleRenewPolicy = (policy) => {
    try {
      const isAuto = (policy.type || '').toLowerCase() === 'auto';
      const fullName = currentUser?.name || '';
      const nameParts = fullName.split(' ');
      const prenom = nameParts.slice(0, -1).join(' ') || fullName;
      const nom = nameParts.slice(-1).join(' ') || '';

      const coverage = policy.coverage || [];
      const devisData = {
        vehiculeType: isAuto ? 'auto' : 'moto',
        marque: policy.brand || '',
        modele: policy.model || '',
        annee: policy.year || '',
        puissance: '',
        usage: 'personnel',
        nom,
        prenom,
        email: currentUser?.email || '',
        telephone: currentUser?.phone || '',
        age: '',
        permisDate: '',
        experience: '',
        adresse: currentUser?.address || '',
        codePostal: currentUser?.postalCode || '',
        ville: currentUser?.city || '',
        garantieVol: coverage.includes('Vol'),
        garantieBris: coverage.includes('Bris de glace'),
        garantieTousRisques: coverage.includes('Tous Risques'),
        garantieAssistance: coverage.includes('Assistance'),
        garantieDefense: coverage.includes('Défense pénale') || coverage.includes('Défense'),
        franchise: String(policy.franchise || '3000'),
        bonus: '0'
      };

      localStorage.setItem('devisFormData', JSON.stringify(devisData));
      navigate('/devis');
    } catch (err) {
      alert("Impossible d'initier le renouvellement. Veuillez réessayer.");
    }
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'En cours': return 'status-pending';
      case 'Terminé': return 'status-completed';
      case 'En attente': return 'status-waiting';
      default: return 'status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle size={16} />;
      case 'En cours': return <Clock size={16} />;
      case 'Terminé': return <CheckCircle size={16} />;
      case 'En attente': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };
  // Billing derived data
  const invoices = useMemo(() => currentUser?.invoices ?? [], [currentUser?.invoices]);
  const amountDue = useMemo(
    () => invoices.filter(inv => inv.status === 'En attente').reduce((sum, inv) => sum + inv.amount, 0),
    [invoices]
  );
  const lastPaidInvoice = useMemo(() => {
    const paid = invoices.filter(inv => inv.status === 'Payée');
    paid.sort((a, b) => new Date(b.date) - new Date(a.date));
    return paid[0] || null;
  }, [invoices]);
  const nextDueInvoice = useMemo(() => {
    const pending = invoices.filter(inv => inv.status === 'En attente');
    pending.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return pending[0] || null;
  }, [invoices]);

  const handleOpenPayment = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentMethod('card');
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!selectedInvoice || !currentUser) return;
    setIsPaying(true);
    setTimeout(() => {
      const updatedInvoices = (currentUser.invoices || []).map(inv =>
        inv.id === selectedInvoice.id ? { ...inv, status: 'Payée' } : inv
      );
      updateUser({ ...currentUser, invoices: updatedInvoices });
      setIsPaying(false);
      setShowPaymentModal(false);
      alert('Paiement effectué avec succès');
    }, 800);
  };

  const filteredPolicies = currentUser?.policies?.filter(policy => 
    policy.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.id.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredClaims = currentUser?.claims?.filter(claim => 
    claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            <div className="user-badges">
              <span className="user-email">{currentUser?.email}</span>
              <span className="user-status">Client Premium</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <div className="notifications-dropdown">
            <button className="notification-btn">
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button className="mark-all-read" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>Tout marquer comme lu</button>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      {notification.type === 'renewal' && <Shield size={16} />}
                      {notification.type === 'payment' && <CreditCard size={16} />}
                      {notification.type === 'claim' && <FileText size={16} />}
                    </div>
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-date">{formatDate(notification.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={18} />
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Shield size={18} />
          Vue d'ensemble
        </button>
        <button 
          className={`nav-tab ${activeTab === 'policies' ? 'active' : ''}`}
          onClick={() => setActiveTab('policies')}
        >
          <Shield size={18} />
          Mes Polices
        </button>
        <button 
          className={`nav-tab ${activeTab === 'claims' ? 'active' : ''}`}
          onClick={() => setActiveTab('claims')}
        >
          <FileText size={18} />
          Mes Sinistres
        </button>
        <button 
          className={`nav-tab ${activeTab === 'billing' ? 'active' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          <CreditCard size={18} />
          Facturation
        </button>
        <button 
          className={`nav-tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <FileText size={18} />
          Documents
        </button>
        <button 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={18} />
          Profil
        </button>
      </nav>

      {/* Content Area */}
      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="welcome-banner">
              <div className="welcome-content">
                <h2>Bienvenue dans votre espace client</h2>
                <p>Gérez vos polices, suivez vos sinistres et accédez à tous vos documents en un clic.</p>
                <div className="welcome-actions">
                  <button className="btn-primary" onClick={handleNewQuote}>
                    <Plus size={18} />
                    Nouveau Devis
                  </button>
                  <button className="btn-secondary" onClick={handleContactSupport}>
                    Contacter le Support
                  </button>
                </div>
              </div>
              <div className="welcome-illustration">
                <Shield size={80} />
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <Shield size={24} />
                </div>
                <h3>Polices Actives</h3>
                <p className="stat-number">{currentUser?.policies?.length || 0}</p>
                <p className="stat-label">polices en cours</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FileText size={24} />
                </div>
                <h3>Sinistres</h3>
                <p className="stat-number">{currentUser?.claims?.length || 0}</p>
                <p className="stat-label">sinistres déclarés</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <DollarSign size={24} />
                </div>
                <h3>Prime Totale</h3>
                <p className="stat-number">
                  {currentUser?.policies?.reduce((sum, policy) => sum + policy.premium, 0) || 0} MAD
                </p>
                <p className="stat-label">par an</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Calendar size={24} />
                </div>
                <h3>Prochain Renouvellement</h3>
                <p className="stat-number">30 jours</p>
                <p className="stat-label">Auto - POL001</p>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Actions Rapides</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={handleNewQuote}>
                  <Plus size={18} />
                  Nouveau Devis
                </button>
                <button className="action-btn" onClick={() => setActiveTab('claims')}>
                  <FileText size={18} />
                  Déclarer un Sinistre
                </button>
                <button className="action-btn" onClick={() => setActiveTab('profile')}>
                  <User size={18} />
                  Modifier le Profil
                </button>
                <button className="action-btn" onClick={handleContactSupport}>
                  Contacter le Support
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Activité Récente</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <Shield size={16} />
                  </div>
                  <div className="activity-content">
                    <p>Nouvelle police Auto souscrite</p>
                    <span className="activity-date">Il y a 2 jours</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <CreditCard size={16} />
                  </div>
                  <div className="activity-content">
                    <p>Paiement reçu pour la police POL001</p>
                    <span className="activity-date">Il y a 5 jours</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <FileText size={16} />
                  </div>
                  <div className="activity-content">
                    <p>Document téléchargé pour le sinistre CLM001</p>
                    <span className="activity-date">Il y a 1 semaine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="policies-section">
            <div className="section-header">
              <h2>Mes Polices d'Assurance</h2>
              <div className="section-actions">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher une police..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actives</option>
                  <option value="expired">Expirées</option>
                  <option value="pending">En attente</option>
                </select>
                <button className="btn-primary">
                  <Plus size={18} />
                  Nouvelle Police
                </button>
              </div>
            </div>

            <div className="policies-grid">
              {filteredPolicies.map((policy) => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-header">
                    <div className="policy-type">
                      <Shield size={20} />
                      <h3>{policy.type} - {policy.vehicle}</h3>
                    </div>
                    <span className={`status-badge ${getStatusColor(policy.status)}`}>
                      {getStatusIcon(policy.status)}
                      {policy.status}
                    </span>
                  </div>
                  <div className="policy-details">
                    <div className="detail-row">
                      <span className="detail-label">Numéro:</span>
                      <span className="detail-value">{policy.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Début:</span>
                      <span className="detail-value">{formatDate(policy.startDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Fin:</span>
                      <span className="detail-value">{formatDate(policy.endDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Prime:</span>
                      <span className="detail-value premium">{policy.premium} MAD/an</span>
                    </div>
                  </div>
                  <div className="policy-actions">
                    <button className="btn-secondary" onClick={() => handleViewPolicyDetails(policy)}>
                      <Eye size={16} />
                      Voir les Détails
                    </button>
                    <button className="btn-primary" onClick={() => handleRenewPolicy(policy)}>
                      <Shield size={16} />
                      Renouveler
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedPolicy && (
              <div className="policy-modal-overlay" onClick={() => setSelectedPolicy(null)}>
                <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Détails de la Police #{selectedPolicy.id}</h3>
                    <button className="btn-secondary" onClick={() => setSelectedPolicy(null)}>Fermer</button>
                  </div>
                  <div className="modal-content">
                    <div className="detail-row"><span className="detail-label">Type:</span><span className="detail-value">{selectedPolicy.type}</span></div>
                    <div className="detail-row"><span className="detail-label">Véhicule:</span><span className="detail-value">{selectedPolicy.vehicle}</span></div>
                    <div className="detail-row"><span className="detail-label">Marque/Modèle:</span><span className="detail-value">{selectedPolicy.brand} {selectedPolicy.model}</span></div>
                    <div className="detail-row"><span className="detail-label">Année:</span><span className="detail-value">{selectedPolicy.year}</span></div>
                    <div className="detail-row"><span className="detail-label">Immatriculation:</span><span className="detail-value">{selectedPolicy.plateNumber}</span></div>
                    <div className="detail-row"><span className="detail-label">Période:</span><span className="detail-value">{formatDate(selectedPolicy.startDate)} → {formatDate(selectedPolicy.endDate)}</span></div>
                    <div className="detail-row"><span className="detail-label">Prime:</span><span className="detail-value premium">{selectedPolicy.premium} MAD/an</span></div>
                    <div className="detail-row"><span className="detail-label">Franchise:</span><span className="detail-value">{selectedPolicy.franchise} MAD</span></div>
                    <div className="detail-row"><span className="detail-label">Garanties:</span><span className="detail-value">{(selectedPolicy.coverage || []).join(', ') || '—'}</span></div>
                    <div className="detail-row"><span className="detail-label">Statut:</span><span className={`detail-value ${getStatusColor(selectedPolicy.status)}`}>{selectedPolicy.status}</span></div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-secondary" onClick={() => setSelectedPolicy(null)}>
                      Fermer
                    </button>
                    <button className="btn-primary" onClick={() => handleRenewPolicy(selectedPolicy)}>
                      <Shield size={16} />
                      Renouveler
                    </button>
                  </div>
                </div>
                <style>{`
                  .policy-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                  .policy-modal { background: #fff; border-radius: 8px; max-width: 640px; width: 95%; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                  .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #eee; }
                  .modal-content { padding: 16px 20px; }
                  .modal-actions { padding: 16px 20px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #eee; }
                `}</style>
              </div>
            )}
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="claims-section">
            <div className="section-header">
              <h2>Mes Sinistres</h2>
              <div className="section-actions">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher un sinistre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn-primary" onClick={() => setActiveTab('new-claim')}>
                  <Plus size={18} />
                  Nouveau Sinistre
                </button>
              </div>
            </div>

            <div className="claims-list">
              {filteredClaims.map((claim) => (
                <div key={claim.id} className="claim-card">
                  <div className="claim-header">
                    <div className="claim-info">
                      <h3>Sinistre #{claim.id}</h3>
                      <span className="claim-date">{formatDate(claim.date)}</span>
                    </div>
                    <span className={`status-badge ${getStatusColor(claim.status)}`}>
                      {getStatusIcon(claim.status)}
                      {claim.status}
                    </span>
                  </div>
                  <div className="claim-details">
                    <p className="claim-description">{claim.description}</p>
                    <div className="claim-meta">
                      <span className="claim-amount">{claim.amount} MAD</span>
                      <span className="claim-policy">POL001</span>
                    </div>
                  </div>
                  <div className="claim-actions">
                    <button className="btn-secondary" onClick={() => handleTrackClaim(claim)}>
                      <Eye size={16} />
                      Suivre l'Avancement
                    </button>
                    <button className="btn-primary" onClick={() => handleAddClaimDocuments(claim)}>
                      <FileText size={16} />
                      Ajouter des Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedClaim && (
              <div className="policy-modal-overlay" onClick={() => setSelectedClaim(null)}>
                <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Suivi du Sinistre #{selectedClaim.id}</h3>
                    <button className="btn-secondary" onClick={() => setSelectedClaim(null)}>Fermer</button>
                  </div>
                  <div className="modal-content">
                    <div className="detail-row"><span className="detail-label">Date:</span><span className="detail-value">{formatDate(selectedClaim.date)}</span></div>
                    <div className="detail-row"><span className="detail-label">Statut:</span><span className={`detail-value ${getStatusColor(selectedClaim.status)}`}>{selectedClaim.status}</span></div>
                    <div className="detail-row"><span className="detail-label">Montant:</span><span className="detail-value">{selectedClaim.amount} MAD</span></div>
                    <div className="detail-row"><span className="detail-label">Description:</span><span className="detail-value">{selectedClaim.description}</span></div>
                    <div className="detail-row"><span className="detail-label">Documents:</span><span className="detail-value">{(selectedClaim.documents || []).join(', ') || '—'}</span></div>
                    <div className="claim-timeline">
                      <ul>
                        <li>Déclaré le {formatDate(selectedClaim.date)}</li>
                        {selectedClaim.status === 'Terminé' && selectedClaim.resolutionDate && (
                          <li>Résolu le {formatDate(selectedClaim.resolutionDate)}</li>
                        )}
                        {selectedClaim.status !== 'Terminé' && selectedClaim.estimatedResolution && (
                          <li>Résolution estimée le {formatDate(selectedClaim.estimatedResolution)}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-secondary" onClick={() => setSelectedClaim(null)}>Fermer</button>
                    <button className="btn-primary" onClick={() => { setSelectedClaim(null); handleAddClaimDocuments(selectedClaim); }}>Ajouter des Documents</button>
                  </div>
                </div>
                <style>{`
                  .policy-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                  .policy-modal { background: #fff; border-radius: 8px; max-width: 640px; width: 95%; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                  .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #eee; }
                  .modal-content { padding: 16px 20px; }
                  .modal-actions { padding: 16px 20px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #eee; }
                `}</style>
              </div>
            )}

            {claimDocModalClaim && (
              <div className="policy-modal-overlay" onClick={() => setClaimDocModalClaim(null)}>
                <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Ajouter des Documents - Sinistre #{claimDocModalClaim.id}</h3>
                    <button className="btn-secondary" onClick={() => setClaimDocModalClaim(null)}>Fermer</button>
                  </div>
                  <form onSubmit={handleSubmitClaimDocument} className="modal-content">
                    <div className="form-group">
                      <label>Fichier</label>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setClaimDocFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} required />
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setClaimDocModalClaim(null)}>Annuler</button>
                      <button type="submit" className="btn-primary">Ajouter</button>
                    </div>
                  </form>
                </div>
                <style>{`
                  .policy-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                  .policy-modal { background: #fff; border-radius: 8px; max-width: 640px; width: 95%; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                  .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #eee; }
                  .modal-content { padding: 16px 20px; }
                  .modal-actions { padding: 16px 20px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #eee; }
                `}</style>
              </div>
            )}

            <div className="new-claim-form">
              <h3>Déclarer un Nouveau Sinistre</h3>
              <form onSubmit={handleSubmitClaim}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type de sinistre</label>
                    <select required>
                      <option value="">Sélectionner un type</option>
                      <option value="accident">Accident de voiture</option>
                      <option value="theft">Vol</option>
                      <option value="damage">Dégâts</option>
                      <option value="fire">Incendie</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date du sinistre</label>
                    <input type="date" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description du sinistre</label>
                  <textarea 
                    rows="4" 
                    placeholder="Décrivez les circonstances du sinistre..."
                    required
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Police concernée</label>
                    <select required>
                      <option value="">Sélectionner une police</option>
                      {currentUser?.policies?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                          {policy.type} - {policy.vehicle} ({policy.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Montant estimé (MAD)</label>
                    <input type="number" placeholder="0" min="0" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Document de preuve</label>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  {selectedFile && (
                    <p className="file-info">
                      Fichier sélectionné: {selectedFile.name}
                    </p>
                  )}
                </div>
                <button type="submit" disabled={uploading} className="btn-primary">
                  {uploading ? 'Envoi en cours...' : 'Déclarer le Sinistre'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="billing-section">
            <div className="section-header">
              <h2>Facturation et Paiements</h2>
              <div className="section-actions">
                <button className="btn-primary" onClick={() => nextDueInvoice ? handleOpenPayment(nextDueInvoice) : null}>
                  <CreditCard size={18} />
                  Payer une Facture
                </button>
              </div>
            </div>

            <div className="billing-overview">
              <div className="billing-stats">
                <div className="billing-stat">
                  <h3>Montant dû</h3>
                  <p className="amount-due">{amountDue} MAD</p>
                  <span className="due-date">Échéance: {nextDueInvoice ? formatDate(nextDueInvoice.dueDate) : '—'}</span>
                </div>
                <div className="billing-stat">
                  <h3>Dernier paiement</h3>
                  <p className="last-payment">{lastPaidInvoice ? `${lastPaidInvoice.amount} MAD` : '—'}</p>
                  <span className="payment-date">{lastPaidInvoice ? `Le ${formatDate(lastPaidInvoice.date)}` : ''}</span>
                </div>
                <div className="billing-stat">
                  <h3>Prochaine échéance</h3>
                  <p className="next-due">{nextDueInvoice ? `${nextDueInvoice.amount} MAD` : '—'}</p>
                  <span className="due-date">{nextDueInvoice ? `Le ${formatDate(nextDueInvoice.dueDate)}` : ''}</span>
                </div>
              </div>
            </div>

            <div className="invoices-list">
              <h3>Historique des Factures</h3>
              {invoices.map(inv => (
                <div key={inv.id} className="invoice-item">
                  <div className="invoice-info">
                    <h4>Facture #{inv.number}</h4>
                    <p>{inv.description}</p>
                    <span className="invoice-date">{formatDate(inv.date)}</span>
                  </div>
                  <div className="invoice-amount">
                    <span className="amount">{inv.amount} MAD</span>
                    <span className={`status ${inv.status === 'Payée' ? 'paid' : (inv.status === 'En attente' ? 'pending' : '')}`}>{inv.status}</span>
                  </div>
                  <div className="invoice-actions">
                    {inv.status === 'En attente' && (
                      <button className="btn-primary" onClick={() => handleOpenPayment(inv)}>
                        <CreditCard size={16} />
                        Payer
                      </button>
                    )}
                    <button className="btn-secondary">
                      <Download size={16} />
                      Télécharger
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showPaymentModal && selectedInvoice && (
              <div className="policy-modal-overlay" onClick={() => setShowPaymentModal(false)}>
                <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Payer la Facture #{selectedInvoice.number}</h3>
                    <button className="btn-secondary" onClick={() => setShowPaymentModal(false)}>Fermer</button>
                  </div>
                  <form className="modal-content" onSubmit={handleConfirmPayment}>
                    <div className="detail-row"><span className="detail-label">Montant:</span><span className="detail-value">{selectedInvoice.amount} MAD</span></div>
                    <div className="detail-row"><span className="detail-label">Échéance:</span><span className="detail-value">{formatDate(selectedInvoice.dueDate)}</span></div>
                    <div className="form-group">
                      <label>Méthode de paiement</label>
                      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="card">Carte bancaire</option>
                        <option value="transfer">Virement</option>
                        <option value="cash">Espèces (agence)</option>
                      </select>
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setShowPaymentModal(false)}>Annuler</button>
                      <button type="submit" className="btn-primary" disabled={isPaying}>{isPaying ? 'Paiement...' : 'Payer maintenant'}</button>
                    </div>
                  </form>
                </div>
                <style>{`
                  .policy-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                  .policy-modal { background: #fff; border-radius: 8px; max-width: 640px; width: 95%; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                  .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #eee; }
                  .modal-content { padding: 16px 20px; }
                  .modal-actions { padding: 16px 20px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #eee; }
                `}</style>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-section">
            <div className="section-header">
              <h2>Mes Documents</h2>
              <div className="section-actions">
                <button className="btn-primary">
                  <Plus size={18} />
                  Télécharger un Document
                </button>
              </div>
            </div>

            <div className="upload-area">
              <h3>Télécharger un Document</h3>
              <form onSubmit={handleSubmitClaim}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type de document</label>
                    <select required>
                      <option value="">Sélectionner un type</option>
                      <option value="claim">Justificatif de sinistre</option>
                      <option value="repair">Facture de réparation</option>
                      <option value="certificate">Certificat d'assurance</option>
                      <option value="license">Permis de conduire</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Police concernée</label>
                    <select>
                      <option value="">Toutes les polices</option>
                      {currentUser?.policies?.map(policy => (
                        <option key={policy.id} value={policy.id}>
                          {policy.type} - {policy.vehicle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Fichier</label>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  {selectedFile && (
                    <p className="file-info">
                      Fichier sélectionné: {selectedFile.name}
                    </p>
                  )}
                </div>
                <button type="submit" disabled={uploading} className="btn-primary">
                  {uploading ? 'Téléchargement...' : 'Télécharger'}
                </button>
              </form>
            </div>

            <div className="documents-list">
              <h3>Documents Téléchargés</h3>
              <div className="documents-grid">
                <div className="document-item">
                  <div className="document-icon">
                    <FileText size={24} />
                  </div>
                  <div className="document-info">
                    <h4>Certificat_Auto_2024.pdf</h4>
                    <p>Certificat d'assurance</p>
                    <span className="document-date">15/01/2024</span>
                  </div>
                  <div className="document-actions">
                    <button className="btn-secondary">
                      <Eye size={16} />
                      Voir
                    </button>
                    <button className="btn-secondary">
                      <Download size={16} />
                      Télécharger
                    </button>
                  </div>
                </div>
                <div className="document-item">
                  <div className="document-icon">
                    <FileText size={24} />
                  </div>
                  <div className="document-info">
                    <h4>Facture_Reparation_001.pdf</h4>
                    <p>Facture de réparation</p>
                    <span className="document-date">20/02/2024</span>
                  </div>
                  <div className="document-actions">
                    <button className="btn-secondary">
                      <Eye size={16} />
                      Voir
                    </button>
                    <button className="btn-secondary">
                      <Download size={16} />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Mon Profil</h2>
              <div className="section-actions">
                <button className="btn-secondary">
                  <Settings size={18} />
                  Paramètres
                </button>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-overview">
                <div className="profile-avatar">
                  <div className="avatar-large">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                  <button className="change-avatar-btn">Changer la photo</button>
                </div>
                <div className="profile-info">
                  <h3>{currentUser?.name || 'Utilisateur'}</h3>
                  <p className="profile-email">{currentUser?.email}</p>
                  <p className="profile-status">Client depuis 2024</p>
                </div>
              </div>

              <div className="profile-form">
                <h3>Informations Personnelles</h3>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Prénom</label>
                      <input 
                        type="text" 
                        defaultValue={currentUser?.name?.split(' ')[0] || ''} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Nom</label>
                      <input 
                        type="text" 
                        defaultValue={currentUser?.name?.split(' ')[1] || ''} 
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        defaultValue={currentUser?.email || ''} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input 
                        type="tel" 
                        defaultValue="+212 6 12 34 56 78" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Adresse</label>
                    <textarea 
                      rows="3" 
                      defaultValue="123 Rue de la Paix, 20000 Casablanca"
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Code postal</label>
                      <input type="text" defaultValue="20000" />
                    </div>
                    <div className="form-group">
                      <label>Ville</label>
                      <input type="text" defaultValue="Casablanca" />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Sauvegarder les Modifications
                    </button>
                    <button type="button" className="btn-secondary">
                      Annuler
                    </button>
                  </div>
                </form>
              </div>

              <div className="security-section">
                <h3>Sécurité</h3>
                <div className="security-options">
                  <button className="btn-secondary">
                    <Settings size={16} />
                    Changer le mot de passe
                  </button>
                  <button className="btn-secondary">
                    <Bell size={16} />
                    Préférences de notifications
                  </button>
                  <button className="btn-secondary">
                    <Shield size={16} />
                    Authentification à deux facteurs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
