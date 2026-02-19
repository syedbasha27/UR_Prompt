import { useState, useContext, createContext, ReactNode } from 'react';
import { User, Challenge, Submission, LoginRequest, RegisterRequest, AuthResponse, SubmissionCreate, ProgressSummary } from '../types';

const API_BASE_URL = 'http://localhost:8000';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Create auth provider hook
export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );

  const login = async (credentials: LoginRequest) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const authData: AuthResponse = await response.json();
    setToken(authData.access_token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', authData.access_token);
    }

    // Fetch user data
    const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authData.access_token}` },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      setUser(userData);
    }
  };

  const register = async (userData: RegisterRequest) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    // Auto-login after registration
    await login({ username: userData.username, password: userData.password });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  const isAuthenticated = !!token && !!user;

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    AuthContext
  };
};

// API hook
export const useApi = (token?: string) => {
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'API call failed');
    }

    return response.json();
  };

  return {
    // Challenges
    getChallenges: (level?: string, moduleType?: string) => {
      const params = new URLSearchParams();
      if (level) params.append('level', level);
      if (moduleType) params.append('module_type', moduleType);
      return apiCall(`/challenges?${params}`);
    },

    getNextChallenge: (level?: string, moduleType?: string) => {
      const params = new URLSearchParams();
      if (level) params.append('level', level);
      if (moduleType) params.append('module_type', moduleType);
      return apiCall(`/challenges/next?${params}`);
    },

    getChallenge: (id: number) => apiCall(`/challenges/${id}`),

    getHint: (id: number) => apiCall(`/challenges/${id}/hint`),

    // Submissions
    submitSolution: (submission: SubmissionCreate) =>
      apiCall('/submissions/', {
        method: 'POST',
        body: JSON.stringify(submission),
      }),

    getSubmissions: (challengeId?: number) => {
      const params = challengeId ? `?challenge_id=${challengeId}` : '';
      return apiCall(`/submissions${params}`);
    },

    getSubmission: (id: number) => apiCall(`/submissions/${id}`),

    getProgress: () => apiCall('/submissions/progress/me') as Promise<ProgressSummary>,
  };
};