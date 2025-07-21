import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

interface FloatingFundingCardProps {
  onClose?: () => void;
}

const FloatingFundingCard = ({ onClose }: FloatingFundingCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    // Auto-minimize on smaller screens after 5 seconds
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs sm:max-w-sm"
           style={{ maxWidth: 'calc(100vw - 2rem)' }}>
        <Card className="bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 text-white border-emerald-600 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-amber-400" fill="currentColor" />
                <div>
                  <div className="text-sm font-semibold">AEGIS Funding</div>
                  <div className="text-xs text-amber-200">Series A Open</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={toggleMinimize}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0l-7 7m7-7v18" />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed top-4 sm:top-20 right-4 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
         style={{
           maxWidth: 'calc(100vw - 2rem)',
           width: window.innerWidth < 640 ? 'calc(100vw - 2rem)' : 'auto'
         }}>
      <Card className="bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 text-white border-emerald-600 shadow-2xl transform transition-all duration-300 hover:scale-105">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMjAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4zIi8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] bg-repeat"></div>
        </div>

        {/* Controls */}
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          <button
            onClick={toggleMinimize}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0l-7 7m7-7v18" />
            </svg>
          </button>
          {onClose && (
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <CardContent className="p-4 sm:p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1 text-sm font-semibold animate-pulse mr-3">
              <Sparkles className="h-4 w-4 mr-1" />
              Series A Open
            </Badge>
            <div className="relative">
              <Crown className="h-8 w-8 text-amber-400" fill="currentColor" />
              <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-emerald-400" />
            </div>
          </div>
          
          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mb-1">
              AEGIS: Regina Terrae
            </h1>
            <p className="text-amber-200 text-sm tracking-wider">
              Protecting Earth's Crown Bioregions
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-3 w-3 text-amber-400 mr-1" />
                <div className="text-sm sm:text-base font-bold text-amber-400">15+</div>
              </div>
              <div className="text-emerald-200 text-xs">Bioregions</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Globe className="h-3 w-3 text-blue-400 mr-1" />
                <div className="text-sm sm:text-base font-bold text-blue-400">50M+</div>
              </div>
              <div className="text-emerald-200 text-xs">Hectares</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-3 w-3 text-green-400 mr-1" />
                <div className="text-sm sm:text-base font-bold text-green-400">200+</div>
              </div>
              <div className="text-emerald-200 text-xs">Partners</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-3 w-3 text-purple-400 mr-1" />
                <div className="text-sm sm:text-base font-bold text-purple-400">$50M</div>
              </div>
              <div className="text-emerald-200 text-xs">Target</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-emerald-100 text-center mb-4">
            Join the global movement to protect Earth's most vital bioregions through 
            cutting-edge technology and transparent blockchain solutions.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button 
              size="sm"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 border border-amber-300 shadow-lg text-xs sm:text-sm"
            >
              <Heart className="h-4 w-4 mr-2" />
              Invest Now
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            
            <Link to="/join-pact" className="w-full">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-white text-white hover:bg-white hover:text-emerald-800 font-semibold text-xs sm:text-sm"
              >
                Join Movement
              </Button>
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="flex justify-center gap-2 mt-3 text-xs">
            <Link to="/pricing" className="text-amber-200 hover:text-amber-100 underline">
              Options
            </Link>
            <span className="text-emerald-300">•</span>
            <Link to="/about" className="text-amber-200 hover:text-amber-100 underline">
              Mission
            </Link>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-200">aegis.earth</span>
          </div>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute top-2 left-4 w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-8 w-1 h-1 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-2 left-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-1500"></div>
        </div>
      </Card>
    </div>
  );
};

export default FloatingFundingCard;
