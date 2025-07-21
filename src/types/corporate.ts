export interface CorporatePartner {
  id: string;
  name: string;
  type: 'fortune_500' | 'startup' | 'eco_luxury' | 'tech_company' | 'manufacturing' | 'retail';
  logo_url: string;
  website: string;
  sustainability_score: number;
  partnership_tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  partnership_start_date: Date;
  total_investment: number;
  carbon_offset_commitment: number;
  biodiversity_projects: string[];
  csr_initiatives: CSRInitiative[];
  impact_metrics: CorporateImpactMetrics;
  status: 'active' | 'pending' | 'paused' | 'terminated';
  contact_person: {
    name: string;
    email: string;
    position: string;
    phone?: string;
  };
  regions_of_focus: string[];
  sdg_alignment: number[];
}

export interface CSRInitiative {
  id: string;
  title: string;
  description: string;
  type: 'carbon_offset' | 'biodiversity_conservation' | 'community_development' | 'education' | 'research_funding';
  budget: number;
  duration_months: number;
  start_date: Date;
  expected_impact: {
    carbon_reduction_tons?: number;
    species_protected?: number;
    communities_impacted?: number;
    hectares_protected?: number;
  };
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  progress_percentage: number;
  roi_projections: {
    brand_value_increase: number;
    employee_satisfaction_boost: number;
    customer_loyalty_improvement: number;
    risk_mitigation_value: number;
  };
}

export interface CorporateImpactMetrics {
  total_carbon_offset: number;
  biodiversity_score_improvement: number;
  communities_supported: number;
  jobs_created: number;
  renewable_energy_mwh: number;
  waste_reduction_percentage: number;
  water_conservation_liters: number;
  brand_sentiment_score: number;
  employee_engagement_score: number;
  customer_retention_improvement: number;
}

export interface BrandCampaign {
  id: string;
  partner_id: string;
  title: string;
  type: 'awareness' | 'product_launch' | 'sustainability_report' | 'cause_marketing' | 'employee_engagement';
  description: string;
  target_audience: string[];
  budget: number;
  duration_days: number;
  start_date: Date;
  channels: ('social_media' | 'traditional_media' | 'digital_advertising' | 'events' | 'influencer')[];
  kpis: {
    reach_target: number;
    engagement_target: number;
    conversion_target: number;
    brand_lift_target: number;
  };
  actual_performance?: {
    reach_achieved: number;
    engagement_achieved: number;
    conversions_achieved: number;
    brand_lift_achieved: number;
  };
  conservation_tie_in: {
    project_id: string;
    impact_story: string;
    visual_assets: string[];
    success_metrics: string[];
  };
  status: 'draft' | 'approved' | 'active' | 'completed' | 'cancelled';
}

export interface CorporatePackage {
  id: string;
  name: string;
  tier: 'startup' | 'growth' | 'enterprise' | 'global';
  price_annual: number;
  features: string[];
  max_initiatives: number;
  dedicated_support: boolean;
  custom_reporting: boolean;
  api_access: boolean;
  white_label_options: boolean;
  priority_project_selection: boolean;
  sustainability_certification: boolean;
  employee_engagement_tools: boolean;
  brand_integration_support: boolean;
  impact_verification: 'basic' | 'advanced' | 'premium';
  reporting_frequency: 'monthly' | 'quarterly' | 'real_time';
}

export interface PartnershipProposal {
  id: string;
  company_name: string;
  contact_email: string;
  company_size: 'startup' | 'sme' | 'large_corp' | 'multinational';
  industry: string;
  sustainability_goals: string[];
  proposed_investment: number;
  preferred_partnership_type: string;
  timeline: string;
  additional_requirements: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'negotiating';
  submitted_date: Date;
  review_notes?: string;
  assigned_account_manager?: string;
}

export interface ImpactReport {
  id: string;
  partner_id: string;
  reporting_period: {
    start: Date;
    end: Date;
  };
  metrics: CorporateImpactMetrics;
  initiatives_summary: {
    total_initiatives: number;
    completed_initiatives: number;
    active_initiatives: number;
    planned_initiatives: number;
  };
  financial_summary: {
    total_investment: number;
    cost_per_ton_co2: number;
    cost_per_hectare_protected: number;
    roi_brand_value: number;
  };
  storytelling_assets: {
    success_stories: string[];
    before_after_photos: string[];
    community_testimonials: string[];
    video_content: string[];
  };
  certification_progress: {
    certifications_achieved: string[];
    certifications_in_progress: string[];
    next_certification_targets: string[];
  };
  generated_date: Date;
  approved_by: string;
  shared_publicly: boolean;
}

export interface CorporateEvent {
  id: string;
  title: string;
  type: 'conference' | 'workshop' | 'site_visit' | 'award_ceremony' | 'networking' | 'training';
  description: string;
  date: Date;
  duration_hours: number;
  location: {
    type: 'virtual' | 'physical' | 'hybrid';
    address?: string;
    coordinates?: { lat: number; lng: number };
    platform_link?: string;
  };
  target_audience: ('partners' | 'prospects' | 'employees' | 'stakeholders')[];
  max_attendees: number;
  registration_required: boolean;
  cost_per_attendee: number;
  agenda: {
    time: string;
    activity: string;
    speaker?: string;
    duration_minutes: number;
  }[];
  speakers: {
    name: string;
    title: string;
    company: string;
    bio: string;
    photo_url: string;
  }[];
  sponsors: string[];
  materials: {
    presentation_slides: string[];
    handouts: string[];
    resources: string[];
  };
  registration_link?: string;
  status: 'planned' | 'open_registration' | 'full' | 'ongoing' | 'completed' | 'cancelled';
}
