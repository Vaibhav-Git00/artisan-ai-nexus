import api from './api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed'
    };
  }
};

export const loginUser = async (credentials: LoginData) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get user data'
    };
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};
