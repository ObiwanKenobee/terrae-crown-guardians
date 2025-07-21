import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { 
  Shield, 
  Users, 
  Globe, 
  Award, 
  BarChart3, 
  Settings, 
  Heart, 
  Leaf, 
  Crown,
  Target,
  Zap,
  BookOpen,
  ExternalLink,
  Download,
  CheckCircle,
  Star,
  Lightbulb,
  TreePine,
  Fish,
  Mountain,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Regina Thompson",
      role: "Founder & CEO",
      expertise: "Conservation Technology & AI Ethics",
      bio: "Leading conservation technologist with 15+ years developing ethical AI solutions for environmental challenges.",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "Marcus Kenia",
      role: "Chief Technology Officer",
      expertise: "Blockchain & Distributed Systems",
      bio: "Former NASA engineer specializing in decentralized systems for environmental monitoring and transparency.",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Amara Ochieng",
      role: "Head of Indigenous Partnerships",
      expertise: "Cultural Anthropology & Community Governance",
      bio: "Maasai scholar and advocate bridging traditional knowledge with modern conservation technology.",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "Sarah Chen",
      role: "VP of Corporate Partnerships",
      expertise: "Sustainable Finance & ESG Strategy",
      bio: "Former Goldman Sachs sustainability expert driving corporate environmental accountability.",
      avatar: "/api/placeholder/150/150"
    }
  ];

  const milestones = [
    { year: "2024", title: "Platform Launch", description: "AEGIS: Regina Terrae officially launches with Kenya Accord" },
    { year: "2024 Q2", title: "First Bioregions Protected", description: "Successfully protected 2,400 hectares across 5 bioregions" },
    { year: "2024 Q3", title: "AI Diplomacy Beta", description: "Wildlife conflict resolution AI tested with 89% success rate" },
    { year: "2024 Q4", title: "Corporate Partnerships", description: "Major partnerships with Fortune 500 companies established" },
    { year: "2025 Q1", title: "Global Expansion", description: "Platform expansion to 10 new countries planned" }
  ];

  const impactStats = [
    { label: 'Bioregions Protected', value: '23', icon: Globe, color: 'text-blue-600' },
    { label: 'Species Safeguarded', value: '89', icon: Fish, color: 'text-green-600' },
    { label: 'Communities Served', value: '156', icon: Users, color: 'text-purple-600' },
    { label: 'Hectares Restored', value: '2.4K', icon: Mountain, color: 'text-orange-600' },
    { label: 'Trees Planted', value: '890K', icon: TreePine, color: 'text-green-500' },
    { label: 'CO₂ Offset (tons)', value: '132K', icon: Leaf, color: 'text-green-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-16 w-16 text-green-600 mr-4" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">
                About AEGIS: Regina Terrae
              </h1>
              <p className="text-xl text-green-600 font-medium tracking-wider uppercase">
                Protector of Earth's Crown
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are pioneering the future of conservation through ethical AI, blockchain transparency, 
            and indigenous wisdom. Our mission is to protect Earth's most sacred bioregions while 
            empowering communities and driving sustainable innovation.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-l-4 border-l-green-500">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To regenerate Earth's sacred bioregions through cutting-edge technology, 
                indigenous wisdom, and global collaboration, ensuring a thriving planet for future generations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-l-4 border-l-blue-500">
            <CardHeader>
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A world where technology serves nature, where indigenous knowledge guides innovation, 
                and where every bioregion is protected by a global community of stewards.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-l-4 border-l-purple-500">
            <CardHeader>
              <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Indigenous Wisdom First</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Radical Transparency</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Ethical Innovation</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Community Empowerment</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Impact Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Global Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-purple-600 mb-3">{member.expertise}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology & Innovation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Technology & Governance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-6 w-6 mr-2 text-yellow-500" />
                  Ethical AI Framework
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our AI systems are designed with indigenous wisdom and cultural sensitivity at their core. 
                  Every algorithm is transparent, auditable, and designed to empower rather than replace human decision-making.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Cultural Sensitivity Score</span>
                    <span className="font-semibold">9.4/10</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Transparency Level</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Community Approval</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read AI Ethics Charter
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-blue-500" />
                  Blockchain Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Every conservation action, donation, and impact metric is permanently recorded on blockchain 
                  for complete transparency and accountability to our global community.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Total Transactions</span>
                    <Badge className="bg-green-600">45,892</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Verification Rate</span>
                    <Badge className="bg-blue-600">99.8%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">Public Audits</span>
                    <Badge className="bg-purple-600">Monthly</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explore Blockchain Ledger
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <Card className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-green-600 text-white mr-3">{milestone.year}</Badge>
                        <h3 className="font-bold text-lg">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Source & Community */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Open Source & Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Open Innovation</h3>
                <p className="text-gray-600 mb-4">
                  Our core algorithms and conservation models are open source, enabling global collaboration and innovation.
                </p>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub Repository
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Developer Community</h3>
                <p className="text-gray-600 mb-4">
                  Join 2,000+ developers worldwide building the future of conservation technology.
                </p>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3">Recognition</h3>
                <p className="text-gray-600 mb-4">
                  Awarded Best Conservation Innovation 2024 by the UN Environmental Programme.
                </p>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  View Awards
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Together, we can protect Earth's sacred bioregions and build a sustainable future for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/join-pact">
                  <Users className="h-5 w-5 mr-2" />
                  Become a Steward
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" asChild>
                <Link to="/partnerships">
                  <Building2 className="h-5 w-5 mr-2" />
                  Partner With Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Download className="h-5 w-5 mr-2" />
                Download Impact Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
