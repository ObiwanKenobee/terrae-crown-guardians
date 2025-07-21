export interface WildlifeConflict {
  id: string;
  title: string;
  description: string;
  conflict_type: 'human_wildlife' | 'habitat_fragmentation' | 'resource_competition' | 'migration_disruption' | 'invasive_species' | 'climate_adaptation';
  severity_level: 'low' | 'medium' | 'high' | 'critical';
  location: {
    coordinates: { lat: number; lng: number };
    address: string;
    bioregion: string;
    country: string;
    administrative_area: string;
  };
  affected_species: SpeciesInvolvement[];
  stakeholders: Stakeholder[];
  timeline: {
    first_reported: Date;
    escalation_date?: Date;
    resolution_deadline?: Date;
    last_updated: Date;
  };
  current_status: 'reported' | 'investigating' | 'mediation_in_progress' | 'solution_implemented' | 'monitoring' | 'resolved' | 'escalated';
  ai_analysis: AIConflictAnalysis;
  proposed_solutions: DiplomaticSolution[];
  mediation_sessions: MediationSession[];
  outcome_metrics: ConflictOutcome;
  related_conflicts: string[];
  legal_framework: LegalContext;
  cultural_considerations: CulturalFactor[];
  economic_impact: EconomicAssessment;
  environmental_impact: EnvironmentalAssessment;
  media_attention: MediaCoverage;
  funding_sources: FundingSource[];
}

export interface SpeciesInvolvement {
  species_id: string;
  species_name: string;
  scientific_name: string;
  conservation_status: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX';
  population_affected: number;
  role_in_conflict: 'primary_affected' | 'secondary_affected' | 'beneficiary' | 'neutral';
  behavior_changes: string[];
  habitat_impact: 'positive' | 'negative' | 'neutral';
  migration_disruption: boolean;
  breeding_disruption: boolean;
  feeding_disruption: boolean;
  protection_measures_needed: string[];
}

export interface Stakeholder {
  id: string;
  type: 'local_community' | 'indigenous_group' | 'government_agency' | 'ngo' | 'research_institution' | 'private_sector' | 'international_organization';
  name: string;
  representative: {
    name: string;
    title: string;
    contact: string;
  };
  interests: string[];
  concerns: string[];
  proposed_solutions: string[];
  negotiation_position: 'collaborative' | 'neutral' | 'resistant' | 'hostile';
  influence_level: 'low' | 'medium' | 'high' | 'critical';
  resources_available: string[];
  constraints: string[];
  cultural_background: string;
  historical_context: string;
  trust_level_with_others: { [stakeholder_id: string]: number };
}

export interface AIConflictAnalysis {
  analysis_id: string;
  analysis_date: Date;
  ai_model_version: string;
  confidence_score: number;
  risk_assessment: {
    escalation_probability: number;
    environmental_damage_risk: number;
    human_safety_risk: number;
    economic_loss_risk: number;
    species_extinction_risk: number;
  };
  root_causes: RootCause[];
  conflict_patterns: ConflictPattern[];
  success_probability_by_solution: { [solution_id: string]: number };
  recommended_mediators: RecommendedMediator[];
  timeline_prediction: {
    estimated_resolution_months: number;
    key_milestones: { date: Date; milestone: string; probability: number }[];
  };
  similar_cases: SimilarCase[];
  cultural_sensitivity_flags: string[];
  legal_complexity_assessment: LegalComplexity;
  stakeholder_influence_network: StakeholderNetwork;
}

export interface RootCause {
  cause_type: 'economic' | 'environmental' | 'social' | 'political' | 'technological' | 'cultural';
  description: string;
  evidence: string[];
  contribution_weight: number;
  addressability: 'easy' | 'moderate' | 'difficult' | 'very_difficult';
  intervention_strategies: string[];
}

export interface ConflictPattern {
  pattern_type: 'seasonal' | 'geographical' | 'species_specific' | 'stakeholder_dynamic' | 'resource_based';
  description: string;
  historical_occurrences: number;
  predictive_indicators: string[];
  prevention_strategies: string[];
}

export interface DiplomaticSolution {
  id: string;
  title: string;
  description: string;
  solution_type: 'compensation' | 'relocation' | 'habitat_modification' | 'behavior_modification' | 'policy_change' | 'technology_implementation' | 'collaborative_management';
  complexity_level: 'simple' | 'moderate' | 'complex' | 'very_complex';
  implementation_phases: ImplementationPhase[];
  stakeholder_agreement_required: string[];
  estimated_cost: number;
  estimated_duration_months: number;
  success_indicators: string[];
  risk_factors: string[];
  ai_recommendation_score: number;
  cultural_acceptance_rating: number;
  environmental_impact_rating: number;
  economic_feasibility_rating: number;
  legal_compliance_status: 'compliant' | 'requires_changes' | 'needs_new_legislation';
  monitoring_requirements: string[];
  long_term_sustainability: number;
  scalability_potential: 'local_only' | 'regional' | 'national' | 'international';
}

export interface ImplementationPhase {
  phase_number: number;
  phase_name: string;
  description: string;
  duration_months: number;
  responsible_stakeholders: string[];
  required_resources: string[];
  key_activities: string[];
  success_criteria: string[];
  dependencies: string[];
  risk_mitigation: string[];
}

export interface MediationSession {
  session_id: string;
  date: Date;
  duration_hours: number;
  location: string;
  format: 'in_person' | 'virtual' | 'hybrid';
  mediator_id: string;
  participants: SessionParticipant[];
  agenda_items: string[];
  outcomes: SessionOutcome[];
  agreements_reached: string[];
  action_items: ActionItem[];
  next_session_date?: Date;
  session_notes: string;
  ai_sentiment_analysis: SentimentAnalysis;
  breakthrough_moments: BreakthroughMoment[];
  challenges_encountered: string[];
  cultural_considerations_addressed: string[];
}

export interface SessionParticipant {
  stakeholder_id: string;
  representative_name: string;
  attendance_status: 'present' | 'absent' | 'partial';
  engagement_level: 'high' | 'medium' | 'low';
  cooperation_score: number;
  concerns_raised: string[];
  solutions_proposed: string[];
  agreements_made: string[];
}

export interface ConflictOutcome {
  resolution_status: 'ongoing' | 'partial_resolution' | 'full_resolution' | 'failed_mediation';
  resolution_date?: Date;
  final_agreement: string;
  implementation_progress: number;
  stakeholder_satisfaction: { [stakeholder_id: string]: number };
  species_recovery_indicators: SpeciesRecoveryMetric[];
  economic_benefits: EconomicBenefit[];
  environmental_improvements: EnvironmentalImprovement[];
  social_cohesion_metrics: SocialCohesionMetric[];
  lessons_learned: string[];
  replication_potential: string[];
  long_term_monitoring_plan: string;
  follow_up_schedule: { date: Date; activity: string }[];
}

export interface WildlifeDiplomatAI {
  id: string;
  name: string;
  version: string;
  specialization: 'general_mediation' | 'species_specific' | 'cultural_mediation' | 'legal_arbitration' | 'economic_negotiation';
  languages_supported: string[];
  cultural_knowledge_base: CulturalKnowledgeArea[];
  mediation_style: 'collaborative' | 'facilitative' | 'evaluative' | 'transformative';
  success_rate: number;
  cases_handled: number;
  expertise_areas: string[];
  conflict_types_handled: string[];
  stakeholder_feedback: AIFeedback[];
  training_data_sources: string[];
  ethical_guidelines: string[];
  decision_transparency_level: 'high' | 'medium' | 'low';
  bias_mitigation_measures: string[];
  cultural_sensitivity_training: string[];
  continuous_learning_enabled: boolean;
  human_oversight_required: boolean;
}

export interface CulturalKnowledgeArea {
  culture_group: string;
  region: string;
  traditional_practices: string[];
  wildlife_relationships: string[];
  conflict_resolution_methods: string[];
  communication_preferences: string[];
  taboos_and_sensitivities: string[];
  decision_making_processes: string[];
  authority_structures: string[];
  time_orientation: 'linear' | 'cyclical' | 'event_based';
  relationship_to_nature: string;
}

export interface RecommendedMediator {
  mediator_id: string;
  name: string;
  type: 'human' | 'ai' | 'hybrid';
  specialization: string[];
  cultural_competency: string[];
  languages: string[];
  success_rate: number;
  availability: boolean;
  cost_estimate: number;
  match_score: number;
  recommendation_reason: string;
}

export interface SimilarCase {
  case_id: string;
  title: string;
  similarity_score: number;
  location: string;
  species_involved: string[];
  solution_used: string;
  outcome: string;
  lessons_applicable: string[];
  key_differences: string[];
}

export interface LegalComplexity {
  complexity_score: number;
  jurisdictions_involved: string[];
  applicable_laws: string[];
  international_treaties: string[];
  indigenous_rights_considerations: string[];
  property_rights_issues: string[];
  permit_requirements: string[];
  legal_precedents: string[];
  potential_legal_challenges: string[];
}

export interface StakeholderNetwork {
  network_analysis: {
    central_stakeholders: string[];
    influential_relationships: { from: string; to: string; influence_strength: number }[];
    coalition_potential: { stakeholders: string[]; likelihood: number }[];
    conflict_axes: { opposing_groups: string[][]; conflict_intensity: number }[];
  };
  communication_patterns: {
    preferred_channels: { [stakeholder_id: string]: string[] };
    communication_frequency: { [relationship: string]: string };
    information_flow: { source: string; target: string; information_type: string }[];
  };
}

export interface ActionItem {
  item_id: string;
  description: string;
  responsible_party: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dependencies: string[];
  resources_needed: string[];
  progress_updates: { date: Date; update: string; progress_percentage: number }[];
}

export interface SentimentAnalysis {
  overall_sentiment: 'positive' | 'neutral' | 'negative';
  stakeholder_sentiments: { [stakeholder_id: string]: number };
  emotional_indicators: string[];
  cooperation_indicators: string[];
  resistance_indicators: string[];
  breakthrough_potential: number;
  tension_areas: string[];
  positive_momentum_areas: string[];
}

export interface BreakthroughMoment {
  timestamp: Date;
  description: string;
  stakeholders_involved: string[];
  type: 'agreement_reached' | 'understanding_achieved' | 'compromise_found' | 'trust_building' | 'creative_solution';
  impact_level: 'minor' | 'moderate' | 'major' | 'transformational';
  follow_up_actions: string[];
}

export interface SpeciesRecoveryMetric {
  species_id: string;
  metric_type: 'population_change' | 'habitat_quality' | 'breeding_success' | 'migration_pattern' | 'behavior_normalization';
  baseline_value: number;
  current_value: number;
  target_value: number;
  progress_percentage: number;
  measurement_date: Date;
  data_quality: 'high' | 'medium' | 'low';
  contributing_factors: string[];
}

export interface EconomicBenefit {
  beneficiary_type: 'local_community' | 'government' | 'tourism' | 'agriculture' | 'research' | 'conservation';
  benefit_type: 'direct_compensation' | 'job_creation' | 'tourism_revenue' | 'ecosystem_services' | 'cost_savings';
  estimated_value: number;
  currency: string;
  time_frame: 'immediate' | 'short_term' | 'medium_term' | 'long_term';
  measurement_method: string;
  confidence_level: number;
}

export interface EnvironmentalImprovement {
  improvement_type: 'habitat_restoration' | 'pollution_reduction' | 'biodiversity_increase' | 'ecosystem_function' | 'connectivity_enhancement';
  location: string;
  area_affected_hectares: number;
  baseline_condition: string;
  current_condition: string;
  target_condition: string;
  progress_indicators: string[];
  monitoring_frequency: string;
  long_term_sustainability: number;
}

export interface SocialCohesionMetric {
  metric_name: string;
  description: string;
  baseline_score: number;
  current_score: number;
  target_score: number;
  measurement_method: string;
  factors_influencing: string[];
  improvement_strategies: string[];
}

export interface AIFeedback {
  feedback_id: string;
  stakeholder_id: string;
  rating: number;
  feedback_type: 'effectiveness' | 'cultural_sensitivity' | 'fairness' | 'communication' | 'understanding';
  comments: string;
  suggestions: string[];
  date: Date;
  case_context: string;
}

export interface DiplomacyDashboard {
  dashboard_id: string;
  user_role: 'mediator' | 'stakeholder' | 'observer' | 'administrator';
  active_conflicts: ConflictSummary[];
  mediation_schedule: MediationEvent[];
  ai_recommendations: AIRecommendation[];
  performance_metrics: DiplomacyMetrics;
  alerts_and_notifications: DiplomacyAlert[];
  resource_library: ResourceItem[];
  collaboration_tools: CollaborationTool[];
  training_modules: TrainingModule[];
}

export interface ConflictSummary {
  conflict_id: string;
  title: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  days_active: number;
  stakeholders_count: number;
  species_count: number;
  last_activity: Date;
  next_milestone: string;
  progress_percentage: number;
}

export interface MediationEvent {
  event_id: string;
  title: string;
  date: Date;
  duration_hours: number;
  conflict_id: string;
  participants: string[];
  agenda: string;
  preparation_status: 'not_started' | 'in_progress' | 'ready';
  materials_needed: string[];
}

export interface AIRecommendation {
  recommendation_id: string;
  type: 'solution_proposal' | 'mediator_assignment' | 'stakeholder_engagement' | 'risk_mitigation' | 'timeline_adjustment';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  rationale: string;
  confidence_score: number;
  potential_impact: string;
  implementation_effort: 'low' | 'medium' | 'high';
  deadline: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'implemented';
}

export interface DiplomacyMetrics {
  total_conflicts_handled: number;
  resolution_rate: number;
  average_resolution_time_days: number;
  stakeholder_satisfaction_average: number;
  species_recovery_success_rate: number;
  economic_benefits_generated: number;
  cultural_sensitivity_score: number;
  ai_accuracy_rate: number;
  human_ai_collaboration_effectiveness: number;
}

export interface DiplomacyAlert {
  alert_id: string;
  type: 'deadline_approaching' | 'conflict_escalation' | 'stakeholder_withdrawal' | 'new_development' | 'ai_concern' | 'success_milestone';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  conflict_id?: string;
  stakeholder_id?: string;
  action_required: boolean;
  suggested_actions: string[];
  deadline?: Date;
  created_at: Date;
  acknowledged: boolean;
}

export interface ResourceItem {
  resource_id: string;
  title: string;
  type: 'document' | 'video' | 'toolkit' | 'case_study' | 'best_practice' | 'legal_template' | 'cultural_guide';
  description: string;
  tags: string[];
  url: string;
  language: string;
  cultural_context: string[];
  last_updated: Date;
  usage_count: number;
  user_rating: number;
}

export interface CollaborationTool {
  tool_id: string;
  name: string;
  type: 'communication' | 'document_sharing' | 'voting' | 'scheduling' | 'mapping' | 'modeling' | 'translation';
  description: string;
  supported_languages: string[];
  accessibility_features: string[];
  integration_status: 'active' | 'available' | 'coming_soon';
  user_permissions: { [role: string]: string[] };
}

export interface TrainingModule {
  module_id: string;
  title: string;
  type: 'cultural_competency' | 'mediation_skills' | 'ai_tools' | 'legal_framework' | 'species_knowledge' | 'communication';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  prerequisites: string[];
  learning_objectives: string[];
  completion_rate: number;
  user_rating: number;
  available_languages: string[];
  certification_offered: boolean;
}
