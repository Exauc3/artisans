// Authentication context and utilities
export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'client' | 'artisan';
  phone?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Local storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authStorage = {
  saveAuth(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getAuth(): AuthState {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    
    if (!token || !userStr) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }

    try {
      const user = JSON.parse(userStr);
      return {
        user,
        token,
        isAuthenticated: true,
      };
    } catch {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
