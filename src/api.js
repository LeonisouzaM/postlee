const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  async fetch(endpoint, options = {}) {
    const token = localStorage.getItem('postlee_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || response.statusText || 'Erro desconhecido');
    }

    return data;
  },

  get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'DELETE' });
  }
};
