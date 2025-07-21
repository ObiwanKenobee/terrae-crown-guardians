import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Globe, 
  TreePine, 
  Heart,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  ExternalLink,
  Sparkles,
  Leaf,
  Mountain,
  Bird,
  Fish,
  Users,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const FundingRoundBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900">
      {/* Background Earth Map Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4zIi8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] bg-repeat"></div>
        
        {/* Bioregion Highlights */}
        <div className="absolute top-20 left-20 w-32 h-24 border-2 border-amber-400 rounded-lg opacity-40"></div>
        <div className="absolute top-32 right-32 w-28 h-20 border-2 border-amber-400 rounded-lg opacity-40"></div>
        <div className="absolute bottom-24 left-40 w-36 h-28 border-2 border-amber-400 rounded-lg opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-30 h-22 border-2 border-amber-400 rounded-lg opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Funding Round Badge */}
            <div className="flex justify-center mb-6">
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-4 py-2 text-lg font-semibold">
                <Sparkles className="h-5 w-5 mr-2" />
                Series A Funding Round Now Open
              </Badge>
            </div>

            {/* Main Title */}
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                {/* Crown with Leaf Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <Crown className="h-16 w-16 text-amber-400" fill="currentColor" />
                    <Leaf className="absolute top-1 right-1 h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2 tracking-wide">
                  AEGIS: Regina Terrae
                </h1>
                <div className="text-2xl md:text-3xl font-serif text-amber-200 tracking-wider">
                  Protecting Earth's Crown
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-emerald-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Join the global movement to protect and regenerate Earth's most vital bioregions through 
              cutting-edge technology, Indigenous wisdom, and transparent blockchain solutions.
            </p>
          </div>

          {/* Central Visual Elements */}
          <div className="flex justify-center items-center mb-12">
            <div className="relative">
              {/* Globe with Interconnected Elements */}
              <div className="relative flex items-center justify-center">
                <Globe className="h-24 w-24 text-blue-400" />
                
                {/* Wildlife Silhouettes moving along corridors */}
                <div className="absolute -top-8 -left-8 animate-pulse">
                  <Bird className="h-8 w-8 text-sky-300" />
                </div>
                <div className="absolute -bottom-6 -right-8 animate-pulse delay-1000">
                  <Fish className="h-8 w-8 text-cyan-300" />
                </div>
                <div className="absolute -top-6 -right-6 animate-pulse delay-500">
                  <Mountain className="h-8 w-8 text-stone-300" />
                </div>
                <div className="absolute -bottom-8 -left-6 animate-pulse delay-1500">
                  <TreePine className="h-8 w-8 text-green-300" />
                </div>
              </div>

              {/* Connection Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <path 
                    d="M 50,50 Q 100,20 150,50" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                    fill="none" 
                    opacity="0.6"
                    strokeDasharray="4,4"
                  />
                  <path 
                    d="M 50,150 Q 100,180 150,150" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                    fill="none" 
                    opacity="0.6"
                    strokeDasharray="4,4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-emerald-200 text-sm">Crown Bioregions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50M+</div>
              <div className="text-emerald-200 text-sm">Hectares Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">200+</div>
              <div className="text-emerald-200 text-sm">Indigenous Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$50M</div>
              <div className="text-emerald-200 text-sm">Target Funding</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-sans font-bold text-white mb-6">
              Join the Regeneration Movement
            </h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button 
                size="lg"
                className={`
                  bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg px-8 py-4
                  hover:from-amber-600 hover:to-orange-600 transform transition-all duration-300
                  ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-lg'}
                  border-2 border-amber-300
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                Invest in Earth's Future
                <ExternalLink className="h-5 w-5 ml-2" />
              </Button>
              
              <Link to="/join-pact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-emerald-800 text-lg px-8 py-4 font-semibold"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Become a Steward
                </Button>
              </Link>
            </div>

            {/* Secondary Actions */}
            <div className="flex justify-center gap-4 text-sm">
              <Link to="/pricing" className="text-amber-200 hover:text-amber-100 underline">
                View Investment Options
              </Link>
              <span className="text-emerald-300">•</span>
              <Link to="/about" className="text-amber-200 hover:text-amber-100 underline">
                Read Our Mission
              </Link>
              <span className="text-emerald-300">•</span>
              <Link to="/crown-bioregions" className="text-amber-200 hover:text-amber-100 underline">
                Explore Bioregions
              </Link>
            </div>
          </div>

          {/* Footer with Social Links */}
          <div className="border-t border-emerald-700 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-6 mb-4 sm:mb-0">
                <span className="text-emerald-200 text-sm">Connect with AEGIS:</span>
                <div className="flex gap-3">
                  <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-emerald-200 text-sm">aegis.earth</span>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Powered by Blockchain
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-1500"></div>
      </div>
    </div>
  );
};

export default FundingRoundBanner;
