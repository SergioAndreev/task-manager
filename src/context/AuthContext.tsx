import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_KEY = 'auth_v1';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_KEY);
        console.log('AsyncStorage value:', raw);
        setIsAuthenticated(raw === 'true');
      } catch (error) {
        console.error('AsyncStorage error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (username: string, password: string) => {
    // Hardcoded credentials
    const ok = username === 'admin' && password === '1234';
    if (ok) {
      setIsAuthenticated(true);
      await AsyncStorage.setItem(AUTH_KEY, 'true');
    }
    return ok;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.setItem(AUTH_KEY, 'false');
  };

  const value = useMemo(() => ({ isAuthenticated, login, logout, loading }), [isAuthenticated, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
