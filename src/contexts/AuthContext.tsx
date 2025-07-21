import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  User, 
  AuthState, 
  LoginCredentials, 
  RegisterData, 
  MFAVerification, 
  OnboardingData,
  AuthResponse 
} from '@/types/auth';
import { authService } from '@/services/authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  verifyMFA: (verification: MFAVerification, sessionId: string) => Promise<AuthResponse>;
  socialLogin: (provider: string) => Promise<AuthResponse>;
  blockchainLogin: (walletData: any) => Promise<AuthResponse>;
  completeOnboarding: (data: OnboardingData) => Promise<AuthResponse>;
  requestVerification: (data: any) => Promise<{ success: boolean; message: string }>;
  sendMFACode: (method: 'sms' | 'email', contact: string) => Promise<{ success: boolean; message: string }>;
  updateUser: (userData: Partial<User>) => void;
  setOnboardingComplete: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_ONBOARDING_COMPLETE'; payload: boolean }
  | { type: 'SET_SESSION_ID'; payload: string | undefined }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false 
      };
    
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    
    case 'SET_ONBOARDING_COMPLETE':
      return { ...state, hasCompletedOnboarding: action.payload };
    
    case 'SET_SESSION_ID':
      return { ...state, sessionId: action.payload };
    
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasCompletedOnboarding: false,
        sessionId: undefined
      };
    
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  hasCompletedOnboarding: false,
  sessionId: undefined
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        
        // Check if user has completed onboarding
        const hasCompletedOnboarding = checkOnboardingComplete(user);
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: hasCompletedOnboarding });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const checkOnboardingComplete = (user: User): boolean => {
    // Check if user has completed essential onboarding steps
    return (
      user.profile.ecological_interests.length > 0 &&
      user.profile.preferred_bioregions.length > 0 &&
      user.profile.verification_status !== 'pending'
    );
  };

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.login(credentials);
      
      if (response.success && response.user && response.token) {
        authService.storeToken(response.token);
        dispatch({ type: 'SET_USER', payload: response.user });
        
        const hasCompletedOnboarding = checkOnboardingComplete(response.user);
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: hasCompletedOnboarding });
      }
      
      if (response.requires_mfa && response.session_id) {
        dispatch({ type: 'SET_SESSION_ID', payload: response.session_id });
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error_message: 'Login failed. Please try again.'
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.register(data);
      
      if (response.success && response.user && response.token) {
        authService.storeToken(response.token);
        dispatch({ type: 'SET_USER', payload: response.user });
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: false });
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error_message: 'Registration failed. Please try again.'
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const verifyMFA = async (verification: MFAVerification, sessionId: string): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.verifyMFA(verification, sessionId);
      
      if (response.success && response.user && response.token) {
        authService.storeToken(response.token);
        dispatch({ type: 'SET_USER', payload: response.user });
        
        const hasCompletedOnboarding = checkOnboardingComplete(response.user);
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: hasCompletedOnboarding });
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error_message: 'MFA verification failed. Please try again.'
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const socialLogin = async (provider: string): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.socialLogin(provider);
      
      if (response.success && response.user && response.token) {
        authService.storeToken(response.token);
        dispatch({ type: 'SET_USER', payload: response.user });
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: false });
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error_message: `${provider} login failed. Please try again.`
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const blockchainLogin = async (walletData: any): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.blockchainLogin(walletData);
      
      if (response.success && response.user && response.token) {
        authService.storeToken(response.token);
        dispatch({ type: 'SET_USER', payload: response.user });
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: false });
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error_message: 'Blockchain login failed. Please try again.'
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const completeOnboarding = async (data: OnboardingData): Promise<AuthResponse> => {
    try {
      if (!state.user) {
        return {
          success: false,
          error_message: 'User not authenticated'
        };
      }

      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.completeOnboarding(data, state.user.id);
      
      if (response.success) {
        // Update user profile with onboarding data
        const updatedProfile = {
          ...state.user.profile,
          ecological_interests: data.ecological_interests,
          preferred_bioregions: data.preferred_bioregions,
          expertise: data.expertise,
          personal_goals: data.personal_goals,
          verification_status: 'verified' as const
        };
        
        dispatch({ 
          type: 'UPDATE_USER', 
          payload: { profile: updatedProfile } 
        });
        
        dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: true });
      }
      
      return response;
    } catch (error) {
      return {
        success: false,
        error_message: 'Onboarding completion failed. Please try again.'
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const requestVerification = async (data: any): Promise<{ success: boolean; message: string }> => {
    try {
      if (!state.user) {
        return {
          success: false,
          message: 'User not authenticated'
        };
      }

      return await authService.requestVerification(data);
    } catch (error) {
      return {
        success: false,
        message: 'Verification request failed'
      };
    }
  };

  const sendMFACode = async (method: 'sms' | 'email', contact: string): Promise<{ success: boolean; message: string }> => {
    try {
      return await authService.sendMFACode(method, contact);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send verification code'
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      authService.removeToken();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      authService.removeToken();
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const setOnboardingComplete = (): void => {
    dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: true });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    verifyMFA,
    socialLogin,
    blockchainLogin,
    completeOnboarding,
    requestVerification,
    sendMFACode,
    updateUser,
    setOnboardingComplete
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
