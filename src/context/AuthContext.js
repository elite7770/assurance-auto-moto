import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual backend
      if (email === 'client@example.com' && password === 'password123') {
        const user = {
          id: '1',
          email: email,
          name: 'Ahmed Benali',
          phone: '+212 6 12 34 56 78',
          address: '123 Rue Hassan II, 20000 Casablanca',
          postalCode: '20000',
          city: 'Casablanca',
          clientSince: '2022',
          status: 'Premium',
          policies: [
            {
              id: 'POL001',
              type: 'Auto',
              vehicle: 'Peugeot 308',
              brand: 'Peugeot',
              model: '308',
              year: '2020',
              plateNumber: '12345-A-6',
              startDate: '2024-01-01',
              endDate: '2025-01-01',
              status: 'Active',
              premium: 4500,
              franchise: 3000,
              coverage: ['RC Obligatoire', 'Vol', 'Incendie', 'Bris de glace'],
              nextRenewal: '2025-01-01'
            },
            {
              id: 'POL002',
              type: 'Moto',
              vehicle: 'Yamaha MT-07',
              brand: 'Yamaha',
              model: 'MT-07',
              year: '2021',
              plateNumber: '67890-B-6',
              startDate: '2024-03-15',
              endDate: '2025-03-15',
              status: 'Active',
              premium: 2800,
              franchise: 2000,
              coverage: ['RC Obligatoire', 'Vol', 'Assistance'],
              nextRenewal: '2025-03-15'
            },
            {
              id: 'POL003',
              type: 'Auto',
              vehicle: 'Renault Clio',
              brand: 'Renault',
              model: 'Clio',
              year: '2019',
              plateNumber: '11111-C-6',
              startDate: '2023-06-01',
              endDate: '2024-06-01',
              status: 'En attente',
              premium: 3800,
              franchise: 2500,
              coverage: ['RC Obligatoire', 'Vol'],
              nextRenewal: '2024-06-01'
            }
          ],
          claims: [
            {
              id: 'CLM001',
              date: '2024-02-15',
              type: 'Accident',
              description: 'Accident mineur - pare-choc avant endommagé lors d\'un stationnement',
              status: 'En cours',
              amount: 12000,
              policyId: 'POL001',
              documents: ['Photo_degat.jpg', 'Constat_amiable.pdf'],
              estimatedResolution: '2024-12-20'
            },
            {
              id: 'CLM002',
              date: '2024-01-10',
              type: 'Vol',
              description: 'Vol de rétroviseur côté passager',
              status: 'Terminé',
              amount: 8000,
              policyId: 'POL001',
              documents: ['Declaration_vol.pdf', 'Facture_reparation.pdf'],
              resolutionDate: '2024-02-15'
            }
          ],
          invoices: [
            {
              id: 'FAC001',
              number: 'FAC001',
              date: '2024-12-15',
              dueDate: '2025-01-15',
              amount: 4500,
              status: 'Payée',
              policyId: 'POL001',
              description: 'Police Auto POL001 - Renouvellement annuel'
            },
            {
              id: 'FAC002',
              number: 'FAC002',
              date: '2025-01-15',
              dueDate: '2025-02-15',
              amount: 2800,
              status: 'En attente',
              policyId: 'POL002',
              description: 'Police Moto POL002 - Renouvellement annuel'
            },
            {
              id: 'FAC003',
              number: 'FAC003',
              date: '2024-06-01',
              dueDate: '2024-07-01',
              amount: 3800,
              status: 'Payée',
              policyId: 'POL003',
              description: 'Police Auto POL003 - Renouvellement annuel'
            }
          ],
          documents: [
            {
              id: 'DOC001',
              name: 'Certificat_Auto_POL001_2024.pdf',
              type: 'Certificat d\'assurance',
              uploadDate: '2024-01-01',
              policyId: 'POL001',
              size: '2.3 MB'
            },
            {
              id: 'DOC002',
              name: 'Facture_Reparation_CLM002.pdf',
              type: 'Facture de réparation',
              uploadDate: '2024-02-15',
              policyId: 'POL001',
              size: '1.8 MB'
            },
            {
              id: 'DOC003',
              name: 'Permis_Conduire_Ahmed_Benali.pdf',
              type: 'Permis de conduire',
              uploadDate: '2024-01-01',
              policyId: null,
              size: '3.1 MB'
            }
          ],
          notifications: [
            {
              id: 1,
              type: 'renewal',
              title: 'Renouvellement de police',
              message: 'Votre police Auto POL001 expire dans 30 jours',
              date: '2024-12-15',
              read: false,
              priority: 'high'
            },
            {
              id: 2,
              type: 'payment',
              title: 'Paiement reçu',
              message: 'Votre paiement de 4 500 MAD a été reçu pour la police POL001',
              date: '2024-12-10',
              read: true,
              priority: 'medium'
            },
            {
              id: 3,
              type: 'claim',
              title: 'Mise à jour sinistre',
              message: 'Votre sinistre CLM001 a été traité et approuvé',
              date: '2024-12-08',
              read: false,
              priority: 'medium'
            }
          ]
        };
        
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, userData) => {
    try {
      // Simulate API call - replace with actual backend
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        ...userData,
        policies: [],
        claims: [],
        invoices: [],
        documents: [],
        notifications: [],
        clientSince: new Date().getFullYear().toString(),
        status: 'Standard'
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const addPolicy = (policy) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        policies: [...currentUser.policies, policy]
      };
      updateUser(updatedUser);
    }
  };

  const addClaim = (claim) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        claims: [...currentUser.claims, claim]
      };
      updateUser(updatedUser);
    }
  };

  const addDocument = (document) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        documents: [...currentUser.documents, document]
      };
      updateUser(updatedUser);
    }
  };

  const updateNotification = (notificationId, updates) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        notifications: currentUser.notifications.map(notif => 
          notif.id === notificationId ? { ...notif, ...updates } : notif
        )
      };
      updateUser(updatedUser);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    addPolicy,
    addClaim,
    addDocument,
    updateNotification,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
