import { 
  User, 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  MFAVerification, 
  OnboardingData,
  BlockchainWallet,
  BiometricData,
  VerificationRequest,
  UserType 
} from '@/types/auth';

class AuthService {
  private baseURL = '/api/auth';
  private storageKey = 'aegis_auth_token';

  // Simulate authentication API calls
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate different responses based on email
      if (credentials.email === 'demo@aegis.org') {
        const mockUser: User = {
          id: 'user_123',
          email: credentials.email,
          full_name: 'Demo Steward',
          user_type: 'individual_steward',
          language: 'en',
          verified: true,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          location: {
            country: 'Kenya',
            region: 'Nairobi',
            coordinates: { lat: -1.286389, lng: 36.817223 }
          },
          profile: {
            expertise: ['Conservation Biology', 'Community Organizing'],
            ecological_interests: ['Reforestation & Tree Planting', 'Wildlife Conservation'],
            preferred_bioregions: ['Maasai Mara Ecosystem'],
            personal_goals: ['Plant 1000 trees', 'Support 5 communities'],
            verification_status: 'verified',
            contribution_stats: {
              total_donations: 2500,
              trees_planted: 450,
              hectares_restored: 12,
              communities_supported: 3,
              impact_score: 1250
            }
          },
          security: {
            mfa_enabled: true,
            mfa_methods: ['sms', 'email'],
            location_auth_enabled: false,
            trusted_devices: [],
            login_alerts: true,
            data_privacy_level: 'standard'
          }
        };

        // Simulate MFA requirement
        if (mockUser.security.mfa_enabled) {
          return {
            success: true,
            requires_mfa: true,
            mfa_methods: mockUser.security.mfa_methods,
            session_id: 'session_' + Date.now()
          };
        }

        return {
          success: true,
          user: mockUser,
          token: 'mock_jwt_token_' + Date.now(),
          session_id: 'session_' + Date.now()
        };
      }

      // Simulate failed login
      return {
        success: false,
        error_message: 'Invalid email or password'
      };
    } catch (error) {
      return {
        success: false,
        error_message: 'Network error. Please try again.'
      };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate email already exists
      if (data.email === 'existing@aegis.org') {
        return {
          success: false,
          error_message: 'Email already exists'
        };
      }

      const newUser: User = {
        id: 'user_' + Date.now(),
        email: data.email,
        full_name: data.full_name,
        user_type: data.user_type,
        language: data.language,
        verified: false,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        profile: {
          expertise: [],
          ecological_interests: [],
          preferred_bioregions: [],
          personal_goals: [],
          verification_status: 'pending',
          contribution_stats: {
            total_donations: 0,
            trees_planted: 0,
            hectares_restored: 0,
            communities_supported: 0,
            impact_score: 0
          }
        },
        security: {
          mfa_enabled: false,
          mfa_methods: [],
          location_auth_enabled: false,
          trusted_devices: [],
          login_alerts: true,
          data_privacy_level: 'standard'
        }
      };

      return {
        success: true,
        user: newUser,
        token: 'mock_jwt_token_' + Date.now(),
        requires_verification: data.user_type === 'indigenous_guardian',
        session_id: 'session_' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error_message: 'Registration failed. Please try again.'
      };
    }
  }

  async verifyMFA(verification: MFAVerification, sessionId: string): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate MFA verification
      if (verification.code === '123456' || verification.method === 'biometric') {
        const mockUser: User = {
          id: 'user_123',
          email: 'demo@aegis.org',
          full_name: 'Demo Steward',
          user_type: 'individual_steward',
          language: 'en',
          verified: true,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          location: {
            country: 'Kenya',
            region: 'Nairobi',
            coordinates: { lat: -1.286389, lng: 36.817223 }
          },
          profile: {
            expertise: ['Conservation Biology', 'Community Organizing'],
            ecological_interests: ['Reforestation & Tree Planting', 'Wildlife Conservation'],
            preferred_bioregions: ['Maasai Mara Ecosystem'],
            personal_goals: ['Plant 1000 trees', 'Support 5 communities'],
            verification_status: 'verified',
            contribution_stats: {
              total_donations: 2500,
              trees_planted: 450,
              hectares_restored: 12,
              communities_supported: 3,
              impact_score: 1250
            }
          },
          security: {
            mfa_enabled: true,
            mfa_methods: ['sms', 'email'],
            location_auth_enabled: false,
            trusted_devices: [],
            login_alerts: true,
            data_privacy_level: 'standard'
          }
        };

        return {
          success: true,
          user: mockUser,
          token: 'mock_jwt_token_' + Date.now(),
          session_id: sessionId
        };
      }

      return {
        success: false,
        error_message: 'Invalid verification code'
      };
    } catch (error) {
      return {
        success: false,
        error_message: 'Verification failed. Please try again.'
      };
    }
  }

  async socialLogin(provider: string): Promise<AuthResponse> {
    try {
      // Simulate social login redirect
      await new Promise(resolve => setTimeout(resolve, 1200));

      const mockUser: User = {
        id: 'user_social_' + Date.now(),
        email: `user@${provider}.com`,
        full_name: `${provider} User`,
        user_type: 'individual_steward',
        language: 'en',
        verified: true,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        profile: {
          expertise: [],
          ecological_interests: [],
          preferred_bioregions: [],
          personal_goals: [],
          verification_status: 'verified',
          contribution_stats: {
            total_donations: 0,
            trees_planted: 0,
            hectares_restored: 0,
            communities_supported: 0,
            impact_score: 0
          }
        },
        security: {
          mfa_enabled: false,
          mfa_methods: [],
          location_auth_enabled: false,
          trusted_devices: [],
          login_alerts: true,
          data_privacy_level: 'standard'
        }
      };

      return {
        success: true,
        user: mockUser,
        token: 'mock_jwt_token_' + Date.now(),
        session_id: 'session_' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error_message: `${provider} login failed`
      };
    }
  }

  async blockchainLogin(wallet: BlockchainWallet): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: 'user_blockchain_' + Date.now(),
        email: `${wallet.address.substring(0, 8)}@blockchain.aegis`,
        full_name: 'Blockchain Steward',
        user_type: 'individual_steward',
        language: 'en',
        verified: true,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        profile: {
          expertise: ['Technology Innovation'],
          ecological_interests: ['Carbon Markets', 'Conservation Technology'],
          preferred_bioregions: [],
          personal_goals: [],
          verification_status: 'verified',
          contribution_stats: {
            total_donations: 0,
            trees_planted: 0,
            hectares_restored: 0,
            communities_supported: 0,
            impact_score: 0
          }
        },
        security: {
          mfa_enabled: true,
          mfa_methods: ['authenticator'],
          location_auth_enabled: false,
          trusted_devices: [],
          login_alerts: true,
          data_privacy_level: 'maximum'
        }
      };

      return {
        success: true,
        user: mockUser,
        token: 'mock_jwt_token_' + Date.now(),
        session_id: 'session_' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error_message: 'Blockchain authentication failed'
      };
    }
  }

  async completeOnboarding(data: OnboardingData, userId: string): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        session_id: 'session_' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error_message: 'Onboarding completion failed'
      };
    }
  }

  async requestVerification(request: VerificationRequest): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        success: true,
        message: 'Verification request submitted successfully. You will be contacted within 24-48 hours.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit verification request'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem(this.storageKey);
      // In a real app, call logout endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem(this.storageKey);
      if (!token) return null;

      // Simulate token validation
      await new Promise(resolve => setTimeout(resolve, 300));

      // Return mock user if token exists
      const mockUser: User = {
        id: 'user_123',
        email: 'demo@aegis.org',
        full_name: 'Demo Steward',
        user_type: 'individual_steward',
        language: 'en',
        verified: true,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        location: {
          country: 'Kenya',
          region: 'Nairobi',
          coordinates: { lat: -1.286389, lng: 36.817223 }
        },
        profile: {
          expertise: ['Conservation Biology', 'Community Organizing'],
          ecological_interests: ['Reforestation & Tree Planting', 'Wildlife Conservation'],
          preferred_bioregions: ['Maasai Mara Ecosystem'],
          personal_goals: ['Plant 1000 trees', 'Support 5 communities'],
          verification_status: 'verified',
          contribution_stats: {
            total_donations: 2500,
            trees_planted: 450,
            hectares_restored: 12,
            communities_supported: 3,
            impact_score: 1250
          }
        },
        security: {
          mfa_enabled: true,
          mfa_methods: ['sms', 'email'],
          location_auth_enabled: false,
          trusted_devices: [],
          login_alerts: true,
          data_privacy_level: 'standard'
        }
      };

      return mockUser;
    } catch (error) {
      return null;
    }
  }

  storeToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Biometric authentication simulation
  async authenticateBiometric(type: 'fingerprint' | 'face'): Promise<BiometricData | null> {
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        return {
          type,
          data: 'mock_biometric_hash_' + Date.now(),
          device_id: 'device_' + Date.now()
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  // Location verification
  async verifyLocation(): Promise<{ allowed: boolean; location?: { lat: number; lng: number } }> {
    try {
      if ('geolocation' in navigator) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                allowed: true,
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              });
            },
            () => {
              resolve({ allowed: false });
            }
          );
        });
      }

      return { allowed: false };
    } catch (error) {
      return { allowed: false };
    }
  }

  // Send MFA code
  async sendMFACode(method: 'sms' | 'email', contact: string): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      return {
        success: true,
        message: `Verification code sent to your ${method === 'sms' ? 'phone' : 'email'}`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send verification code'
      };
    }
  }
}

export const authService = new AuthService();
