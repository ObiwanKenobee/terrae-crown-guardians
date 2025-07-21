export type UserType = 
  | 'individual_steward'
  | 'indigenous_guardian'
  | 'researcher'
  | 'ngo_partner'
  | 'youth_steward'
  | 'corporate_partner'
  | 'government_official';

export type AuthMethod = 
  | 'email_password'
  | 'google'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'apple'
  | 'blockchain_wallet'
  | 'mobile_sms';

export type Language = 
  | 'en'
  | 'es'
  | 'fr'
  | 'sw'
  | 'hi'
  | 'zh'
  | 'ar'
  | 'pt'
  | 'indigenous_local';

export interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: UserType;
  language: Language;
  profile_picture?: string;
  verified: boolean;
  created_at: string;
  last_login: string;
  location?: {
    country: string;
    region: string;
    coordinates?: { lat: number; lng: number };
  };
  profile: UserProfile;
  security: SecuritySettings;
  subscription?: {
    tier: string;
    status: 'active' | 'expired' | 'cancelled';
    expires_at?: string;
  };
}

export interface UserProfile {
  bio?: string;
  expertise: string[];
  ecological_interests: string[];
  preferred_bioregions: string[];
  personal_goals: string[];
  organization?: string;
  indigenous_community?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  contribution_stats: {
    total_donations: number;
    trees_planted: number;
    hectares_restored: number;
    communities_supported: number;
    impact_score: number;
  };
}

export interface SecuritySettings {
  mfa_enabled: boolean;
  mfa_methods: ('sms' | 'email' | 'authenticator' | 'biometric')[];
  location_auth_enabled: boolean;
  trusted_devices: string[];
  login_alerts: boolean;
  data_privacy_level: 'standard' | 'enhanced' | 'maximum';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  sessionId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  user_type: UserType;
  language: Language;
  terms_accepted: boolean;
  privacy_accepted: boolean;
}

export interface MFAVerification {
  method: 'sms' | 'email' | 'authenticator' | 'biometric';
  code?: string;
  device_id?: string;
  biometric_data?: string;
}

export interface OnboardingData {
  ecological_interests: string[];
  preferred_bioregions: string[];
  expertise: string[];
  personal_goals: string[];
  contribution_preferences: {
    donation_frequency: 'one_time' | 'monthly' | 'quarterly' | 'annually';
    preferred_amount: number;
    causes: string[];
  };
  communication_preferences: {
    email_updates: boolean;
    sms_updates: boolean;
    push_notifications: boolean;
    newsletter: boolean;
  };
  indigenous_verification?: {
    community_name: string;
    elder_contact: string;
    traditional_knowledge_areas: string[];
    language_spoken: string;
  };
}

export interface BiometricData {
  type: 'fingerprint' | 'face' | 'iris' | 'voice';
  data: string;
  device_id: string;
}

export interface BlockchainWallet {
  address: string;
  provider: 'metamask' | 'walletconnect' | 'coinbase' | 'phantom';
  network: string;
  signature?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  requires_mfa?: boolean;
  mfa_methods?: string[];
  requires_verification?: boolean;
  error_message?: string;
  session_id?: string;
}

export interface VerificationRequest {
  user_id: string;
  verification_type: 'identity' | 'indigenous' | 'expert' | 'organization';
  documents?: File[];
  video_call_requested?: boolean;
  elder_council_contact?: string;
  traditional_knowledge_proof?: string;
}

export const USER_TYPE_LABELS: Record<UserType, string> = {
  individual_steward: 'Individual Steward',
  indigenous_guardian: 'Indigenous Ecological Guardian',
  researcher: 'Researcher & Scientist',
  ngo_partner: 'NGO & Partner',
  youth_steward: 'Youth Climate Steward',
  corporate_partner: 'Corporate Partner',
  government_official: 'Government Official'
};

export const USER_TYPE_DESCRIPTIONS: Record<UserType, string> = {
  individual_steward: 'Everyday donors, eco-conscious activists, and individual contributors',
  indigenous_guardian: 'Community protectors, local leaders, and traditional ecological stewards',
  researcher: 'Scientists, researchers, and academic institutions studying biodiversity',
  ngo_partner: 'Non-profit organizations and conservation groups',
  youth_steward: 'Young climate activists and environmental education participants',
  corporate_partner: 'Businesses and corporations committed to environmental responsibility',
  government_official: 'Government representatives and policy makers'
};

export const LANGUAGE_OPTIONS: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  sw: 'Kiswahili',
  hi: 'हिन्दी',
  zh: '中文',
  ar: 'العربية',
  pt: 'Português',
  indigenous_local: 'Indigenous/Local Language'
};

export const ECOLOGICAL_INTERESTS = [
  'Reforestation & Tree Planting',
  'Wildlife Conservation',
  'Marine Ecosystem Protection',
  'Biodiversity Research',
  'Climate Change Mitigation',
  'Sustainable Agriculture',
  'Water Conservation',
  'Indigenous Knowledge Preservation',
  'Youth Environmental Education',
  'Community-Based Conservation',
  'Renewable Energy Development',
  'Carbon Sequestration',
  'Ecosystem Restoration',
  'Conservation Technology',
  'Environmental Policy'
];

export const BIOREGIONS = [
  'Amazon Sacred Headwaters',
  'Congo Basin',
  'Himalayan Transboundary',
  'Great Barrier Reef',
  'Maasai Mara Ecosystem',
  'Arctic Tundra',
  'Patagonian Grasslands',
  'Boreal Forest',
  'Mediterranean Basin',
  'Sahara-Sahel Transition',
  'Yellowstone Greater Ecosystem',
  'Coral Triangle',
  'Atlantic Forest',
  'Caucasus Ecoregion',
  'Madagascar & Indian Ocean Islands'
];

export const EXPERTISE_AREAS = [
  'Conservation Biology',
  'Climate Science',
  'Sustainable Development',
  'Community Organizing',
  'Traditional Ecological Knowledge',
  'Wildlife Management',
  'Forest Restoration',
  'Marine Conservation',
  'Environmental Education',
  'Policy Development',
  'Technology Innovation',
  'Carbon Markets',
  'Impact Measurement',
  'Fundraising & Development',
  'Communication & Advocacy'
];
