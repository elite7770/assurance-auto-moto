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
          name: 'Jean Dupont',
          policies: [
            {
              id: 'POL001',
              type: 'Auto',
              vehicle: 'Peugeot 308',
              startDate: '2024-01-01',
              endDate: '2025-01-01',
              status: 'Active',
              premium: 450
            },
            {
              id: 'POL002',
              type: 'Moto',
              vehicle: 'Yamaha MT-07',
              startDate: '2024-03-15',
              endDate: '2025-03-15',
              status: 'Active',
              premium: 280
            }
          ],
          claims: [
            {
              id: 'CLM001',
              date: '2024-02-15',
              description: 'Accident mineur - pare-choc avant',
              status: 'En cours',
              amount: 1200
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

  const register = async (userData) => {
    try {
      // Simulate API call - replace with actual backend
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        policies: [],
        claims: []
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

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
