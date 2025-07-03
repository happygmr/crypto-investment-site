import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, API_URL } from '../utils/api';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  profile?: any;
  admin?: any;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUser(token: string) {
    try {
      const res = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    const data = await apiLogin(email, password);
    setToken(data.token || data.access_token);
    localStorage.setItem('token', data.token || data.access_token);
    await fetchUser(data.token || data.access_token);
    setLoading(false);
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    const data = await apiRegister(name, email, password);
    setToken(data.token || data.access_token);
    localStorage.setItem('token', data.token || data.access_token);
    await fetchUser(data.token || data.access_token);
    setLoading(false);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }

  const isAdmin = !!user?.admin;

  return (
    <AuthContext.Provider value={{ user, isAdmin, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
} 