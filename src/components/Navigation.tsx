import { useState } from "react";
import { Crown, Menu, X, Shield, Globe, Scroll, Award, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  
  const navItems = [
    { name: "Crown Bioregions", href: "/crown-bioregions", icon: Globe },
    { name: "Kenya Accord", href: "/kenya-accord", icon: MapPin },
    { name: "Royal Legacy", href: "/royal-legacy", icon: Scroll },
    { name: "Service Index", href: "/service-index", icon: Award },
    { name: "Join the Pact", href: "/join-pact", icon: Users }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-gold" />
            <span className="font-serif text-xl font-bold text-primary">AEGIS</span>
            <span className="text-muted-foreground text-sm">Regina Terrae</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  location.pathname === item.href 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
            
            <Button 
              size="sm" 
              className="bg-gradient-royal text-primary-foreground hover:opacity-90 shadow-royal"
            >
              <Shield className="mr-2 h-4 w-4" />
              Protect Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                    location.pathname === item.href 
                      ? 'text-primary bg-muted' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              <div className="px-3 py-2">
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Protect Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;