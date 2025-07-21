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
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

interface FundingAnnouncementBannerProps {
  onClose?: () => void;
  variant?: 'full' | 'compact';
  position?: 'top' | 'bottom';
}

const FundingAnnouncementBanner = ({ 
  onClose, 
  variant = 'compact',
  position = 'top' 
}: FundingAnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  if (variant === 'compact') {
    return (
      <div className="relative w-full bg-gradient-to-r from-emerald-800 via-green-700 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Crown className="h-6 w-6 text-amber-400" fill="currentColor" />
                  <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-emerald-300" />
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Series A Open
                </Badge>
              </div>
              
              <div className="hidden sm:block">
                <span className="font-semibold">AEGIS: Regina Terrae</span>
                <span className="mx-2 opacity-60">•</span>
                <span className="text-sm">Protecting Earth's Crown Bioregions</span>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">$50M Target</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1"
              >
                <Heart className="h-3 w-3 mr-1" />
                Invest
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              
              {onClose && (
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 text-white">
      {onClose && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          {/* Header */}
          <div className="flex justify-center mb-4">
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              Series A Funding Round Now Open
            </Badge>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative mr-3">
              <Crown className="h-12 w-12 text-amber-400" fill="currentColor" />
              <Leaf className="absolute -top-1 -right-1 h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold tracking-wide">
                AEGIS: Regina Terrae
              </h1>
              <div className="text-lg text-amber-200 tracking-wider">
                Protecting Earth's Crown
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-emerald-100 max-w-3xl mx-auto mb-6 leading-relaxed">
            Join the global movement to protect and regenerate Earth's most vital bioregions through 
            cutting-edge technology, Indigenous wisdom, and transparent blockchain solutions.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">15+</div>
              <div className="text-emerald-200 text-sm">Crown Bioregions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">50M+</div>
              <div className="text-emerald-200 text-sm">Hectares Protected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">200+</div>
              <div className="text-emerald-200 text-sm">Indigenous Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">$50M</div>
              <div className="text-emerald-200 text-sm">Target Funding</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 border border-amber-300"
            >
              <Heart className="h-5 w-5 mr-2" />
              Invest in Earth's Future
              <ExternalLink className="h-5 w-5 ml-2" />
            </Button>
            
            <Link to="/join-pact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-3 font-semibold"
              >
                Become a Steward
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingAnnouncementBanner;
