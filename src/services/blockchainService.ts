import {
  BlockchainTransaction,
  TransparencyLedger,
  VerifiedProject,
  ProjectUpdate,
  SmartContractInteraction,
  CarbonCredit,
  GlobalTransparencyMetrics,
  AIImpactPrediction,
  RealTimeAlert,
  ContributorProfile
} from '@/types/blockchain';

class BlockchainService {
  private baseURL = '/api/blockchain';
  private webSocketUrl = 'wss://api.aegis.org/ws';

  // Mock blockchain data for demonstration
  private mockTransactions: BlockchainTransaction[] = [
    {
      id: 'tx_001',
      hash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      block_number: 18567234,
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      from_address: '0x742d35cc6e28932eaa5dd4ae3e1234567890abcd',
      to_address: '0xabc123def456789012345678901234567890efgh',
      amount: 250,
      currency: 'USD',
      transaction_type: 'donation',
      project_id: 'amazon_001',
      project_name: 'Amazon Sacred Headwaters Restoration',
      impact_data: {
        trees_planted: 125,
        hectares_restored: 2.5,
        co2_offset: 50,
        communities_supported: 1
      },
      verification_status: 'verified',
      gas_fee: 15.50,
      network: 'polygon',
      smart_contract_address: '0xdef789012345678901234567890abcdef123456'
    },
    {
      id: 'tx_002',
      hash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123457',
      block_number: 18567235,
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
      from_address: '0x843e46d7f39943fab6dd5ae3e1234567890bcde',
      amount: 1000,
      currency: 'USD',
      transaction_type: 'funding',
      project_id: 'kenya_002',
      project_name: 'Maasai Mara Wildlife Corridor',
      impact_data: {
        hectares_restored: 10,
        species_protected: 25,
        communities_supported: 3
      },
      verification_status: 'verified',
      gas_fee: 8.25,
      network: 'ethereum',
      smart_contract_address: '0xfgh456789012345678901234567890cdef123456'
    },
    {
      id: 'tx_003',
      hash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef123458',
      block_number: 18567236,
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
      from_address: '0x944f57e8g40054gbc7ee6bf4f2345678901cdef',
      amount: 500,
      currency: 'USD',
      transaction_type: 'carbon_offset',
      project_id: 'himalaya_003',
      project_name: 'Himalayan Biodiversity Conservation',
      impact_data: {
        trees_planted: 200,
        co2_offset: 100,
        species_protected: 15
      },
      verification_status: 'pending',
      gas_fee: 5.75,
      network: 'carbon_chain',
      smart_contract_address: '0xijk789012345678901234567890def123456'
    }
  ];

  private mockProjects: VerifiedProject[] = [
    {
      id: 'amazon_001',
      name: 'Amazon Sacred Headwaters Restoration',
      description: 'Protecting and restoring critical rainforest corridors in collaboration with indigenous communities',
      location: {
        country: 'Ecuador',
        region: 'Oriente',
        bioregion: 'Amazon Sacred Headwaters',
        coordinates: { lat: -1.5, lng: -77.5 }
      },
      project_type: 'restoration',
      funding_goal: 100000,
      funding_raised: 67500,
      impact_targets: {
        trees_to_plant: 50000,
        hectares_to_restore: 1000,
        co2_to_offset: 20000,
        communities_to_support: 15
      },
      current_impact: {
        trees_planted: 33750,
        hectares_restored: 675,
        co2_offset: 13500,
        communities_supported: 10
      },
      verification_documents: ['ipfs://QmVerification1', 'ipfs://QmCertificate1'],
      smart_contract_address: '0xdef789012345678901234567890abcdef123456',
      project_lead: 'Achuar Nation Council',
      start_date: '2024-01-15T00:00:00Z',
      status: 'active',
      blockchain_verification: {
        verified: true,
        verification_date: '2024-01-20T00:00:00Z',
        verifier_address: '0xverifier123456789012345678901234567890',
        verification_score: 95
      },
      real_time_updates: []
    },
    {
      id: 'kenya_002',
      name: 'Maasai Mara Wildlife Corridor',
      description: 'Creating and protecting wildlife corridors for safe animal migration',
      location: {
        country: 'Kenya',
        region: 'Narok County',
        bioregion: 'Maasai Mara Ecosystem',
        coordinates: { lat: -1.5, lng: 35.0 }
      },
      project_type: 'conservation',
      funding_goal: 75000,
      funding_raised: 52000,
      impact_targets: {
        hectares_to_restore: 500,
        species_to_protect: 150,
        communities_to_support: 8
      },
      current_impact: {
        hectares_restored: 347,
        species_protected: 104,
        communities_supported: 6
      },
      verification_documents: ['ipfs://QmVerification2', 'ipfs://QmCertificate2'],
      smart_contract_address: '0xfgh456789012345678901234567890cdef123456',
      project_lead: 'Maasai Conservation Trust',
      start_date: '2024-02-01T00:00:00Z',
      status: 'active',
      blockchain_verification: {
        verified: true,
        verification_date: '2024-02-05T00:00:00Z',
        verifier_address: '0xverifier789012345678901234567890123456',
        verification_score: 92
      },
      real_time_updates: []
    }
  ];

  // Get transparency ledger overview
  async getTransparencyLedger(): Promise<TransparencyLedger> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const totalValue = this.mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalImpact = this.mockTransactions.reduce((acc, tx) => ({
      trees_planted: acc.trees_planted + (tx.impact_data.trees_planted || 0),
      hectares_restored: acc.hectares_restored + (tx.impact_data.hectares_restored || 0),
      co2_offset_tons: acc.co2_offset_tons + (tx.impact_data.co2_offset || 0),
      species_protected: acc.species_protected + (tx.impact_data.species_protected || 0),
      communities_supported: acc.communities_supported + (tx.impact_data.communities_supported || 0)
    }), {
      trees_planted: 0,
      hectares_restored: 0,
      co2_offset_tons: 0,
      species_protected: 0,
      communities_supported: 0
    });

    return {
      total_transactions: this.mockTransactions.length,
      total_value_usd: totalValue,
      total_impact: totalImpact,
      recent_transactions: this.mockTransactions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ).slice(0, 10),
      verified_projects: this.mockProjects,
      transparency_score: 97.5
    };
  }

  // Get real-time project updates
  async getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock real-time updates
    const mockUpdates: ProjectUpdate[] = [
      {
        id: 'update_001',
        project_id: projectId,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        update_type: 'milestone',
        title: '5,000 Trees Planted Milestone Reached!',
        description: 'We have successfully planted 5,000 trees in the restoration area with help from local communities.',
        impact_data: {
          trees_planted: 5000,
          hectares_restored: 25,
          communities_supported: 2
        },
        media_urls: ['https://example.com/trees1.jpg', 'https://example.com/trees2.jpg'],
        location: { lat: -1.5, lng: -77.5 },
        verified_by_blockchain: true,
        verification_hash: '0xupdate123456789012345678901234567890'
      },
      {
        id: 'update_002',
        project_id: projectId,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        update_type: 'progress',
        title: 'Community Training Workshop Completed',
        description: 'Completed sustainable forestry training for 25 community members.',
        impact_data: {
          communities_supported: 1
        },
        verified_by_blockchain: true,
        verification_hash: '0xupdate789012345678901234567890123456'
      }
    ];

    return mockUpdates;
  }

  // Submit new blockchain transaction
  async submitTransaction(transactionData: Partial<BlockchainTransaction>): Promise<{
    success: boolean;
    transaction_hash?: string;
    error_message?: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate blockchain submission
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      const hash = '0x' + Math.random().toString(16).substring(2, 66);
      
      // Add to mock transactions
      const newTransaction: BlockchainTransaction = {
        id: 'tx_' + Date.now(),
        hash,
        block_number: 18567237 + this.mockTransactions.length,
        timestamp: new Date().toISOString(),
        verification_status: 'pending',
        gas_fee: Math.random() * 20 + 5,
        network: 'polygon',
        smart_contract_address: '0xcontract123456789012345678901234567',
        ...transactionData
      } as BlockchainTransaction;

      this.mockTransactions.unshift(newTransaction);

      return {
        success: true,
        transaction_hash: hash
      };
    }

    return {
      success: false,
      error_message: 'Blockchain network congestion. Please try again.'
    };
  }

  // Get global transparency metrics
  async getGlobalMetrics(): Promise<GlobalTransparencyMetrics> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      platform_stats: {
        total_users: 45678,
        total_projects: 234,
        total_funding_usd: 2350000,
        countries_represented: 67,
        blockchain_transactions: 15467
      },
      impact_metrics: {
        total_trees_planted: 1250000,
        total_hectares_restored: 25000,
        total_co2_offset: 500000,
        total_species_protected: 8934,
        total_communities_supported: 567
      },
      transparency_indicators: {
        fund_utilization_percentage: 94.5,
        project_completion_rate: 87.2,
        verification_accuracy: 98.7,
        real_time_reporting_score: 92.1,
        stakeholder_trust_index: 96.3
      },
      regional_breakdown: [
        {
          region: 'South America',
          bioregion: 'Amazon Basin',
          projects_count: 45,
          funding_amount: 567000,
          impact_metrics: {
            trees_planted: 456000,
            hectares_restored: 8900,
            co2_offset: 178000,
            species_protected: 2345,
            communities_supported: 89
          },
          urgency_level: 'critical',
          conservation_status: 'endangered'
        },
        {
          region: 'East Africa',
          bioregion: 'Maasai Mara',
          projects_count: 23,
          funding_amount: 234000,
          impact_metrics: {
            trees_planted: 123000,
            hectares_restored: 4500,
            co2_offset: 89000,
            species_protected: 1234,
            communities_supported: 45
          },
          urgency_level: 'high',
          conservation_status: 'declining'
        }
      ],
      trending_projects: this.mockProjects.slice(0, 3),
      top_contributors: [
        {
          id: 'contrib_001',
          name: 'EcoTech Solutions Inc.',
          contributor_type: 'corporate',
          total_contribution: 150000,
          contribution_count: 25,
          impact_score: 8750,
          verified: true,
          blockchain_address: '0xtop1234567890123456789012345678901234',
          contribution_history: [],
          preferred_projects: ['amazon_001', 'kenya_002'],
          public_profile: true,
          sustainability_ranking: 95
        }
      ]
    };
  }

  // Get AI impact predictions
  async getAIImpactPrediction(projectId: string): Promise<AIImpactPrediction> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    return {
      project_id: projectId,
      predicted_outcomes: {
        trees_survival_rate: 87.5,
        ecosystem_recovery_timeline: 36,
        biodiversity_increase_percentage: 23.4,
        carbon_sequestration_rate: 150.5,
        community_engagement_score: 92.1
      },
      risk_factors: {
        climate_change_risk: 0.15,
        political_stability_risk: 0.08,
        funding_sustainability_risk: 0.12,
        community_acceptance_risk: 0.05
      },
      confidence_score: 89.3,
      data_sources: [
        'NASA Satellite Imagery',
        'Local Weather Stations',
        'Community Surveys',
        'Historical Project Data',
        'Biodiversity Assessments'
      ],
      last_updated: new Date().toISOString(),
      recommendations: [
        'Increase community engagement programs by 15%',
        'Implement drought-resistant tree species selection',
        'Establish additional water conservation measures',
        'Create backup funding sources for sustainability'
      ]
    };
  }

  // Get real-time alerts
  async getRealTimeAlerts(): Promise<RealTimeAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return [
      {
        id: 'alert_001',
        alert_type: 'funding_milestone',
        title: 'Amazon Project Reaches 75% Funding',
        message: 'The Amazon Sacred Headwaters project has reached 75% of its funding goal!',
        severity: 'success',
        project_id: 'amazon_001',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        recipients: ['all_stakeholders'],
        action_required: false,
        blockchain_verified: true
      },
      {
        id: 'alert_002',
        alert_type: 'urgent_action',
        title: 'Deforestation Alert in Congo Basin',
        message: 'Satellite data shows increased deforestation activity. Immediate intervention needed.',
        severity: 'critical',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        recipients: ['conservation_teams', 'governments'],
        action_required: true,
        action_url: '/projects/congo-basin-emergency',
        blockchain_verified: true
      }
    ];
  }

  // Verify project on blockchain
  async verifyProject(projectId: string, verificationData: any): Promise<{
    success: boolean;
    verification_hash?: string;
    verification_score?: number;
    error_message?: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const success = Math.random() > 0.05; // 95% success rate

    if (success) {
      const hash = '0xverify' + Math.random().toString(16).substring(2, 58);
      const score = Math.floor(Math.random() * 20) + 80; // 80-100 score

      return {
        success: true,
        verification_hash: hash,
        verification_score: score
      };
    }

    return {
      success: false,
      error_message: 'Verification failed. Please check submitted documents.'
    };
  }

  // Create carbon credits
  async createCarbonCredits(projectId: string, creditData: Partial<CarbonCredit>): Promise<{
    success: boolean;
    credit_tokens?: string[];
    blockchain_transaction?: string;
    error_message?: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      const tokens = Array.from({ length: Math.floor(creditData.credit_amount || 10) }, 
        (_, i) => `CARBON_${projectId}_${Date.now()}_${i}`
      );
      const txHash = '0xcarbon' + Math.random().toString(16).substring(2, 58);

      return {
        success: true,
        credit_tokens: tokens,
        blockchain_transaction: txHash
      };
    }

    return {
      success: false,
      error_message: 'Carbon credit creation failed. Please verify project impact data.'
    };
  }

  // Get transaction by hash
  async getTransaction(hash: string): Promise<BlockchainTransaction | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.mockTransactions.find(tx => tx.hash === hash) || null;
  }

  // Get project by ID
  async getProject(projectId: string): Promise<VerifiedProject | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return this.mockProjects.find(project => project.id === projectId) || null;
  }

  // Search transactions
  async searchTransactions(query: {
    project_id?: string;
    transaction_type?: string;
    from_date?: string;
    to_date?: string;
    min_amount?: number;
    max_amount?: number;
  }): Promise<BlockchainTransaction[]> {
    await new Promise(resolve => setTimeout(resolve, 700));

    let results = [...this.mockTransactions];

    if (query.project_id) {
      results = results.filter(tx => tx.project_id === query.project_id);
    }

    if (query.transaction_type) {
      results = results.filter(tx => tx.transaction_type === query.transaction_type);
    }

    if (query.min_amount !== undefined) {
      results = results.filter(tx => tx.amount >= query.min_amount!);
    }

    if (query.max_amount !== undefined) {
      results = results.filter(tx => tx.amount <= query.max_amount!);
    }

    return results.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Subscribe to real-time updates
  subscribeToUpdates(callback: (update: any) => void): () => void {
    // Simulate WebSocket connection
    const interval = setInterval(() => {
      const randomUpdate = {
        type: Math.random() > 0.5 ? 'transaction' : 'project_update',
        data: Math.random() > 0.5 ? this.mockTransactions[0] : this.mockProjects[0],
        timestamp: new Date().toISOString()
      };
      callback(randomUpdate);
    }, 10000); // Update every 10 seconds

    // Return unsubscribe function
    return () => clearInterval(interval);
  }
}

export const blockchainService = new BlockchainService();
