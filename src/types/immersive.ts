export interface VRExperience {
  id: string;
  title: string;
  description: string;
  type: 'habitat_exploration' | 'conservation_simulation' | 'wildlife_encounter' | 'time_lapse_ecosystem' | 'underwater_adventure' | 'forest_canopy_tour';
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  supported_devices: ('quest' | 'vive' | 'pico' | 'mobile_vr' | 'web_vr')[];
  location_data: {
    real_world_location: string;
    coordinates: { lat: number; lng: number };
    bioregion: string;
    ecosystem_type: string;
  };
  species_featured: string[];
  conservation_focus: string[];
  educational_objectives: string[];
  interactive_elements: InteractiveElement[];
  accessibility_features: AccessibilityFeature[];
  content_rating: 'all_ages' | 'teen' | 'mature';
  languages_supported: string[];
  file_size_mb: number;
  preview_video_url: string;
  thumbnail_url: string;
  download_url: string;
  created_date: Date;
  last_updated: Date;
  user_ratings: {
    average_rating: number;
    total_reviews: number;
    educational_value: number;
    visual_quality: number;
    user_engagement: number;
  };
  usage_analytics: {
    total_downloads: number;
    completion_rate: number;
    average_session_time: number;
    replay_rate: number;
  };
  status: 'development' | 'beta' | 'published' | 'archived';
}

export interface ARExperience {
  id: string;
  title: string;
  description: string;
  type: 'species_identification' | 'habitat_overlay' | 'pollution_visualization' | 'restoration_preview' | 'migration_tracking' | 'ecosystem_health_scanner';
  target_environment: 'indoor' | 'outdoor' | 'any';
  supported_devices: ('ios' | 'android' | 'hololens' | 'magic_leap')[];
  ar_features: ARFeature[];
  trigger_methods: ('image_recognition' | 'gps_location' | 'qr_code' | 'plane_detection' | 'object_tracking')[];
  real_world_integration: {
    requires_specific_location: boolean;
    location_radius_meters?: number;
    works_with_printed_materials: boolean;
    outdoor_lighting_requirements: string[];
  };
  educational_content: EducationalContent[];
  gamification_elements: ARGameElement[];
  social_features: {
    photo_sharing: boolean;
    collaborative_experiences: boolean;
    leaderboards: boolean;
    achievements: boolean;
  };
  data_collection: {
    user_contributed_data: boolean;
    species_observations: boolean;
    environmental_monitoring: boolean;
    citizen_science_integration: boolean;
  };
  offline_capabilities: boolean;
  privacy_settings: PrivacySettings;
  content_updates: {
    seasonal_content: boolean;
    real_time_data_integration: boolean;
    community_contributions: boolean;
  };
  technical_requirements: {
    min_device_year: number;
    required_sensors: string[];
    min_storage_mb: number;
    internet_required: boolean;
  };
}

export interface InteractiveElement {
  id: string;
  type: 'touch_interaction' | 'voice_command' | 'gesture_control' | 'eye_tracking' | 'hand_tracking';
  description: string;
  trigger_action: string;
  feedback_type: 'visual' | 'audio' | 'haptic' | 'combined';
  educational_purpose: string;
}

export interface AccessibilityFeature {
  feature_type: 'audio_description' | 'closed_captions' | 'sign_language' | 'high_contrast' | 'motion_reduction' | 'controller_alternatives';
  description: string;
  target_disability: string[];
  implementation_status: 'available' | 'in_development' | 'planned';
}

export interface ARFeature {
  feature_type: '3d_model_overlay' | 'information_popup' | 'measurement_tool' | 'animation_trigger' | 'sound_enhancement' | 'environment_modification';
  description: string;
  interaction_method: string;
  educational_value: string;
}

export interface EducationalContent {
  content_type: 'factual_information' | 'conservation_tips' | 'species_behavior' | 'ecosystem_relationships' | 'human_impact_data';
  content: string;
  source_attribution: string;
  age_appropriate: string[];
  verification_status: 'expert_reviewed' | 'peer_reviewed' | 'awaiting_review';
}

export interface ARGameElement {
  game_type: 'scavenger_hunt' | 'species_collection' | 'habitat_building' | 'conservation_challenges' | 'trivia_questions';
  description: string;
  points_awarded: number;
  completion_criteria: string;
  collaboration_required: boolean;
}

export interface PrivacySettings {
  data_sharing_options: ('anonymous_analytics' | 'location_data' | 'usage_patterns' | 'user_content')[];
  parental_controls: boolean;
  data_retention_days: number;
  third_party_integrations: string[];
  user_consent_required: string[];
}

export interface ImmersiveExperienceSession {
  id: string;
  user_id: string;
  experience_id: string;
  experience_type: 'vr' | 'ar';
  start_time: Date;
  end_time?: Date;
  duration_seconds?: number;
  completion_status: 'completed' | 'abandoned' | 'in_progress';
  interactions_performed: SessionInteraction[];
  learning_achievements: string[];
  user_feedback: {
    rating: number;
    comments?: string;
    reported_issues?: string[];
  };
  device_info: {
    device_type: string;
    os_version: string;
    app_version: string;
    performance_metrics: {
      fps_average: number;
      frame_drops: number;
      loading_time_seconds: number;
    };
  };
  environmental_data?: {
    location_accuracy: number;
    lighting_conditions: string;
    noise_level: string;
    temperature?: number;
  };
}

export interface SessionInteraction {
  timestamp: Date;
  interaction_type: string;
  target_object: string;
  action_performed: string;
  success: boolean;
  time_to_complete_seconds: number;
}

export interface ImmersiveLearningPath {
  id: string;
  title: string;
  description: string;
  target_audience: ('children' | 'teenagers' | 'adults' | 'educators' | 'researchers')[];
  difficulty_progression: 'linear' | 'adaptive' | 'user_choice';
  estimated_completion_hours: number;
  experiences_sequence: {
    experience_id: string;
    experience_type: 'vr' | 'ar';
    order_position: number;
    is_required: boolean;
    prerequisites?: string[];
  }[];
  learning_objectives: string[];
  assessment_methods: ('quiz' | 'practical_demonstration' | 'peer_review' | 'self_reflection')[];
  certification_offered: boolean;
  creator_info: {
    organization: string;
    expert_reviewers: string[];
    creation_date: Date;
    last_updated: Date;
  };
  usage_stats: {
    total_enrollments: number;
    completion_rate: number;
    average_rating: number;
    time_spent_average_hours: number;
  };
}

export interface ContentCreationTool {
  id: string;
  tool_name: string;
  tool_type: 'vr_editor' | 'ar_builder' | '3d_modeler' | 'animation_studio' | 'audio_editor';
  target_users: ('educators' | 'conservationists' | 'developers' | 'students')[];
  complexity_level: 'beginner_friendly' | 'intermediate' | 'professional';
  supported_formats: string[];
  collaboration_features: {
    real_time_editing: boolean;
    version_control: boolean;
    comment_system: boolean;
    approval_workflow: boolean;
  };
  template_library: {
    ecosystem_templates: number;
    species_models: number;
    interaction_scripts: number;
    animation_presets: number;
  };
  export_options: string[];
  integration_apis: string[];
  pricing_model: 'free' | 'freemium' | 'subscription' | 'one_time_purchase';
  system_requirements: {
    min_ram_gb: number;
    min_storage_gb: number;
    gpu_required: boolean;
    supported_os: string[];
  };
}

export interface VirtualFieldTrip {
  id: string;
  title: string;
  destination: {
    name: string;
    type: 'national_park' | 'marine_sanctuary' | 'research_station' | 'conservation_project' | 'indigenous_land';
    real_world_location: string;
    coordinates: { lat: number; lng: number };
  };
  duration_hours: number;
  max_participants: number;
  guide_info: {
    name: string;
    credentials: string[];
    bio: string;
    specialization: string[];
  };
  itinerary: FieldTripStop[];
  interactive_activities: FieldTripActivity[];
  learning_materials: {
    pre_trip_resources: string[];
    during_trip_worksheets: string[];
    post_trip_assessments: string[];
  };
  technical_setup: {
    platform_used: string;
    required_equipment: string[];
    backup_options: string[];
    technical_support_available: boolean;
  };
  scheduling: {
    available_dates: Date[];
    timezone: string;
    booking_deadline_days: number;
    cancellation_policy: string;
  };
  cost_per_participant: number;
  group_discounts: {
    min_group_size: number;
    discount_percentage: number;
  }[];
  accessibility_accommodations: string[];
  post_experience_engagement: {
    follow_up_projects: string[];
    community_connections: string[];
    ongoing_monitoring_opportunities: string[];
  };
}

export interface FieldTripStop {
  stop_number: number;
  location_name: string;
  duration_minutes: number;
  activity_type: 'observation' | 'interaction' | 'learning_station' | 'expert_presentation' | 'hands_on_activity';
  key_learning_points: string[];
  species_or_features_highlighted: string[];
  virtual_tools_used: string[];
}

export interface FieldTripActivity {
  activity_name: string;
  type: 'individual' | 'small_group' | 'whole_group';
  materials_needed: string[];
  instructions: string;
  expected_outcomes: string[];
  assessment_criteria: string[];
  time_allocation_minutes: number;
}
