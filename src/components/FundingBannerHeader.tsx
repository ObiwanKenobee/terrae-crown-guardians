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
  Shield,
  Zap,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

interface FundingBannerHeaderProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

const FundingBannerHeader = ({ onClose, showCloseButton = true }: FundingBannerHeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 shadow-2xl border-b border-emerald-600"
         style={{ backdropFilter: 'blur(10px)' }}>
      {/* Close Button */}
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Background Earth Map Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4zIi8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] bg-repeat"></div>
        
        {/* Bioregion Highlights */}
        <div className="absolute top-8 left-16 w-20 h-16 border border-amber-400 rounded-lg opacity-40"></div>
        <div className="absolute top-12 right-20 w-18 h-12 border border-amber-400 rounded-lg opacity-40"></div>
        <div className="absolute bottom-8 left-24 w-24 h-18 border border-amber-400 rounded-lg opacity-40"></div>
        <div className="absolute bottom-6 right-16 w-20 h-14 border border-amber-400 rounded-lg opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Main Message */}
            <div className="text-center lg:text-left">
              {/* Funding Round Badge */}
              <div className="flex justify-center lg:justify-start mb-4">
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Series A Funding Round
                </Badge>
              </div>

              {/* Title */}
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="relative mr-3">
                  <Crown className="h-10 w-10 text-amber-400" fill="currentColor" />
                  <Leaf className="absolute -top-1 -right-1 h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                    AEGIS: Regina Terrae
                  </h1>
                  <div className="text-lg text-amber-200 tracking-wider">
                    Protecting Earth's Crown
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-emerald-100 mb-6 leading-relaxed">
                Join the global movement to protect Earth's most vital bioregions through 
                cutting-edge technology and Indigenous wisdom.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button 
                  size="sm"
                  className={`
                    bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2
                    hover:from-amber-600 hover:to-orange-600 transform transition-all duration-300
                    ${isHovered ? 'scale-105 shadow-xl' : 'shadow-md'}
                    border border-amber-300
                  `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Invest Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                
                <Link to="/join-pact">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-emerald-800 px-6 py-2 font-semibold"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Join Movement
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Visual Elements & Stats */}
            <div className="text-center">
              {/* Central Globe Visual */}
              <div className="flex justify-center items-center mb-6">
                <div className="relative">
                  <Globe className="h-16 w-16 text-blue-400" />
                  
                  {/* Wildlife Silhouettes */}
                  <div className="absolute -top-4 -left-4 animate-pulse">
                    <Bird className="h-5 w-5 text-sky-300" />
                  </div>
                  <div className="absolute -bottom-3 -right-4 animate-pulse delay-1000">
                    <Fish className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="absolute -top-3 -right-3 animate-pulse delay-500">
                    <Mountain className="h-5 w-5 text-stone-300" />
                  </div>
                  <div className="absolute -bottom-4 -left-3 animate-pulse delay-1500">
                    <TreePine className="h-5 w-5 text-green-300" />
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400 mb-1">15+</div>
                  <div className="text-emerald-200 text-xs">Crown Bioregions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">50M+</div>
                  <div className="text-emerald-200 text-xs">Hectares Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">200+</div>
                  <div className="text-emerald-200 text-xs">Indigenous Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">$50M</div>
                  <div className="text-emerald-200 text-xs">Target Funding</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-4">
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 pt-4 border-t border-emerald-700">
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link to="/pricing" className="text-amber-200 hover:text-amber-100 underline">
                Investment Options
              </Link>
              <span className="text-emerald-300">•</span>
              <Link to="/about" className="text-amber-200 hover:text-amber-100 underline">
                Our Mission
              </Link>
              <span className="text-emerald-300">•</span>
              <Link to="/crown-bioregions" className="text-amber-200 hover:text-amber-100 underline">
                Explore Bioregions
              </Link>
              <span className="text-emerald-300">•</span>
              <span className="text-emerald-200">aegis.earth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-8 w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-12 w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-4 right-8 w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-1500"></div>
      </div>
    </div>
  );
};

export default FundingBannerHeader;
