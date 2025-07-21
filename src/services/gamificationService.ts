import {
  Achievement,
  UserProgress,
  Challenge,
  Leaderboard,
  QuestLine,
  TeamCompetition,
  Team,
  UserAchievement,
  Streak,
  SeasonalStats,
  ImpactSummary
} from '@/types/gamification';

class GamificationService {
  private baseURL = '/api/gamification';

  // Mock achievements data
  private mockAchievements: Achievement[] = [
    {
      id: 'ach_001',
      name: 'First Steps',
      description: 'Plant your first tree and begin your stewardship journey',
      category: 'environmental',
      difficulty: 'bronze',
      icon_url: 'https://example.com/icons/first_tree.png',
      points_reward: 100,
      requirements: [
        {
          type: 'trees_planted',
          target_value: 1,
          current_value: 0,
          unit: 'trees',
          time_frame: 'all_time'
        }
      ],
      hidden: false,
      one_time_only: true,
      global_count: 12456,
      created_date: '2024-01-01T00:00:00Z',
      special_rewards: [
        {
          type: 'badge',
          name: 'Seedling Steward',
          description: 'Your first step into environmental stewardship',
          redeemable: false
        }
      ]
    },
    {
      id: 'ach_002',
      name: 'Forest Guardian',
      description: 'Plant 100 trees and protect our forests for future generations',
      category: 'environmental',
      difficulty: 'silver',
      icon_url: 'https://example.com/icons/forest_guardian.png',
      points_reward: 1000,
      requirements: [
        {
          type: 'trees_planted',
          target_value: 100,
          current_value: 0,
          unit: 'trees',
          time_frame: 'all_time'
        }
      ],
      hidden: false,
      one_time_only: true,
      global_count: 3421,
      created_date: '2024-01-01T00:00:00Z',
      special_rewards: [
        {
          type: 'title',
          name: 'Forest Guardian',
          description: 'Display this prestigious title on your profile',
          redeemable: true
        },
        {
          type: 'nft',
          name: 'Digital Forest Certificate',
          description: 'Blockchain-verified certificate of your forest impact',
          redeemable: true
        }
      ]
    },
    {
      id: 'ach_003',
      name: 'Data Detective',
      description: 'Contribute 50 verified data points to help monitor our ecosystems',
      category: 'knowledge',
      difficulty: 'gold',
      icon_url: 'https://example.com/icons/data_detective.png',
      points_reward: 2500,
      requirements: [
        {
          type: 'data_contributed',
          target_value: 50,
          current_value: 0,
          unit: 'data points',
          time_frame: 'all_time'
        },
        {
          type: 'verification_accuracy',
          target_value: 85,
          current_value: 0,
          unit: 'percentage',
          time_frame: 'all_time'
        }
      ],
      hidden: false,
      one_time_only: true,
      global_count: 867,
      created_date: '2024-01-01T00:00:00Z',
      special_rewards: [
        {
          type: 'access',
          name: 'Advanced Analytics Dashboard',
          description: 'Access to detailed ecosystem analytics and AI insights',
          redeemable: true
        }
      ]
    },
    {
      id: 'ach_004',
      name: 'Community Champion',
      description: 'Lead a team of 10 stewards in a collaborative conservation project',
      category: 'leadership',
      difficulty: 'platinum',
      icon_url: 'https://example.com/icons/community_champion.png',
      points_reward: 5000,
      requirements: [
        {
          type: 'community_engagement',
          target_value: 10,
          current_value: 0,
          unit: 'team members led',
          time_frame: 'all_time'
        },
        {
          type: 'projects_supported',
          target_value: 3,
          current_value: 0,
          unit: 'completed projects',
          time_frame: 'all_time'
        }
      ],
      hidden: false,
      one_time_only: true,
      global_count: 234,
      created_date: '2024-01-01T00:00:00Z',
      special_rewards: [
        {
          type: 'physical_item',
          name: 'AEGIS Leadership Certificate',
          description: 'Physical certificate recognizing your leadership in conservation',
          redeemable: true
        }
      ]
    }
  ];

  // Mock user progress
  private mockUserProgress: UserProgress = {
    user_id: 'user_123',
    level: 12,
    experience_points: 8750,
    points_to_next_level: 1250,
    total_impact_score: 15420,
    achievements_unlocked: [
      {
        achievement_id: 'ach_001',
        unlocked_date: '2024-01-15T10:30:00Z',
        progress_percentage: 100,
        celebration_viewed: true,
        shared_publicly: true,
        blockchain_verified: true,
        verification_hash: '0xachievement123456789012345678901234'
      }
    ],
    current_challenges: [],
    active_streaks: [
      {
        id: 'streak_001',
        type: 'daily_action',
        current_count: 23,
        longest_count: 45,
        last_activity_date: new Date(Date.now() - 86400000).toISOString(),
        streak_rewards: [
          {
            milestone: 7,
            reward_type: 'points',
            reward_value: 500,
            claimed: true,
            claimed_date: '2024-01-22T00:00:00Z'
          },
          {
            milestone: 30,
            reward_type: 'badge',
            reward_value: 'Consistency Champion',
            claimed: false
          }
        ],
        risk_level: 'safe',
        next_milestone: 30,
        freeze_tokens: 2
      }
    ],
    leaderboard_position: 156,
    preferred_categories: ['environmental', 'community'],
    notification_preferences: {
      achievement_unlocks: true,
      challenge_updates: true,
      leaderboard_changes: false,
      streak_reminders: true,
      team_activities: true,
      impact_updates: true,
      seasonal_events: true,
      expert_tips: false,
      push_frequency: 'daily_digest'
    },
    seasonal_stats: {
      current_season: 'spring',
      seasonal_points: 2340,
      seasonal_rank: 89,
      seasonal_achievements: ['ach_001'],
      seasonal_challenges_completed: 4,
      season_start_date: '2024-03-01T00:00:00Z',
      special_seasonal_multipliers: [
        {
          activity_type: 'tree_planting',
          multiplier: 1.5,
          start_date: '2024-03-01T00:00:00Z',
          end_date: '2024-05-31T23:59:59Z',
          description: 'Spring Planting Bonus'
        }
      ]
    },
    badge_showcase: ['ach_001', 'ach_002']
  };

  // Mock challenges
  private mockChallenges: Challenge[] = [
    {
      id: 'challenge_001',
      title: 'Global Reforestation Sprint',
      description: 'Join stewards worldwide in planting 100,000 trees in 30 days',
      challenge_type: 'global',
      category: 'trees',
      difficulty: 'medium',
      start_date: '2024-02-01T00:00:00Z',
      end_date: '2024-02-29T23:59:59Z',
      participant_count: 15467,
      max_participants: 50000,
      entry_requirements: ['Level 3 or higher', 'At least 1 tree planted previously'],
      objectives: [
        {
          id: 'obj_001',
          description: 'Plant trees individually or as part of organized events',
          target_metric: 'trees_planted',
          target_value: 100000,
          current_value: 67823,
          weight_percentage: 100,
          verification_method: 'photo_upload'
        }
      ],
      rewards: [
        {
          tier: 'participation',
          points: 500,
          badges: ['Global Participant 2024'],
          titles: [],
          special_items: [],
          real_world_benefits: ['Tree planting certificate'],
          funding_allocation: 1000
        },
        {
          tier: 'top_10',
          points: 5000,
          badges: ['Top 10 Global Reforester'],
          titles: ['Forest Champion'],
          special_items: [
            {
              type: 'nft',
              name: 'Legendary Tree NFT',
              description: 'Unique digital collectible representing your impact',
              redeemable: true
            }
          ],
          real_world_benefits: ['VIP access to AEGIS annual conference'],
          funding_allocation: 10000
        }
      ],
      leaderboard: [
        {
          rank: 1,
          user_id: 'user_456',
          username: 'EcoWarrior23',
          avatar_url: 'https://example.com/avatars/user_456.jpg',
          score: 2347,
          progress_percentage: 95,
          country: 'Brazil',
          impact_highlight: '2,347 trees planted across 3 locations',
          verification_status: 'verified'
        }
      ],
      team_formation_allowed: true,
      real_world_impact: {
        environmental_outcome: 'Restore 2,500 hectares of degraded forest land',
        community_benefit: 'Create 500 local jobs in reforestation',
        measurable_metrics: ['Tree survival rate', 'Biodiversity increase', 'Carbon sequestration'],
        verification_process: 'Satellite monitoring and field verification',
        impact_timeline: '5 years for full forest establishment',
        partner_organizations: ['World Wildlife Fund', 'Local Conservation Groups'],
        funding_allocation: [
          {
            category: 'Tree seedlings',
            percentage: 40,
            amount_usd: 200000,
            description: 'Native species seedlings from certified nurseries',
            verification_method: 'Supplier receipts and delivery confirmations'
          },
          {
            category: 'Community training',
            percentage: 30,
            amount_usd: 150000,
            description: 'Training local communities in sustainable forestry',
            verification_method: 'Training completion certificates'
          }
        ],
        transparency_level: 'blockchain_verified'
      },
      progress_tracking: {
        update_frequency: 'real_time',
        visualization_type: 'map_overlay',
        milestone_celebrations: true,
        team_progress_visible: true,
        individual_contributions_tracked: true,
        impact_forecasting: true
      },
      social_features: {
        team_creation_enabled: true,
        max_team_size: 10,
        team_communication_tools: ['chat', 'photo_sharing', 'progress_updates'],
        public_sharing_encouraged: true,
        hashtags: ['#GlobalReforestation2024', '#AEGISChallenge', '#TreesForFuture'],
        photo_sharing_rewards: 50,
        story_sharing_rewards: 100,
        viral_bonus_multiplier: 1.2,
        cross_platform_integration: ['Instagram', 'Twitter', 'Facebook', 'TikTok']
      }
    }
  ];

  // Get user progress
  async getUserProgress(userId: string): Promise<UserProgress> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return this.mockUserProgress;
  }

  // Get available achievements
  async getAchievements(category?: string): Promise<Achievement[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (category) {
      return this.mockAchievements.filter(ach => ach.category === category);
    }
    
    return this.mockAchievements;
  }

  // Get active challenges
  async getActiveChallenges(userId?: string): Promise<Challenge[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    return this.mockChallenges;
  }

  // Join challenge
  async joinChallenge(challengeId: string, teamId?: string): Promise<{
    success: boolean;
    message: string;
    challenge_entry?: any;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const challenge = this.mockChallenges.find(c => c.id === challengeId);
    if (!challenge) {
      return {
        success: false,
        message: 'Challenge not found'
      };
    }

    if (challenge.participant_count >= (challenge.max_participants || Infinity)) {
      return {
        success: false,
        message: 'Challenge is full'
      };
    }

    // Simulate successful joining
    challenge.participant_count += 1;

    return {
      success: true,
      message: `Successfully joined "${challenge.title}"!`,
      challenge_entry: {
        challenge_id: challengeId,
        user_id: 'current_user',
        team_id: teamId,
        join_date: new Date().toISOString(),
        status: 'active'
      }
    };
  }

  // Update progress for challenge/achievement
  async updateProgress(progressData: {
    type: 'challenge' | 'achievement' | 'streak';
    id: string;
    metric: string;
    value: number;
    verification_data?: any;
  }): Promise<{
    success: boolean;
    progress_updated: boolean;
    rewards_earned: any[];
    achievements_unlocked: string[];
    level_up: boolean;
    message: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate progress update
    const rewardsEarned = [];
    const achievementsUnlocked = [];
    let levelUp = false;

    // Check if this progress triggers achievements
    if (progressData.metric === 'trees_planted' && progressData.value >= 1) {
      achievementsUnlocked.push('ach_001');
      rewardsEarned.push({
        type: 'achievement',
        name: 'First Steps',
        points: 100,
        badges: ['Seedling Steward']
      });
    }

    // Check for level up
    if (Math.random() > 0.8) { // 20% chance of level up
      levelUp = true;
      rewardsEarned.push({
        type: 'level_up',
        new_level: this.mockUserProgress.level + 1,
        points: 500,
        unlocks: ['New quest line available']
      });
    }

    return {
      success: true,
      progress_updated: true,
      rewards_earned: rewardsEarned,
      achievements_unlocked: achievementsUnlocked,
      level_up: levelUp,
      message: 'Progress updated successfully!'
    };
  }

  // Get leaderboards
  async getLeaderboards(category: string = 'global', timeframe: string = 'monthly'): Promise<Leaderboard> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const mockLeaderboard: Leaderboard = {
      id: 'leaderboard_global_monthly',
      name: 'Global Monthly Impact Leaders',
      description: 'Top stewards making the biggest environmental impact this month',
      category: 'global',
      time_period: 'monthly',
      metric_type: 'impact_score',
      entries: [
        {
          rank: 1,
          previous_rank: 2,
          user_id: 'user_top1',
          username: 'EcoChampion2024',
          display_name: 'Maria Santos',
          avatar_url: 'https://example.com/avatars/maria.jpg',
          country: 'Brazil',
          user_type: 'Individual Steward',
          score: 15420,
          score_change: 2340,
          impact_summary: {
            trees_planted: 1247,
            hectares_restored: 23,
            co2_offset: 156,
            species_protected: 8,
            communities_supported: 3,
            funds_contributed: 2500,
            data_points_submitted: 89,
            projects_supported: 5
          },
          verification_level: 'expert',
          trending: true,
          achievement_count: 23,
          preferred_anonymity: false
        },
        {
          rank: 2,
          previous_rank: 1,
          user_id: 'user_top2',
          username: 'ForestGuardian',
          display_name: 'Dr. James Mwangi',
          avatar_url: 'https://example.com/avatars/james.jpg',
          country: 'Kenya',
          user_type: 'Researcher',
          score: 14890,
          score_change: -530,
          impact_summary: {
            trees_planted: 890,
            hectares_restored: 45,
            co2_offset: 234,
            species_protected: 15,
            communities_supported: 7,
            funds_contributed: 1800,
            data_points_submitted: 156,
            projects_supported: 8
          },
          verification_level: 'expert',
          trending: false,
          achievement_count: 31,
          preferred_anonymity: false
        }
      ],
      last_updated: new Date().toISOString(),
      reset_schedule: 'First day of each month',
      prizes: [
        {
          rank_range: '1',
          prize_type: 'recognition',
          prize_description: 'Featured on AEGIS homepage and social media',
          special_benefits: ['VIP conference access', 'Direct line to AEGIS team', 'Custom NFT']
        },
        {
          rank_range: '2-3',
          prize_type: 'monetary',
          prize_description: '$500 donation to conservation project of choice',
          prize_value: 500,
          special_benefits: ['Conference access', 'AEGIS merchandise package']
        }
      ],
      participant_count: 15467
    };

    return mockLeaderboard;
  }

  // Get quest lines
  async getQuestLines(userLevel: number = 1): Promise<QuestLine[]> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockQuestLines: QuestLine[] = [
      {
        id: 'quest_line_001',
        title: 'The Steward\'s Journey',
        description: 'Begin your path as an environmental steward and learn the basics of conservation',
        theme: 'new_steward',
        difficulty_progression: 'linear',
        estimated_duration_days: 14,
        prerequisite_achievements: [],
        quests: [
          {
            id: 'quest_001',
            title: 'Plant Your First Tree',
            description: 'Take your first step into environmental stewardship by planting a tree',
            quest_type: 'action',
            steps: [
              {
                id: 'step_001',
                order: 1,
                instruction: 'Find a suitable location for tree planting',
                action_type: 'visit_location',
                verification_criteria: {
                  method: 'gps_check',
                  requirements: ['Location must be suitable for tree growth'],
                  acceptance_threshold: 80
                },
                hints: ['Look for areas with good soil and sunlight', 'Avoid areas prone to flooding'],
                estimated_time_minutes: 30,
                difficulty_rating: 2,
                points_reward: 50,
                completion_rate: 0.89
              },
              {
                id: 'step_002',
                order: 2,
                instruction: 'Plant your tree and document the process',
                action_type: 'take_photo',
                verification_criteria: {
                  method: 'photo_proof',
                  requirements: ['Clear photo of planted seedling', 'GPS coordinates included'],
                  acceptance_threshold: 85,
                  review_time_hours: 24
                },
                hints: ['Include a reference object for scale', 'Take photo in good lighting'],
                estimated_time_minutes: 45,
                difficulty_rating: 3,
                points_reward: 100,
                completion_rate: 0.76
              }
            ],
            optional_steps: [
              {
                id: 'step_003',
                order: 3,
                instruction: 'Share your tree planting story on social media',
                action_type: 'share_content',
                verification_criteria: {
                  method: 'automatic',
                  requirements: ['Post includes #AEGISFirstTree hashtag'],
                  acceptance_threshold: 100
                },
                hints: ['Use inspiring captions', 'Tag AEGIS official accounts'],
                estimated_time_minutes: 10,
                difficulty_rating: 1,
                points_reward: 25,
                completion_rate: 0.45
              }
            ],
            auto_start: true,
            time_limit: 7 * 24 * 60, // 7 days in minutes
            location_specific: false,
            collaboration_required: false,
            mentorship_available: true
          }
        ],
        completion_rewards: [
          {
            milestone_percentage: 50,
            reward_type: 'badge',
            reward_name: 'Halfway Hero',
            reward_description: 'You\'re halfway through your steward journey!',
            permanent: true,
            tradeable: false,
            rarity: 'common'
          },
          {
            milestone_percentage: 100,
            reward_type: 'title',
            reward_name: 'Certified Steward',
            reward_description: 'You have completed your basic stewardship training',
            permanent: true,
            tradeable: false,
            rarity: 'uncommon'
          }
        ],
        lore_background: 'Every great steward starts with a single action. Your journey to protect Earth\'s crown bioregions begins now.',
        visual_theme: 'forest_awakening'
      }
    ];

    return mockQuestLines.filter(ql => ql.prerequisite_achievements.length === 0 || userLevel >= 5);
  }

  // Create/join team
  async createTeam(teamData: {
    name: string;
    description: string;
    bioregion_focus: string;
    public_profile: boolean;
    recruitment_open: boolean;
  }): Promise<{
    success: boolean;
    team_id?: string;
    team?: Team;
    message: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const teamId = 'team_' + Date.now();
    
    const newTeam: Team = {
      id: teamId,
      name: teamData.name,
      description: teamData.description,
      captain_id: 'current_user',
      members: [
        {
          user_id: 'current_user',
          username: 'current_username',
          role: 'captain',
          join_date: new Date().toISOString(),
          contribution_score: 0,
          specialization: [],
          activity_level: 'high',
          mentorship_status: 'none'
        }
      ],
      formation_date: new Date().toISOString(),
      country: 'Global',
      bioregion_focus: teamData.bioregion_focus,
      public_profile: teamData.public_profile,
      recruitment_open: teamData.recruitment_open,
      team_stats: {
        total_impact_score: 0,
        trees_planted: 0,
        funds_raised: 0,
        projects_completed: 0,
        data_contributed: 0,
        community_events_organized: 0,
        average_member_level: 1,
        team_efficiency_score: 100
      },
      team_achievements: [],
      communication_preferences: {
        chat_enabled: true,
        video_calls_enabled: false,
        file_sharing_enabled: true,
        task_management_enabled: true,
        public_updates_frequency: 'weekly',
        external_platform_integration: []
      }
    };

    return {
      success: true,
      team_id: teamId,
      team: newTeam,
      message: `Team "${teamData.name}" created successfully!`
    };
  }

  // Get team competitions
  async getTeamCompetitions(): Promise<TeamCompetition[]> {
    await new Promise(resolve => setTimeout(resolve, 700));

    return [
      {
        id: 'competition_001',
        name: 'Amazon Restoration Challenge',
        description: 'Teams compete to restore the most hectares of Amazon rainforest',
        competition_type: 'impact',
        team_size_min: 3,
        team_size_max: 10,
        registration_deadline: '2024-03-15T23:59:59Z',
        start_date: '2024-04-01T00:00:00Z',
        end_date: '2024-06-30T23:59:59Z',
        participating_teams: [],
        scoring_system: {
          primary_metric: 'hectares_restored',
          weight_distribution: {
            'hectares_restored': 0.6,
            'community_engagement': 0.2,
            'innovation_score': 0.1,
            'transparency_rating': 0.1
          },
          bonus_categories: [
            {
              category: 'indigenous_partnership',
              multiplier: 1.2,
              description: 'Bonus for partnering with indigenous communities',
              max_bonus_percentage: 20
            }
          ],
          penalty_categories: [
            {
              category: 'environmental_damage',
              penalty_percentage: 0.5,
              description: 'Penalty for any documented environmental damage',
              max_penalty_percentage: 50
            }
          ],
          real_time_updates: true,
          verification_requirements: ['Monthly progress reports', 'Photo documentation', 'Third-party verification']
        },
        real_world_projects: ['Amazon Sacred Headwaters Restoration'],
        sponsor_organizations: ['World Wildlife Fund', 'Amazon Conservation Association'],
        prizes: [
          {
            rank: 1,
            prize_type: 'funding',
            prize_value: 100000,
            prize_description: '$100,000 funding for continued conservation work',
            distribution_method: 'captain_decides',
            additional_benefits: ['Documentary feature', 'Speaking opportunities'],
            publicity_opportunities: ['AEGIS annual conference keynote', 'Media interviews']
          }
        ],
        live_tracking: true,
        public_visibility: true
      }
    ];
  }

  // Claim reward
  async claimReward(rewardData: {
    type: 'achievement' | 'streak' | 'challenge' | 'level_up';
    id: string;
    reward_id?: string;
  }): Promise<{
    success: boolean;
    reward_claimed: any;
    blockchain_hash?: string;
    message: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate blockchain verification for valuable rewards
    const blockchainHash = Math.random() > 0.3 ? 
      '0xreward' + Math.random().toString(16).substring(2, 58) : 
      undefined;

    return {
      success: true,
      reward_claimed: {
        type: rewardData.type,
        claimed_date: new Date().toISOString(),
        blockchain_verified: !!blockchainHash
      },
      blockchain_hash: blockchainHash,
      message: 'Reward claimed successfully!'
    };
  }

  // Get seasonal events
  async getSeasonalEvents(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: 'event_spring_2024',
        name: 'Spring Awakening Challenge',
        description: 'Celebrate spring with tree planting and habitat restoration',
        start_date: '2024-03-01T00:00:00Z',
        end_date: '2024-05-31T23:59:59Z',
        special_rewards: ['Spring Champion Badge', '2x tree planting points'],
        activities: ['Group tree planting', 'Seed collection drives', 'Habitat monitoring'],
        global_participation: true
      }
    ];
  }

  // Subscribe to gamification updates
  subscribeToUpdates(userId: string, callback: (update: any) => void): () => void {
    // Simulate real-time gamification updates
    const interval = setInterval(() => {
      const updates = [
        {
          type: 'progress_update',
          data: { metric: 'trees_planted', value: Math.floor(Math.random() * 5) + 1 }
        },
        {
          type: 'achievement_progress',
          data: { achievement_id: 'ach_001', progress: Math.floor(Math.random() * 100) }
        },
        {
          type: 'leaderboard_change',
          data: { new_rank: Math.floor(Math.random() * 1000) + 1 }
        }
      ];

      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      callback({
        ...randomUpdate,
        timestamp: new Date().toISOString(),
        user_id: userId
      });
    }, 20000); // Update every 20 seconds

    return () => clearInterval(interval);
  }
}

export const gamificationService = new GamificationService();
