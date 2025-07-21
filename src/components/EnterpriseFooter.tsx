import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Globe, 
  Shield, 
  Users, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Leaf,
  Heart,
  TreePine,
  Fish,
  Mountain,
  Download,
  ExternalLink,
  ChevronRight,
  Earth,
  Zap,
  Star,
  TrendingUp,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { useToast } from '../hooks/use-toast';

export function EnterpriseFooter() {
  const [email, setEmail] = useState('');
  const [impactData, setImpactData] = useState({
    landRehabilitiated: 2400,
    treesPlanted: 890000,
    speciesProtected: 89,
    youthInitiatives: 156,
    culturalWisdomSaved: 45
  });
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed successfully!",
        description: "You'll receive updates about our conservation efforts.",
      });
      setEmail('');
    }
  };

  const impactStats = [
    { label: 'Land Rehabilitated', value: `${impactData.landRehabilitiated}K hectares`, icon: Mountain, color: 'text-green-600' },
    { label: 'Trees Planted', value: `${(impactData.treesPlanted / 1000).toFixed(0)}K`, icon: TreePine, color: 'text-green-500' },
    { label: 'Species Protected', value: impactData.speciesProtected.toString(), icon: Fish, color: 'text-blue-600' },
    { label: 'Youth Initiatives', value: impactData.youthInitiatives.toString(), icon: Users, color: 'text-purple-600' },
    { label: 'Cultural Heritage Sites', value: impactData.culturalWisdomSaved.toString(), icon: Crown, color: 'text-amber-600' }
  ];

  const quickLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'The Kenya Accord', href: '/kenya-accord' },
    { title: 'Crown Bioregions', href: '/crown-bioregions' },
    { title: 'Join the Pact', href: '/join-pact' },
    { title: 'Regal Legacy Ledger', href: '/royal-legacy' },
    { title: 'Service Index', href: '/service-index' },
    { title: 'Technology Platform', href: '/partnerships' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'FAQ', href: '/faq' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/aegisreginaterrae', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/protectearthscrown', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/regenerateearth', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/aegis-regina-terrae', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/aegisreginaterrae', label: 'YouTube' }
  ];

  const testimonials = [
    {
      quote: "AEGIS has transformed how our community approaches conservation. We now have the tools to protect our sacred lands while honoring our ancestors.",
      author: "Maria Kenia",
      role: "Indigenous Leader, Kenya",
      avatar: "/api/placeholder/64/64"
    },
    {
      quote: "The AI diplomacy platform helped resolve a 5-year conflict between our farming community and local wildlife. Incredible technology with heart.",
      author: "Dr. James Mutua",
      role: "Conservation Biologist",
      avatar: "/api/placeholder/64/64"
    },
    {
      quote: "As a corporate partner, AEGIS provides transparency and real impact measurement that our stakeholders value immensely.",
      author: "Sarah Chen",
      role: "CSO, EcoTech Global",
      avatar: "/api/placeholder/64/64"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-12 w-12 text-green-400 mr-4" />
            <div>
              <h2 className="text-3xl font-bold font-serif">AEGIS: Regina Terrae</h2>
              <p className="text-green-300 text-sm tracking-wider uppercase">Protector of Earth's Crown</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are committed to regenerating the Earth's sacred bioregions through AI, blockchain, and indigenous wisdom. 
            Together, we protect our planet's most vital ecosystems for future generations.
          </p>
          <Link to="/about" className="inline-flex items-center mt-4 text-green-400 hover:text-green-300 transition-colors">
            Learn more about our mission
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>

        {/* Global Impact & Service Index */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 mr-2 text-green-400" />
            Live Global Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive World Map Preview */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                Global Conservation Projects
              </h4>
              <Link to="/crown-bioregions" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                View Full Map
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Africa Projects</span>
                  <Badge className="bg-green-600">23 Active</Badge>
                </div>
                <Progress value={78} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Americas Projects</span>
                  <Badge className="bg-blue-600">18 Active</Badge>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Asia-Pacific Projects</span>
                  <Badge className="bg-purple-600">31 Active</Badge>
                </div>
                <Progress value={84} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Europe Projects</span>
                  <Badge className="bg-amber-600">12 Active</Badge>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Earth className="h-12 w-12 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-green-400" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">Global Toll-Free</p>
                  <p className="text-gray-300 text-sm">+1-800-AEGIS-00</p>
                  <p className="text-gray-300 text-sm">+254-20-REGINA</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-gray-300 text-sm">support@aegisearth.com</p>
                  <p className="text-gray-300 text-sm">partnerships@aegisearth.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-gray-300 text-sm">Nairobi, Kenya</p>
                  <p className="text-gray-300 text-sm">Silicon Valley, USA</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Our Journey</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <p>#ProtectEarthsCrown</p>
                <p>#RegenerateEarth</p>
                <p>#StewardshipInAction</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-green-400" />
              Quick Links
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-300 hover:text-green-400 transition-colors py-1 text-sm flex items-center group"
                >
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Join the Movement */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-400" />
              Join the Movement
            </h3>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-lg mb-3">Become part of the solution</h4>
              <p className="text-gray-300 text-sm mb-6">
                Subscribe for updates on conservation breakthroughs, community events, and ways to make an impact.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Subscribe
                  </Button>
                </div>
              </form>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Become a Steward
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate Now
                </Button>
              </div>
            </div>

            {/* Micro-donation Options */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-green-400/30 text-green-400 hover:bg-green-400/10 text-sm">
                $5 Plant Tree
              </Button>
              <Button variant="outline" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 text-sm">
                $25 Protect Acre
              </Button>
              <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10 text-sm">
                $100 Save Species
              </Button>
            </div>
          </div>
        </div>

        {/* Community & Cultural Connection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 mr-2 text-purple-400" />
            Voices from Our Community
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-white">{testimonial.author}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology & Legal Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              Technology & Innovation
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Our platform leverages cutting-edge AI, blockchain technology, and indigenous wisdom to create 
              transparent, effective conservation solutions.
            </p>
            <div className="space-y-3">
              <Link to="/partnerships#tech" className="flex items-center text-green-400 hover:text-green-300 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Ethical AI & Governance
              </Link>
              <Link to="/about#opensource" className="flex items-center text-blue-400 hover:text-blue-300 text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open-Source Components
              </Link>
              <Link to="/partnerships" className="flex items-center text-purple-400 hover:text-purple-300 text-sm">
                <Users className="h-4 w-4 mr-2" />
                Developer Community
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-400" />
              Legal & Transparency
            </h3>
            <div className="space-y-3">
              <Link to="/privacy" className="flex items-center text-gray-300 hover:text-white text-sm">
                <ChevronRight className="h-3 w-3 mr-2" />
                Privacy Policy & Data Protection
              </Link>
              <Link to="/terms" className="flex items-center text-gray-300 hover:text-white text-sm">
                <ChevronRight className="h-3 w-3 mr-2" />
                Terms & Conditions
              </Link>
              <Link to="/ethics" className="flex items-center text-gray-300 hover:text-white text-sm">
                <ChevronRight className="h-3 w-3 mr-2" />
                Ethical AI Transparency
              </Link>
              <Button variant="outline" className="border-green-400/30 text-green-400 hover:bg-green-400/10 text-sm mt-4">
                <Download className="h-4 w-4 mr-2" />
                Download Impact Report 2024
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Crown className="h-6 w-6 text-green-400 mr-2" />
              <p className="text-gray-400 text-sm">
                © 2024 AEGIS: Regina Terrae. All rights reserved. | Protecting Earth's Crown since 2024
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Badge className="bg-green-600/20 text-green-400 border-green-400/30">
                <Leaf className="h-3 w-3 mr-1" />
                Carbon Neutral Platform
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/30">
                <Shield className="h-3 w-3 mr-1" />
                Blockchain Verified
              </Badge>
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-400/30">
                <Users className="h-3 w-3 mr-1" />
                Community Governed
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Live Support</span>
        </Button>
      </div>
    </footer>
  );
}
