import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ef_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ef_token') || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ef_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ef_user');
    }
    if (token) {
      localStorage.setItem('ef_token', token);
    } else {
      localStorage.removeItem('ef_token');
    }
  }, [user, token]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, message: 'Connexion réussie.' };
      } else {
        return { success: false, message: data.message || 'Identifiants invalides.' };
      }
    } catch (err) {
      // Fallback local authentication for offline mode or dev
      if (email.toLowerCase() === 'electro_fennassa@proton.me' && pass === 'Nour@1969') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Administration ELECTRO_FENNASSA',
          email: 'Electro_Fennassa@proton.me',
          role: 'admin',
          phone: '+212644543909',
          address: 'BD la Résistance, Hay Jdid, Taourirt'
        };
        const fakeToken = 'offline-jwt-admin-token-2026';
        setUser(adminUser);
        setToken(fakeToken);
        return { success: true, message: 'Connexion Administrateur réussie.' };
      }
      return { success: false, message: 'Erreur de serveur de connexion.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
