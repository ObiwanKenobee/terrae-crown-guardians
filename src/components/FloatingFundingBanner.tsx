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
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";

interface FloatingFundingBannerProps {
  onClose?: () => void;
  position?: 'top' | 'bottom';
  floating?: boolean;
}

const FloatingFundingBanner = ({
  onClose,
  position = 'top',
  floating = true
}: FloatingFundingBannerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const positionClasses = floating ? (
    position === 'top'
      ? "fixed top-0 left-0 right-0 z-50"
      : "fixed bottom-0 left-0 right-0 z-50"
  ) : "relative w-full";

  return (
    <div className={`${positionClasses} transition-all duration-300 ease-in-out`}>
      {/* Compact Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-amber-800 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side - Main Message */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Crown className="h-6 w-6 text-amber-400" fill="currentColor" />
                  <Leaf className="absolute -top-1 -right-1 h-3 w-3 text-emerald-300" />
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs font-semibold">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Series A Open
                </Badge>
              </div>
              
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-semibold text-sm">AEGIS: Regina Terrae</span>
                <span className="text-xs opacity-60">•</span>
                <span className="text-xs">Protecting Earth's Crown Bioregions</span>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">$50M Target</span>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-4 py-2 font-semibold"
              >
                <Heart className="h-3 w-3 mr-1" />
                Invest Now
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-white/10 rounded text-emerald-200 hover:text-white transition-colors"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {onClose && (
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/10 rounded text-emerald-200 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="bg-gradient-to-br from-emerald-900 via-green-800 to-amber-900 text-white border-t border-emerald-600">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left - Details */}
              <div>
                <h3 className="text-xl font-serif font-bold mb-2 text-amber-200">
                  Join the Regenerative Revolution
                </h3>
                <p className="text-sm text-emerald-100 mb-4">
                  Invest in cutting-edge technology and Indigenous wisdom to protect 
                  Earth's most vital bioregions through transparent blockchain solutions.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Link to="/join-pact">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-emerald-800 text-xs px-3 py-2"
                    >
                      Become a Steward
                    </Button>
                  </Link>
                  <Link to="/pricing" className="text-amber-200 hover:text-amber-100 underline text-xs flex items-center">
                    View Investment Options
                  </Link>
                </div>
              </div>

              {/* Right - Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-400">15+</div>
                  <div className="text-emerald-200 text-xs">Crown Bioregions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">50M+</div>
                  <div className="text-emerald-200 text-xs">Hectares Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">200+</div>
                  <div className="text-emerald-200 text-xs">Indigenous Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">$50M</div>
                  <div className="text-emerald-200 text-xs">Target Funding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingFundingBanner;
