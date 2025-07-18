import { Crown, Shield, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-crown-bioregion.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Crown Bioregion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8 flex justify-center">
          <Crown className="w-16 h-16 text-gold animate-pulse" />
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
          AEGIS: Regina Terrae
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-light">
          The Crown of the Earth
        </p>
        
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          A visionary regenerative governance platform protecting Earth's most sacred biocultural zones 
          through ethical AI, indigenous wisdom, and planetary diplomacy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold px-8 py-6 text-lg shadow-royal"
          >
            <Shield className="mr-2 h-5 w-5" />
            Protect Earth's Crown
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg"
          >
            <Globe className="mr-2 h-5 w-5" />
            Explore Bioregions
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-3xl font-bold text-gold mb-2">100</div>
            <div className="text-primary-foreground/80">Sacred Bioregions</div>
          </div>
          
          <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-3xl font-bold text-gold mb-2">∞</div>
            <div className="text-primary-foreground/80">Indigenous Wisdom</div>
          </div>
          
          <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-3xl font-bold text-gold mb-2">1</div>
            <div className="text-primary-foreground/80">Living Earth</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Heart className="w-6 h-6 text-gold" />
      </div>
    </section>
  );
};

export default Hero;