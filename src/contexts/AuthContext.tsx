import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser, logout, isAuthenticated, getStoredUser, getCurrentUser } from '@/services/authService';

// Define the User type
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'artisan' | 'buyer' | 'admin';
  bio?: string;
  location?: string;
  profileImage?: string;
  isVerified?: boolean;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logoutUser: () => void;
  isLoggedIn: boolean;
  isArtisan: boolean;
  isBuyer: boolean;
  isAdmin: boolean;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logoutUser: () => {},
  isLoggedIn: false,
  isArtisan: false,
  isBuyer: false,
  isAdmin: false,
  clearError: () => {},
  refreshUserData: async () => {},
});

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        if (isAuthenticated()) {
          const storedUser = getStoredUser();
          if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
            
            // Optionally refresh user data from the server
            try {
              const { data } = await getCurrentUser();
              if (data && data.user) {
                setUser(data.user);
                // Update localStorage with fresh data
                localStorage.setItem('user', JSON.stringify(data.user));
              }
            } catch (refreshError) {
              console.error('Error refreshing user data:', refreshError);
              // Don't log out the user if refresh fails
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ email, password });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    logout();
    setUser(null);
    setIsLoggedIn(false);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Refresh user data
  const refreshUserData = async () => {
    if (!isLoggedIn) return;
    
    setLoading(true);
    try {
      const { data } = await getCurrentUser();
      if (data && data.user) {
        setUser(data.user);
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (err: any) {
      console.error('Error refreshing user data:', err);
      setError(err.response?.data?.message || 'Failed to refresh user data');
    } finally {
      setLoading(false);
    }
  };

  // Computed properties for role-based checks
  const isArtisan = user?.role === 'artisan';
  const isBuyer = user?.role === 'buyer';
  const isAdmin = user?.role === 'admin';

  // Provide the context value
  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logoutUser,
    isLoggedIn,
    isArtisan,
    isBuyer,
    isAdmin,
    clearError,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
