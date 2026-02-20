import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-c2122655`;

// Helper to get auth headers
function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }
  
  return headers;
}

// Authentication API
export const authApi = {
  async signup(email: string, password: string, name: string, userType: 'client' | 'artisan', phone?: string) {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password, name, userType, phone }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }
    
    return response.json();
  },

  async signin(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Sign in failed');
    }
    
    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get user');
    }
    
    return response.json();
  },
};

// Artisans API
export const artisansApi = {
  async getAll(filters?: { trade?: string; available?: boolean }) {
    const params = new URLSearchParams();
    if (filters?.trade) params.append('trade', filters.trade);
    if (filters?.available) params.append('available', 'true');
    
    const url = `${API_BASE}/artisans${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch artisans');
    }
    
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_BASE}/artisans/${id}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch artisan');
    }
    
    return response.json();
  },

  async update(id: string, data: any, token: string) {
    const response = await fetch(`${API_BASE}/artisans/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update artisan');
    }
    
    return response.json();
  },
};

// Requests API
export const requestsApi = {
  async getForArtisan(artisanId: string, token: string) {
    const response = await fetch(`${API_BASE}/requests/artisan/${artisanId}`, {
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch requests');
    }
    
    return response.json();
  },

  async create(data: {
    artisanId: string;
    clientName: string;
    clientPhone: string;
    service: string;
    description?: string;
    location?: string;
    urgency?: string;
    budget?: string;
  }) {
    const response = await fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create request');
    }
    
    return response.json();
  },

  async updateStatus(id: string, status: string, token: string) {
    const response = await fetch(`${API_BASE}/requests/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update request');
    }
    
    return response.json();
  },
};

// Trades API
export const tradesApi = {
  async getAll() {
    const response = await fetch(`${API_BASE}/trades`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch trades');
    }
    
    return response.json();
  },
};
