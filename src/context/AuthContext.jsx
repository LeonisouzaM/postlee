import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage
  const initAuth = async () => {
    const token = localStorage.getItem('postlee_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Fetch user profile
      const userRes = await api.get('/auth/me');
      setUser(userRes.user);

      // Fetch user projects
      const projRes = await api.get('/projects');
      if (projRes.projects.length > 0) {
        setActiveProject(projRes.projects[0]);
      } else {
        // Auto create a default project if they have none
        const newProj = await api.post('/projects', { name: 'Meu Primeiro Projeto' });
        setActiveProject(newProj.project);
      }
    } catch (err) {
      console.error("Auth failed:", err);
      localStorage.removeItem('postlee_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('postlee_token', data.accessToken);
    setUser(data.user);
    // Reload projects
    const projRes = await api.get('/projects');
    if (projRes.projects.length > 0) {
      setActiveProject(projRes.projects[0]);
    }
  };

  const register = async (name, email, password) => {
    const data = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('postlee_token', data.accessToken);
    setUser(data.user);
    // Create first project
    const newProj = await api.post('/projects', { name: 'Meu Primeiro Projeto' });
    setActiveProject(newProj.project);
  };

  const logout = () => {
    localStorage.removeItem('postlee_token');
    setUser(null);
    setActiveProject(null);
  };

  return (
    <AuthContext.Provider value={{ user, activeProject, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
