import { useState, useCallback, useEffect } from 'react';
import type { User, AuthResponse } from '../models/Auth';

const API_BASE_URL = 'http://localhost:3001/api/auth';

export function useAuthViewModel() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Invalid stored user
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const persistSession = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data: AuthResponse = await response.json();
      
      if (data.success && data.token && data.user) {
        persistSession(data.token, data.user);
        return true;
      } else {
        setErrorMsg(data.error || 'Signup failed');
        return false;
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data: AuthResponse = await response.json();
      
      if (data.success && data.token && data.user) {
        persistSession(data.token, data.user);
        return true;
      } else {
        setErrorMsg(data.error || 'Login failed');
        return false;
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data: AuthResponse = await response.json();
      
      if (data.success) {
        return true;
      } else {
        setErrorMsg(data.error || 'Password reset failed');
        return false;
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    errorMsg,
    signup,
    login,
    forgotPassword,
    logout,
    clearError: () => setErrorMsg(null)
  };
}
