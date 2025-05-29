import AsyncStorage from '@react-native-async-storage/async-storage';

// API configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// Auth API calls
export const authAPI = {
  // Sign up with email/password
  signup: async (email: string, password: string) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Login with email/password
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // OAuth callback
  oauthCallback: async (provider: string, providerId: string, email: string, firstName?: string, lastName?: string, profilePicture?: string) => {
    return apiCall('/auth/oauth/callback', {
      method: 'POST',
      body: JSON.stringify({
        provider,
        providerId,
        email,
        firstName,
        lastName,
        profilePicture,
      }),
    });
  },

  // Verify token
  verifyToken: async (token: string) => {
    return apiCall('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  };

// Storage helpers
export const tokenStorage = {
  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },
}; 