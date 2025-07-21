export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'environmental' | 'community' | 'knowledge' | 'leadership' | 'innovation' | 'collaboration';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  icon_url: string;
  points_reward: number;
  requirements: AchievementRequirement[];
  unlock_conditions?: string[];
  hidden: boolean;
  one_time_only: boolean;
  global_count: number;
  created_date: string;
  expires_date?: string;
  special_rewards: SpecialReward[];
}

export interface AchievementRequirement {
  type: 'trees_planted' | 'donations_made' | 'projects_supported' | 'data_contributed' | 'community_engagement' | 'streak_days' | 'verification_accuracy';
  target_value: number;
  current_value: number;
  unit: string;
  time_frame?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all_time';
}

export interface SpecialReward {
  type: 'badge' | 'title' | 'access' | 'discount' | 'nft' | 'physical_item';
  name: string;
  description: string;
  value?: number;
  redeemable: boolean;
  expires_date?: string;
}

export interface UserProgress {
  user_id: string;
  level: number;
  experience_points: number;
  points_to_next_level: number;
  total_impact_score: number;
  achievements_unlocked: UserAchievement[];
  current_challenges: Challenge[];
  active_streaks: Streak[];
  leaderboard_position: number;
  preferred_categories: string[];
  notification_preferences: NotificationPreferences;
  seasonal_stats: SeasonalStats;
  badge_showcase: string[];
}

export interface UserAchievement {
  achievement_id: string;
  unlocked_date: string;
  progress_percentage: number;
  celebration_viewed: boolean;
  shared_publicly: boolean;
  blockchain_verified: boolean;
  verification_hash?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: 'solo' | 'team' | 'community' | 'global';
  category: 'trees' | 'restoration' | 'monitoring' | 'education' | 'fundraising' | 'advocacy';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  start_date: string;
  end_date: string;
  participant_count: number;
  max_participants?: number;
  entry_requirements: string[];
  objectives: ChallengeObjective[];
  rewards: ChallengeReward[];
  leaderboard: ChallengeLeaderboard[];
  team_formation_allowed: boolean;
  real_world_impact: RealWorldImpact;
  progress_tracking: ProgressTracking;
  social_features: SocialFeatures;
}

export interface ChallengeObjective {
  id: string;
  description: string;
  target_metric: string;
  target_value: number;
  current_value: number;
  weight_percentage: number;
  verification_method: 'automatic' | 'photo_upload' | 'gps_verification' | 'community_vote' | 'expert_review';
  bonus_multiplier?: number;
}

export interface ChallengeReward {
  tier: 'participation' | 'completion' | 'top_10' | 'top_3' | 'winner';
  points: number;
  badges: string[];
  titles: string[];
  special_items: SpecialReward[];
  real_world_benefits: string[];
  funding_allocation?: number;
}

export interface ChallengeLeaderboard {
  rank: number;
  user_id: string;
  username: string;
  avatar_url?: string;
  score: number;
  progress_percentage: number;
  team_name?: string;
  country: string;
  impact_highlight: string;
  verification_status: 'verified' | 'pending' | 'disputed';
}

export interface Streak {
  id: string;
  type: 'daily_action' | 'weekly_contribution' | 'monthly_donation' | 'consistent_monitoring';
  current_count: number;
  longest_count: number;
  last_activity_date: string;
  streak_rewards: StreakReward[];
  risk_level: 'safe' | 'at_risk' | 'broken';
  next_milestone: number;
  freeze_tokens: number;
}

export interface StreakReward {
  milestone: number;
  reward_type: 'points' | 'badge' | 'multiplier' | 'unlock';
  reward_value: string | number;
  claimed: boolean;
  claimed_date?: string;
}

export interface Leaderboard {
  id: string;
  name: string;
  description: string;
  category: 'global' | 'regional' | 'country' | 'bioregion' | 'age_group' | 'user_type';
  time_period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all_time';
  metric_type: 'total_points' | 'impact_score' | 'trees_planted' | 'funds_raised' | 'data_contributed' | 'community_engagement';
  entries: LeaderboardEntry[];
  last_updated: string;
  reset_schedule: string;
  prizes: LeaderboardPrize[];
  participant_count: number;
}

export interface LeaderboardEntry {
  rank: number;
  previous_rank?: number;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  country: string;
  user_type: string;
  score: number;
  score_change: number;
  impact_summary: ImpactSummary;
  verification_level: 'unverified' | 'basic' | 'advanced' | 'expert';
  trending: boolean;
  achievement_count: number;
  preferred_anonymity: boolean;
}

export interface ImpactSummary {
  trees_planted: number;
  hectares_restored: number;
  co2_offset: number;
  species_protected: number;
  communities_supported: number;
  funds_contributed: number;
  data_points_submitted: number;
  projects_supported: number;
}

export interface LeaderboardPrize {
  rank_range: string; // e.g., "1", "2-3", "4-10"
  prize_type: 'monetary' | 'recognition' | 'access' | 'physical' | 'experience';
  prize_description: string;
  prize_value?: number;
  special_benefits: string[];
}

export interface QuestLine {
  id: string;
  title: string;
  description: string;
  theme: 'new_steward' | 'biodiversity_explorer' | 'climate_champion' | 'community_leader' | 'tech_innovator';
  difficulty_progression: 'linear' | 'branching' | 'adaptive';
  estimated_duration_days: number;
  prerequisite_achievements: string[];
  quests: Quest[];
  completion_rewards: QuestLineReward[];
  lore_background: string;
  visual_theme: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  quest_type: 'action' | 'exploration' | 'social' | 'educational' | 'creative';
  steps: QuestStep[];
  optional_steps: QuestStep[];
  auto_start: boolean;
  time_limit?: number;
  location_specific: boolean;
  required_location?: { lat: number; lng: number; radius_km: number };
  collaboration_required: boolean;
  mentorship_available: boolean;
}

export interface QuestStep {
  id: string;
  order: number;
  instruction: string;
  action_type: 'donate' | 'plant_tree' | 'take_photo' | 'submit_data' | 'visit_location' | 'share_content' | 'complete_course' | 'join_event';
  verification_criteria: VerificationCriteria;
  hints: string[];
  estimated_time_minutes: number;
  difficulty_rating: number;
  points_reward: number;
  completion_rate: number;
}

export interface VerificationCriteria {
  method: 'automatic' | 'photo_proof' | 'gps_check' | 'peer_review' | 'expert_validation' | 'blockchain_verify';
  requirements: string[];
  acceptance_threshold: number;
  review_time_hours?: number;
}

export interface QuestLineReward {
  milestone_percentage: number;
  reward_type: 'title' | 'badge' | 'access' | 'multiplier' | 'exclusive_quest' | 'nft' | 'tree_naming_rights';
  reward_name: string;
  reward_description: string;
  permanent: boolean;
  tradeable: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface SocialFeatures {
  team_creation_enabled: boolean;
  max_team_size: number;
  team_communication_tools: string[];
  public_sharing_encouraged: boolean;
  hashtags: string[];
  photo_sharing_rewards: number;
  story_sharing_rewards: number;
  viral_bonus_multiplier: number;
  cross_platform_integration: string[];
}

export interface RealWorldImpact {
  environmental_outcome: string;
  community_benefit: string;
  measurable_metrics: string[];
  verification_process: string;
  impact_timeline: string;
  partner_organizations: string[];
  funding_allocation: FundingAllocation[];
  transparency_level: 'basic' | 'detailed' | 'blockchain_verified';
}

export interface FundingAllocation {
  category: string;
  percentage: number;
  amount_usd: number;
  description: string;
  verification_method: string;
}

export interface ProgressTracking {
  update_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  visualization_type: 'progress_bar' | 'map_overlay' | 'graph' | 'dashboard' | 'ar_visualization';
  milestone_celebrations: boolean;
  team_progress_visible: boolean;
  individual_contributions_tracked: boolean;
  impact_forecasting: boolean;
}

export interface NotificationPreferences {
  achievement_unlocks: boolean;
  challenge_updates: boolean;
  leaderboard_changes: boolean;
  streak_reminders: boolean;
  team_activities: boolean;
  impact_updates: boolean;
  seasonal_events: boolean;
  expert_tips: boolean;
  push_frequency: 'immediate' | 'daily_digest' | 'weekly_summary' | 'minimal';
}

export interface SeasonalStats {
  current_season: 'spring' | 'summer' | 'autumn' | 'winter';
  seasonal_points: number;
  seasonal_rank: number;
  seasonal_achievements: string[];
  seasonal_challenges_completed: number;
  season_start_date: string;
  special_seasonal_multipliers: SeasonalMultiplier[];
}

export interface SeasonalMultiplier {
  activity_type: string;
  multiplier: number;
  start_date: string;
  end_date: string;
  description: string;
}

export interface TeamCompetition {
  id: string;
  name: string;
  description: string;
  competition_type: 'speed' | 'endurance' | 'innovation' | 'collaboration' | 'impact';
  team_size_min: number;
  team_size_max: number;
  registration_deadline: string;
  start_date: string;
  end_date: string;
  participating_teams: Team[];
  scoring_system: ScoringSystem;
  real_world_projects: string[];
  sponsor_organizations: string[];
  prizes: CompetitionPrize[];
  live_tracking: boolean;
  public_visibility: boolean;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  captain_id: string;
  members: TeamMember[];
  formation_date: string;
  country: string;
  bioregion_focus: string;
  team_avatar_url?: string;
  public_profile: boolean;
  recruitment_open: boolean;
  team_stats: TeamStats;
  team_achievements: string[];
  communication_preferences: TeamCommunication;
}

export interface TeamMember {
  user_id: string;
  username: string;
  role: 'captain' | 'co_captain' | 'member' | 'mentor';
  join_date: string;
  contribution_score: number;
  specialization: string[];
  activity_level: 'high' | 'medium' | 'low';
  mentorship_status: 'seeking' | 'providing' | 'none';
}

export interface TeamStats {
  total_impact_score: number;
  trees_planted: number;
  funds_raised: number;
  projects_completed: number;
  data_contributed: number;
  community_events_organized: number;
  average_member_level: number;
  team_efficiency_score: number;
}

export interface TeamCommunication {
  chat_enabled: boolean;
  video_calls_enabled: boolean;
  file_sharing_enabled: boolean;
  task_management_enabled: boolean;
  public_updates_frequency: 'none' | 'weekly' | 'monthly';
  external_platform_integration: string[];
}

export interface ScoringSystem {
  primary_metric: string;
  weight_distribution: { [key: string]: number };
  bonus_categories: BonusCategory[];
  penalty_categories: PenaltyCategory[];
  real_time_updates: boolean;
  verification_requirements: string[];
}

export interface BonusCategory {
  category: string;
  multiplier: number;
  description: string;
  max_bonus_percentage: number;
}

export interface PenaltyCategory {
  category: string;
  penalty_percentage: number;
  description: string;
  max_penalty_percentage: number;
}

export interface CompetitionPrize {
  rank: number;
  prize_type: 'funding' | 'recognition' | 'resources' | 'partnership' | 'technology_access';
  prize_value: number;
  prize_description: string;
  distribution_method: 'equal_split' | 'captain_decides' | 'contribution_based';
  additional_benefits: string[];
  publicity_opportunities: string[];
}

export const ACHIEVEMENT_CATEGORIES = {
  environmental: {
    name: 'Environmental Impact',
    description: 'Achievements related to direct environmental action',
    color: '#10b981',
    icon: '🌱'
  },
  community: {
    name: 'Community Building',
    description: 'Achievements for fostering community engagement',
    color: '#3b82f6',
    icon: '🤝'
  },
  knowledge: {
    name: 'Knowledge Sharing',
    description: 'Achievements for education and data contribution',
    color: '#8b5cf6',
    icon: '📚'
  },
  leadership: {
    name: 'Leadership',
    description: 'Achievements for leading initiatives and mentoring',
    color: '#f59e0b',
    icon: '👑'
  },
  innovation: {
    name: 'Innovation',
    description: 'Achievements for creative solutions and technology use',
    color: '#ef4444',
    icon: '💡'
  },
  collaboration: {
    name: 'Collaboration',
    description: 'Achievements for working effectively with others',
    color: '#06b6d4',
    icon: '🌍'
  }
};

export const DIFFICULTY_COLORS = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
  platinum: '#e5e4e2',
  diamond: '#b9f2ff'
};

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000,
  13000, 16500, 20500, 25000, 30000, 35500, 41500, 48000, 55000,
  62500, 70500, 79000, 88000, 97500, 107500, 118000, 129000, 140500, 152500
];
