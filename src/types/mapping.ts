export interface DataPoint {
  id: string;
  contributor_id: string;
  contributor_name: string;
  contributor_type: 'scientist' | 'citizen' | 'indigenous_guardian' | 'ngo' | 'government' | 'ai_sensor';
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    altitude?: number;
    accuracy: number; // in meters
  };
  data_type: 'species_sighting' | 'deforestation' | 'pollution' | 'climate_data' | 'restoration_progress' | 'threat_alert';
  urgency_level: 'low' | 'medium' | 'high' | 'critical';
  verification_status: 'pending' | 'verified' | 'disputed' | 'rejected';
  verification_score: number; // 0-100
  blockchain_hash?: string;
  data_payload: SpeciesSighting | DeforestationAlert | PollutionReading | ClimateData | RestorationUpdate | ThreatAlert;
  media_attachments: MediaAttachment[];
  ai_analysis?: AIAnalysisResult;
  community_votes: CommunityVote[];
  expert_validations: ExpertValidation[];
}

export interface SpeciesSighting {
  species_name: string;
  scientific_name?: string;
  count: number;
  behavior_observed: string[];
  habitat_condition: 'excellent' | 'good' | 'degraded' | 'critical';
  threat_level: 'none' | 'low' | 'medium' | 'high' | 'critical';
  breeding_activity: boolean;
  migration_pattern?: string;
  conservation_status: 'least_concern' | 'near_threatened' | 'vulnerable' | 'endangered' | 'critically_endangered';
  additional_notes: string;
}

export interface DeforestationAlert {
  area_affected_hectares: number;
  deforestation_rate: 'slow' | 'moderate' | 'rapid' | 'severe';
  primary_cause: 'logging' | 'agriculture' | 'mining' | 'urban_development' | 'fire' | 'disease' | 'unknown';
  tree_species_affected: string[];
  estimated_loss_timeline: string;
  immediate_action_required: boolean;
  responsible_authority_notified: boolean;
  before_after_comparison?: {
    before_image_url: string;
    after_image_url: string;
    time_difference_days: number;
  };
}

export interface PollutionReading {
  pollution_type: 'air' | 'water' | 'soil' | 'noise' | 'light' | 'plastic';
  measurement_value: number;
  measurement_unit: string;
  safe_threshold: number;
  severity_assessment: 'safe' | 'concerning' | 'dangerous' | 'hazardous';
  pollution_source?: string;
  affected_radius_meters: number;
  wildlife_impact_observed: boolean;
  community_health_risk: 'none' | 'low' | 'medium' | 'high' | 'severe';
  remediation_suggested: string[];
}

export interface ClimateData {
  measurement_type: 'temperature' | 'humidity' | 'precipitation' | 'wind_speed' | 'air_pressure' | 'uv_index';
  current_value: number;
  unit: string;
  historical_average: number;
  deviation_percentage: number;
  trend_direction: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
  climate_impact_score: number; // 1-10
  ecosystem_effect: string;
  seasonal_anomaly: boolean;
}

export interface RestorationUpdate {
  project_id: string;
  restoration_type: 'reforestation' | 'wetland_restoration' | 'grassland_restoration' | 'coral_restoration' | 'soil_rehabilitation';
  progress_percentage: number;
  area_completed_hectares: number;
  trees_planted?: number;
  survival_rate_percentage?: number;
  native_species_returned: string[];
  community_involvement_level: 'none' | 'low' | 'medium' | 'high' | 'full';
  challenges_encountered: string[];
  success_indicators: string[];
  next_phase_timeline: string;
}

export interface ThreatAlert {
  threat_type: 'illegal_logging' | 'poaching' | 'mining' | 'pollution_incident' | 'wildfire' | 'invasive_species' | 'disease_outbreak';
  severity_level: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  immediate_response_needed: boolean;
  estimated_impact_area_km2: number;
  species_at_risk: string[];
  communities_at_risk: string[];
  response_timeline_hours: number;
  authorities_contacted: string[];
  emergency_contact_info?: string;
  evacuation_recommended: boolean;
}

export interface MediaAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnail_url?: string;
  caption?: string;
  file_size_bytes: number;
  metadata: {
    camera_make?: string;
    camera_model?: string;
    gps_coordinates?: { lat: number; lng: number };
    timestamp?: string;
    resolution?: string;
    duration_seconds?: number;
  };
  ai_analysis?: {
    detected_objects: string[];
    confidence_scores: number[];
    environmental_conditions: string[];
    species_identified: string[];
  };
}

export interface AIAnalysisResult {
  analysis_type: 'computer_vision' | 'pattern_recognition' | 'anomaly_detection' | 'predictive_modeling';
  confidence_score: number; // 0-100
  key_findings: string[];
  risk_assessment: {
    environmental_risk: number;
    biodiversity_risk: number;
    community_risk: number;
    urgency_score: number;
  };
  recommended_actions: string[];
  similar_cases: string[];
  trend_analysis?: {
    historical_comparison: string;
    future_projection: string;
    correlation_factors: string[];
  };
  data_quality_score: number;
  validation_needed: boolean;
}

export interface CommunityVote {
  voter_id: string;
  voter_type: 'scientist' | 'local_expert' | 'community_member' | 'indigenous_guardian';
  vote_type: 'accurate' | 'questionable' | 'incorrect' | 'needs_more_info';
  confidence_level: number; // 1-5
  comment?: string;
  timestamp: string;
}

export interface ExpertValidation {
  validator_id: string;
  validator_name: string;
  validator_credentials: string[];
  institution: string;
  validation_status: 'approved' | 'rejected' | 'needs_revision' | 'pending_review';
  validation_score: number; // 0-100
  detailed_feedback: string;
  methodology_assessment: string;
  data_quality_rating: number; // 1-5
  timestamp: string;
  blockchain_signature?: string;
}

export interface CrowdsourcedMap {
  id: string;
  region_name: string;
  bioregion: string;
  center_coordinates: { lat: number; lng: number };
  zoom_level: number;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  total_data_points: number;
  active_contributors: number;
  last_updated: string;
  data_layers: MapLayer[];
  ai_insights: RegionalAIInsight[];
  urgency_alerts: UrgencyAlert[];
  collaboration_metrics: CollaborationMetrics;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'heatmap' | 'clusters' | 'points' | 'polygons' | 'lines';
  data_type: 'species_sighting' | 'deforestation' | 'pollution' | 'climate_data' | 'restoration_progress' | 'threat_alert';
  visible: boolean;
  opacity: number; // 0-1
  color_scheme: string;
  filter_criteria: FilterCriteria;
  data_points: DataPoint[];
  real_time_updates: boolean;
}

export interface FilterCriteria {
  date_range?: {
    start_date: string;
    end_date: string;
  };
  contributor_types?: string[];
  verification_status?: string[];
  urgency_levels?: string[];
  data_quality_min?: number;
  location_radius?: {
    center: { lat: number; lng: number };
    radius_km: number;
  };
}

export interface RegionalAIInsight {
  id: string;
  region_id: string;
  insight_type: 'trend_analysis' | 'anomaly_detection' | 'risk_prediction' | 'intervention_recommendation';
  title: string;
  description: string;
  confidence_score: number;
  impact_assessment: {
    biodiversity_impact: number;
    climate_impact: number;
    community_impact: number;
    economic_impact: number;
  };
  recommended_actions: RecommendedAction[];
  data_sources: string[];
  time_sensitivity: 'immediate' | 'urgent' | 'medium_term' | 'long_term';
  stakeholders_to_notify: string[];
  success_metrics: string[];
  generated_at: string;
  expires_at?: string;
}

export interface RecommendedAction {
  action_type: 'conservation' | 'restoration' | 'monitoring' | 'community_engagement' | 'policy_intervention' | 'emergency_response';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  estimated_cost: number;
  estimated_timeline_days: number;
  required_resources: string[];
  responsible_parties: string[];
  success_probability: number;
  environmental_benefit: number;
  community_benefit: number;
}

export interface UrgencyAlert {
  id: string;
  alert_type: 'environmental_emergency' | 'biodiversity_threat' | 'community_risk' | 'data_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  title: string;
  description: string;
  location: { lat: number; lng: number };
  affected_area_km2: number;
  time_sensitive: boolean;
  deadline?: string;
  triggered_by_data_points: string[];
  ai_confidence: number;
  human_verification_needed: boolean;
  response_required_within_hours: number;
  stakeholders_notified: string[];
  response_status: 'pending' | 'in_progress' | 'resolved' | 'escalated';
  created_at: string;
  updated_at: string;
}

export interface CollaborationMetrics {
  total_contributors: number;
  active_this_week: number;
  data_points_this_month: number;
  verification_rate: number;
  community_engagement_score: number;
  cross_validation_accuracy: number;
  expert_participation_rate: number;
  indigenous_knowledge_integration: number;
  ai_human_collaboration_score: number;
  data_quality_improvement_rate: number;
}

export interface ContributorProfile {
  id: string;
  name: string;
  type: 'scientist' | 'citizen' | 'indigenous_guardian' | 'ngo' | 'government';
  expertise_areas: string[];
  location: string;
  contribution_count: number;
  verification_accuracy: number;
  community_rating: number;
  badges_earned: ContributorBadge[];
  active_since: string;
  last_contribution: string;
  specializations: string[];
  verified_by_institution: boolean;
  blockchain_verified: boolean;
  contribution_history: ContributionSummary[];
}

export interface ContributorBadge {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  category: 'accuracy' | 'volume' | 'consistency' | 'expertise' | 'community' | 'impact';
  earned_date: string;
  criteria_met: string[];
}

export interface ContributionSummary {
  month: string;
  data_points_submitted: number;
  verification_rate: number;
  impact_score: number;
  collaboration_rating: number;
}

export interface WildlifeDiplomacyCase {
  id: string;
  species_name: string;
  migration_route: {
    countries: string[];
    coordinates: { lat: number; lng: number }[];
    seasonal_pattern: string;
  };
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  affected_countries: string[];
  diplomatic_status: 'pending' | 'negotiating' | 'agreed' | 'implemented' | 'disputed';
  ai_recommendations: DiplomacyRecommendation[];
  funding_requirements: FundingRequirement[];
  success_metrics: string[];
  timeline: DiplomacyTimeline[];
  stakeholder_commitments: StakeholderCommitment[];
  impact_projections: ImpactProjection[];
}

export interface DiplomacyRecommendation {
  recommendation_type: 'corridor_creation' | 'joint_funding' | 'shared_monitoring' | 'emergency_protocol' | 'research_collaboration';
  priority: number;
  description: string;
  estimated_cost: number;
  implementation_timeline_months: number;
  success_probability: number;
  environmental_benefit: number;
  diplomatic_complexity: number;
  required_agreements: string[];
}

export interface FundingRequirement {
  country: string;
  contribution_amount: number;
  contribution_type: 'financial' | 'resources' | 'expertise' | 'land_access' | 'monitoring';
  commitment_status: 'pending' | 'agreed' | 'secured' | 'implemented';
  timeline: string;
}

export interface DiplomacyTimeline {
  phase: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  key_milestones: string[];
  responsible_parties: string[];
}

export interface StakeholderCommitment {
  stakeholder_type: 'government' | 'ngo' | 'community' | 'indigenous_group' | 'private_sector';
  stakeholder_name: string;
  commitment_details: string;
  commitment_value: number;
  fulfillment_status: 'pending' | 'partial' | 'complete' | 'overdue';
  verification_method: string;
}

export interface ImpactProjection {
  metric_type: 'population_increase' | 'habitat_expansion' | 'threat_reduction' | 'ecosystem_health';
  baseline_value: number;
  projected_value: number;
  improvement_percentage: number;
  confidence_interval: { min: number; max: number };
  time_horizon_years: number;
}

export const DATA_TYPE_ICONS = {
  species_sighting: '🦋',
  deforestation: '🌲',
  pollution: '🏭',
  climate_data: '🌡️',
  restoration_progress: '🌱',
  threat_alert: '⚠️'
};

export const URGENCY_COLORS = {
  low: '#10b981',      // green
  medium: '#f59e0b',   // amber
  high: '#ef4444',     // red
  critical: '#dc2626', // dark red
  emergency: '#7c2d12' // very dark red
};

export const CONTRIBUTOR_TYPE_COLORS = {
  scientist: '#3b82f6',        // blue
  citizen: '#10b981',          // green
  indigenous_guardian: '#8b5cf6', // purple
  ngo: '#f59e0b',              // amber
  government: '#ef4444',       // red
  ai_sensor: '#6b7280'         // gray
};
