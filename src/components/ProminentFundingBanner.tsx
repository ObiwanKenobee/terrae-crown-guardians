import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Heart,
  ExternalLink,
  Sparkles,
  Leaf,
  X,
  TrendingUp,
  Globe,
  TreePine,
  Users,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

interface ProminentFundingBannerProps {
  onClose?: () => void;
}

const ProminentFundingBanner = ({ onClose }: ProminentFundingBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 text-white border-b border-emerald-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMjAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4zIi8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] bg-repeat"></div>
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Side - Main Message */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-3">
              {/* Funding Badge */}
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1 text-sm font-semibold animate-pulse mr-4">
                <Sparkles className="h-4 w-4 mr-1" />
                Series A Funding Round Open
              </Badge>
              
              {/* Crown Logo */}
              <div className="relative">
                <Crown className="h-8 w-8 text-amber-400" fill="currentColor" />
                <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-emerald-400" />
              </div>
            </div>
            
            <div className="mb-3">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide mb-1">
                AEGIS: Regina Terrae
              </h1>
              <p className="text-amber-200 tracking-wider">
                Protecting Earth's Crown Bioregions
              </p>
            </div>
            
            <p className="text-sm text-emerald-100 max-w-2xl mx-auto lg:mx-0">
              Join the global movement to protect Earth's most vital bioregions through 
              cutting-edge technology, Indigenous wisdom, and transparent blockchain solutions.
            </p>
          </div>

          {/* Center - Key Stats */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Target className="h-4 w-4 text-amber-400 mr-1" />
                  <div className="text-lg font-bold text-amber-400">15+</div>
                </div>
                <div className="text-emerald-200 text-xs">Crown Bioregions</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Globe className="h-4 w-4 text-blue-400 mr-1" />
                  <div className="text-lg font-bold text-blue-400">50M+</div>
                </div>
                <div className="text-emerald-200 text-xs">Hectares Protected</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 text-green-400 mr-1" />
                  <div className="text-lg font-bold text-green-400">200+</div>
                </div>
                <div className="text-emerald-200 text-xs">Indigenous Partners</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-purple-400 mr-1" />
                  <div className="text-lg font-bold text-purple-400">$50M</div>
                </div>
                <div className="text-emerald-200 text-xs">Target Funding</div>
              </div>
            </div>
          </div>

          {/* Right Side - Call to Action */}
          <div className="flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 border border-amber-300 shadow-lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Invest Now
                <ExternalLink className="h-5 w-5 ml-2" />
              </Button>
              
              <Link to="/join-pact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-emerald-800 px-6 py-3 font-semibold"
                >
                  Join Movement
                </Button>
              </Link>
            </div>
            
            {/* Quick Links */}
            <div className="flex justify-center gap-3 mt-3 text-xs">
              <Link to="/pricing" className="text-amber-200 hover:text-amber-100 underline">
                Investment Options
              </Link>
              <span className="text-emerald-300">•</span>
              <Link to="/about" className="text-amber-200 hover:text-amber-100 underline">
                Our Mission
              </Link>
              <span className="text-emerald-300">•</span>
              <span className="text-emerald-200">aegis.earth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-2 left-8 w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-12 w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-2 left-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-4 right-8 w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-1500"></div>
      </div>
    </div>
  );
};

export default ProminentFundingBanner;
