export interface BlockchainTransaction {
  id: string;
  hash: string;
  block_number: number;
  timestamp: string;
  from_address: string;
  to_address?: string;
  amount: number;
  currency: string;
  transaction_type: 'donation' | 'funding' | 'reward' | 'verification' | 'carbon_offset';
  project_id: string;
  project_name: string;
  impact_data: {
    trees_planted?: number;
    hectares_restored?: number;
    co2_offset?: number;
    species_protected?: number;
    communities_supported?: number;
  };
  verification_status: 'pending' | 'verified' | 'failed';
  gas_fee: number;
  network: 'ethereum' | 'polygon' | 'carbon_chain';
  smart_contract_address: string;
}

export interface TransparencyLedger {
  total_transactions: number;
  total_value_usd: number;
  total_impact: {
    trees_planted: number;
    hectares_restored: number;
    co2_offset_tons: number;
    species_protected: number;
    communities_supported: number;
  };
  recent_transactions: BlockchainTransaction[];
  verified_projects: VerifiedProject[];
  transparency_score: number;
}

export interface VerifiedProject {
  id: string;
  name: string;
  description: string;
  location: {
    country: string;
    region: string;
    bioregion: string;
    coordinates: { lat: number; lng: number };
  };
  project_type: 'reforestation' | 'conservation' | 'restoration' | 'research' | 'community';
  funding_goal: number;
  funding_raised: number;
  impact_targets: {
    trees_to_plant?: number;
    hectares_to_restore?: number;
    co2_to_offset?: number;
    species_to_protect?: number;
    communities_to_support?: number;
  };
  current_impact: {
    trees_planted?: number;
    hectares_restored?: number;
    co2_offset?: number;
    species_protected?: number;
    communities_supported?: number;
  };
  verification_documents: string[];
  smart_contract_address: string;
  project_lead: string;
  start_date: string;
  end_date?: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  blockchain_verification: {
    verified: boolean;
    verification_date: string;
    verifier_address: string;
    verification_score: number;
  };
  real_time_updates: ProjectUpdate[];
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  timestamp: string;
  update_type: 'milestone' | 'progress' | 'completion' | 'issue' | 'media';
  title: string;
  description: string;
  impact_data?: {
    trees_planted?: number;
    hectares_restored?: number;
    co2_offset?: number;
    species_protected?: number;
    communities_supported?: number;
  };
  media_urls?: string[];
  location?: { lat: number; lng: number };
  verified_by_blockchain: boolean;
  verification_hash?: string;
}

export interface SmartContractInteraction {
  contract_address: string;
  function_name: string;
  parameters: any;
  transaction_hash: string;
  gas_used: number;
  status: 'pending' | 'success' | 'failed';
  block_number?: number;
  confirmation_count: number;
}

export interface CarbonCredit {
  id: string;
  project_id: string;
  credit_amount: number; // tons of CO2
  price_per_ton: number;
  total_value: number;
  certification_standard: 'VCS' | 'Gold_Standard' | 'CAR' | 'AEGIS_Verified';
  issuance_date: string;
  expiry_date: string;
  vintage_year: number;
  methodology: string;
  blockchain_token_id: string;
  current_owner: string;
  transaction_history: CarbonCreditTransaction[];
  verification_documents: string[];
  impact_metrics: {
    biodiversity_impact: number;
    community_impact: number;
    additionality_score: number;
    permanence_score: number;
  };
}

export interface CarbonCreditTransaction {
  id: string;
  credit_id: string;
  transaction_type: 'purchase' | 'retirement' | 'transfer' | 'fractionalization';
  from_address: string;
  to_address: string;
  amount: number;
  price: number;
  timestamp: string;
  transaction_hash: string;
  retirement_reason?: string;
  impact_claim?: string;
}

export interface GlobalTransparencyMetrics {
  platform_stats: {
    total_users: number;
    total_projects: number;
    total_funding_usd: number;
    countries_represented: number;
    blockchain_transactions: number;
  };
  impact_metrics: {
    total_trees_planted: number;
    total_hectares_restored: number;
    total_co2_offset: number;
    total_species_protected: number;
    total_communities_supported: number;
  };
  transparency_indicators: {
    fund_utilization_percentage: number;
    project_completion_rate: number;
    verification_accuracy: number;
    real_time_reporting_score: number;
    stakeholder_trust_index: number;
  };
  regional_breakdown: RegionalMetrics[];
  trending_projects: VerifiedProject[];
  top_contributors: ContributorProfile[];
}

export interface RegionalMetrics {
  region: string;
  bioregion: string;
  projects_count: number;
  funding_amount: number;
  impact_metrics: {
    trees_planted: number;
    hectares_restored: number;
    co2_offset: number;
    species_protected: number;
    communities_supported: number;
  };
  urgency_level: 'low' | 'medium' | 'high' | 'critical';
  conservation_status: 'stable' | 'declining' | 'endangered' | 'critical';
}

export interface ContributorProfile {
  id: string;
  name: string;
  contributor_type: 'individual' | 'organization' | 'government' | 'corporate';
  total_contribution: number;
  contribution_count: number;
  impact_score: number;
  verified: boolean;
  blockchain_address: string;
  contribution_history: BlockchainTransaction[];
  preferred_projects: string[];
  public_profile: boolean;
  sustainability_ranking: number;
}

export interface AIImpactPrediction {
  project_id: string;
  predicted_outcomes: {
    trees_survival_rate: number;
    ecosystem_recovery_timeline: number; // months
    biodiversity_increase_percentage: number;
    carbon_sequestration_rate: number; // tons per year
    community_engagement_score: number;
  };
  risk_factors: {
    climate_change_risk: number;
    political_stability_risk: number;
    funding_sustainability_risk: number;
    community_acceptance_risk: number;
  };
  confidence_score: number;
  data_sources: string[];
  last_updated: string;
  recommendations: string[];
}

export interface RealTimeAlert {
  id: string;
  alert_type: 'funding_milestone' | 'impact_achievement' | 'project_completion' | 'urgent_action' | 'verification_update';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  project_id?: string;
  transaction_hash?: string;
  timestamp: string;
  recipients: string[];
  action_required: boolean;
  action_url?: string;
  blockchain_verified: boolean;
}

export const BLOCKCHAIN_NETWORKS = {
  ethereum: {
    name: 'Ethereum',
    chain_id: 1,
    currency: 'ETH',
    explorer_url: 'https://etherscan.io',
    rpc_url: 'https://mainnet.infura.io/v3/',
    gas_price_gwei: 20
  },
  polygon: {
    name: 'Polygon',
    chain_id: 137,
    currency: 'MATIC',
    explorer_url: 'https://polygonscan.com',
    rpc_url: 'https://polygon-rpc.com/',
    gas_price_gwei: 2
  },
  carbon_chain: {
    name: 'Carbon Chain',
    chain_id: 8888,
    currency: 'CARBON',
    explorer_url: 'https://carbonchain.io/explorer',
    rpc_url: 'https://rpc.carbonchain.io/',
    gas_price_gwei: 1
  }
};

export const IMPACT_METRICS_UNITS = {
  trees_planted: 'trees',
  hectares_restored: 'hectares',
  co2_offset: 'tons CO₂',
  species_protected: 'species',
  communities_supported: 'communities'
};
