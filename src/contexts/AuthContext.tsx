import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authStorage, User, AuthState } from '../utils/auth';
import { authApi } from '../utils/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, userType: 'client' | 'artisan', phone?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = authStorage.getAuth();
    setAuthState(savedAuth);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.signin(email, password);
      const { accessToken, user } = response;
      
      authStorage.saveAuth(accessToken, user);
      setAuthState({
        user,
        token: accessToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    userType: 'client' | 'artisan',
    phone?: string
  ) => {
    try {
      await authApi.signup(email, password, name, userType, phone);
      // After signup, automatically login
      await login(email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    authStorage.clearAuth();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const refreshUser = async () => {
    if (!authState.token) return;
    
    try {
      const response = await authApi.getCurrentUser(authState.token);
      const updatedUser = response.user;
      
      authStorage.saveAuth(authState.token, updatedUser);
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error('Refresh user error:', error);
      // If token is invalid, logout
      logout();
    }
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
