import type { 
  CorporatePartner, 
  CSRInitiative, 
  BrandCampaign, 
  CorporatePackage, 
  PartnershipProposal, 
  ImpactReport,
  CorporateEvent,
  CorporateImpactMetrics 
} from '../types/corporate';

class CorporateService {
  private partners: CorporatePartner[] = [
    {
      id: 'corp-001',
      name: 'EcoTech Global',
      type: 'tech_company',
      logo_url: '/logos/ecotech.png',
      website: 'https://ecotech-global.com',
      sustainability_score: 8.7,
      partnership_tier: 'platinum',
      partnership_start_date: new Date('2024-01-15'),
      total_investment: 2500000,
      carbon_offset_commitment: 50000,
      biodiversity_projects: ['Amazon Rainforest Protection', 'Coral Reef Restoration'],
      csr_initiatives: [],
      impact_metrics: {
        total_carbon_offset: 45000,
        biodiversity_score_improvement: 12.5,
        communities_supported: 8,
        jobs_created: 156,
        renewable_energy_mwh: 1200,
        waste_reduction_percentage: 34,
        water_conservation_liters: 2500000,
        brand_sentiment_score: 9.2,
        employee_engagement_score: 8.8,
        customer_retention_improvement: 15.3
      },
      status: 'active',
      contact_person: {
        name: 'Sarah Chen',
        email: 'sarah.chen@ecotech-global.com',
        position: 'Chief Sustainability Officer',
        phone: '+1-555-0123'
      },
      regions_of_focus: ['Americas', 'Asia-Pacific'],
      sdg_alignment: [13, 14, 15, 6, 7]
    },
    {
      id: 'corp-002',
      name: 'Luxury Earth Brands',
      type: 'eco_luxury',
      logo_url: '/logos/luxuryearth.png',
      website: 'https://luxuryearth.com',
      sustainability_score: 9.1,
      partnership_tier: 'diamond',
      partnership_start_date: new Date('2023-08-10'),
      total_investment: 5000000,
      carbon_offset_commitment: 100000,
      biodiversity_projects: ['Madagascar Lemur Conservation', 'Alpine Meadow Restoration'],
      csr_initiatives: [],
      impact_metrics: {
        total_carbon_offset: 87000,
        biodiversity_score_improvement: 18.7,
        communities_supported: 15,
        jobs_created: 234,
        renewable_energy_mwh: 2400,
        waste_reduction_percentage: 56,
        water_conservation_liters: 4200000,
        brand_sentiment_score: 9.6,
        employee_engagement_score: 9.1,
        customer_retention_improvement: 22.8
      },
      status: 'active',
      contact_person: {
        name: 'Marcus Westfield',
        email: 'marcus@luxuryearth.com',
        position: 'Director of Partnerships',
        phone: '+44-20-7123-4567'
      },
      regions_of_focus: ['Europe', 'Africa'],
      sdg_alignment: [13, 14, 15, 8, 12]
    }
  ];

  private packages: CorporatePackage[] = [
    {
      id: 'pkg-startup',
      name: 'Startup Impact',
      tier: 'startup',
      price_annual: 25000,
      features: ['Basic impact tracking', 'Quarterly reports', 'Community access'],
      max_initiatives: 2,
      dedicated_support: false,
      custom_reporting: false,
      api_access: false,
      white_label_options: false,
      priority_project_selection: false,
      sustainability_certification: false,
      employee_engagement_tools: true,
      brand_integration_support: false,
      impact_verification: 'basic',
      reporting_frequency: 'quarterly'
    },
    {
      id: 'pkg-growth',
      name: 'Growth Partnership',
      tier: 'growth',
      price_annual: 75000,
      features: ['Advanced analytics', 'Monthly reports', 'Brand integration', 'Employee programs'],
      max_initiatives: 5,
      dedicated_support: true,
      custom_reporting: true,
      api_access: false,
      white_label_options: false,
      priority_project_selection: true,
      sustainability_certification: true,
      employee_engagement_tools: true,
      brand_integration_support: true,
      impact_verification: 'advanced',
      reporting_frequency: 'monthly'
    },
    {
      id: 'pkg-enterprise',
      name: 'Enterprise Alliance',
      tier: 'enterprise',
      price_annual: 200000,
      features: ['Full platform access', 'Real-time dashboards', 'Custom campaigns', 'API integration'],
      max_initiatives: 15,
      dedicated_support: true,
      custom_reporting: true,
      api_access: true,
      white_label_options: true,
      priority_project_selection: true,
      sustainability_certification: true,
      employee_engagement_tools: true,
      brand_integration_support: true,
      impact_verification: 'premium',
      reporting_frequency: 'real_time'
    },
    {
      id: 'pkg-global',
      name: 'Global Transformation',
      tier: 'global',
      price_annual: 500000,
      features: ['Everything included', 'Dedicated team', 'Custom solutions', 'Global project access'],
      max_initiatives: -1,
      dedicated_support: true,
      custom_reporting: true,
      api_access: true,
      white_label_options: true,
      priority_project_selection: true,
      sustainability_certification: true,
      employee_engagement_tools: true,
      brand_integration_support: true,
      impact_verification: 'premium',
      reporting_frequency: 'real_time'
    }
  ];

  private proposals: PartnershipProposal[] = [
    {
      id: 'prop-001',
      company_name: 'GreenTech Innovations',
      contact_email: 'partnerships@greentech.com',
      company_size: 'large_corp',
      industry: 'Technology',
      sustainability_goals: ['Carbon neutrality by 2030', 'Biodiversity net positive'],
      proposed_investment: 1000000,
      preferred_partnership_type: 'Strategic Alliance',
      timeline: '12 months',
      additional_requirements: 'Focus on technological solutions',
      status: 'under_review',
      submitted_date: new Date('2024-12-01'),
      assigned_account_manager: 'Sarah Johnson'
    }
  ];

  async getPartners(): Promise<CorporatePartner[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.partners), 500);
    });
  }

  async getPartner(id: string): Promise<CorporatePartner | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const partner = this.partners.find(p => p.id === id);
        resolve(partner || null);
      }, 300);
    });
  }

  async getPackages(): Promise<CorporatePackage[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.packages), 400);
    });
  }

  async submitProposal(proposal: Omit<PartnershipProposal, 'id' | 'status' | 'submitted_date'>): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newProposal: PartnershipProposal = {
          ...proposal,
          id: `prop-${Date.now()}`,
          status: 'submitted',
          submitted_date: new Date()
        };
        this.proposals.push(newProposal);
        resolve(newProposal.id);
      }, 800);
    });
  }

  async getProposals(): Promise<PartnershipProposal[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.proposals), 400);
    });
  }

  async createCSRInitiative(partnerId: string, initiative: Omit<CSRInitiative, 'id'>): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newInitiative: CSRInitiative = {
          ...initiative,
          id: `csr-${Date.now()}`
        };
        
        const partner = this.partners.find(p => p.id === partnerId);
        if (partner) {
          partner.csr_initiatives.push(newInitiative);
        }
        
        resolve(newInitiative.id);
      }, 600);
    });
  }

  async getPartnershipStats(): Promise<{
    total_partners: number;
    total_investment: number;
    total_carbon_offset: number;
    active_initiatives: number;
    pending_proposals: number;
  }> {
    return new Promise(resolve => {
      setTimeout(() => {
        const stats = {
          total_partners: this.partners.filter(p => p.status === 'active').length,
          total_investment: this.partners.reduce((sum, p) => sum + p.total_investment, 0),
          total_carbon_offset: this.partners.reduce((sum, p) => sum + p.impact_metrics.total_carbon_offset, 0),
          active_initiatives: this.partners.reduce((sum, p) => sum + p.csr_initiatives.filter(i => i.status === 'active').length, 0),
          pending_proposals: this.proposals.filter(p => p.status === 'submitted' || p.status === 'under_review').length
        };
        resolve(stats);
      }, 400);
    });
  }

  async generateImpactReport(partnerId: string, startDate: Date, endDate: Date): Promise<ImpactReport> {
    return new Promise(resolve => {
      setTimeout(() => {
        const partner = this.partners.find(p => p.id === partnerId);
        if (!partner) throw new Error('Partner not found');

        const report: ImpactReport = {
          id: `report-${partnerId}-${Date.now()}`,
          partner_id: partnerId,
          reporting_period: { start: startDate, end: endDate },
          metrics: partner.impact_metrics,
          initiatives_summary: {
            total_initiatives: partner.csr_initiatives.length,
            completed_initiatives: partner.csr_initiatives.filter(i => i.status === 'completed').length,
            active_initiatives: partner.csr_initiatives.filter(i => i.status === 'active').length,
            planned_initiatives: partner.csr_initiatives.filter(i => i.status === 'planning').length
          },
          financial_summary: {
            total_investment: partner.total_investment,
            cost_per_ton_co2: partner.total_investment / partner.impact_metrics.total_carbon_offset,
            cost_per_hectare_protected: partner.total_investment / 1000,
            roi_brand_value: partner.impact_metrics.brand_sentiment_score * 100000
          },
          storytelling_assets: {
            success_stories: [
              'Reduced operational carbon footprint by 45%',
              'Protected 1,200 hectares of critical habitat',
              'Engaged 5,000+ employees in sustainability programs'
            ],
            before_after_photos: ['/reports/before1.jpg', '/reports/after1.jpg'],
            community_testimonials: [
              'This partnership has transformed our local economy while protecting our natural heritage.',
              'The employment opportunities created have been life-changing for our community.'
            ],
            video_content: ['/reports/impact-video.mp4', '/reports/community-story.mp4']
          },
          certification_progress: {
            certifications_achieved: ['B-Corp', 'Carbon Neutral'],
            certifications_in_progress: ['Science Based Targets'],
            next_certification_targets: ['Net Zero', 'Nature Positive']
          },
          generated_date: new Date(),
          approved_by: 'Regina Terrae Impact Team',
          shared_publicly: true
        };

        resolve(report);
      }, 1000);
    });
  }

  async createBrandCampaign(campaign: Omit<BrandCampaign, 'id'>): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newCampaign: BrandCampaign = {
          ...campaign,
          id: `campaign-${Date.now()}`
        };
        resolve(newCampaign.id);
      }, 600);
    });
  }

  async getUpcomingEvents(): Promise<CorporateEvent[]> {
    const mockEvents: CorporateEvent[] = [
      {
        id: 'event-001',
        title: 'Sustainability Leadership Summit 2024',
        type: 'conference',
        description: 'Annual gathering of corporate sustainability leaders and conservation experts',
        date: new Date('2024-12-20'),
        duration_hours: 8,
        location: {
          type: 'hybrid',
          address: 'Nairobi Convention Centre, Kenya',
          coordinates: { lat: -1.2921, lng: 36.8219 },
          platform_link: 'https://zoom.us/summit2024'
        },
        target_audience: ['partners', 'prospects', 'stakeholders'],
        max_attendees: 500,
        registration_required: true,
        cost_per_attendee: 0,
        agenda: [
          { time: '09:00', activity: 'Opening Keynote: The Future of Corporate Conservation', speaker: 'Dr. Regina Thompson', duration_minutes: 60 },
          { time: '10:30', activity: 'Panel: Technology & Biodiversity', speaker: 'Industry Leaders', duration_minutes: 90 },
          { time: '14:00', activity: 'Workshop: Measuring Impact at Scale', speaker: 'AEGIS Team', duration_minutes: 120 }
        ],
        speakers: [
          {
            name: 'Dr. Regina Thompson',
            title: 'Founder & CEO',
            company: 'AEGIS: Regina Terrae',
            bio: 'Leading conservation technologist with 15+ years experience',
            photo_url: '/speakers/regina.jpg'
          }
        ],
        sponsors: ['EcoTech Global', 'Luxury Earth Brands'],
        materials: {
          presentation_slides: ['/materials/keynote.pdf', '/materials/panel.pdf'],
          handouts: ['/materials/impact-guide.pdf'],
          resources: ['/materials/partnership-toolkit.pdf']
        },
        registration_link: 'https://regina-terrae.com/summit2024',
        status: 'open_registration'
      }
    ];

    return new Promise(resolve => {
      setTimeout(() => resolve(mockEvents), 400);
    });
  }
}

export const corporateService = new CorporateService();
