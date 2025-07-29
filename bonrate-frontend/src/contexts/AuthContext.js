import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();
  
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  // Check token expiration
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken || isTokenExpired(storedToken)) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setUser(null);
      } else {
        setToken(storedToken);
        setUser({ email: 'user@example.com' });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Track user activity
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  // Set up activity listeners and inactivity check
  useEffect(() => {
    if (token) {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      events.forEach(event => {
        document.addEventListener(event, updateActivity, true);
      });

      const interval = setInterval(() => {
        const now = Date.now();
        
        if (isTokenExpired(token)) {
          logout();
        } else if (now - lastActivity > INACTIVITY_TIMEOUT) {
          logout();
        }
      }, 60000); // Check every minute

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, updateActivity, true);
        });
        clearInterval(interval);
      };
    }
  }, [token, lastActivity]);

  const login = (tokenData, userData) => {
    localStorage.setItem('token', tokenData.access_token);
    if (tokenData.refresh_token) {
      localStorage.setItem('refreshToken', tokenData.refresh_token);
    }
    setToken(tokenData.access_token);
    setUser(userData);
    setLastActivity(Date.now());
    navigate('/dashboard');
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!token && !isTokenExpired(token)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};