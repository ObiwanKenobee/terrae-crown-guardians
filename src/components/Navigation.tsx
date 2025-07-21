import { useState } from "react";
import { Crown, Menu, X, Shield, Globe, Scroll, Award, Users, MapPin, DollarSign, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import OnboardingFlow from "@/components/OnboardingFlow";
import { USER_TYPE_LABELS } from "@/types/auth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const location = useLocation();
  const { user, isAuthenticated, logout, hasCompletedOnboarding, isLoading } = useAuth();
  
  const navItems = [
    { name: "Crown Bioregions", href: "/crown-bioregions", icon: Globe },
    { name: "Kenya Accord", href: "/kenya-accord", icon: MapPin },
    { name: "Royal Legacy", href: "/royal-legacy", icon: Scroll },
    { name: "Service Index", href: "/service-index", icon: Award },
    { name: "Join the Pact", href: "/join-pact", icon: Users },
    { name: "Pricing", href: "/pricing", icon: DollarSign }
  ];

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    
    // Check if user needs onboarding
    if (user && !hasCompletedOnboarding) {
      setOnboardingOpen(true);
    }
  };

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false);
  };

  const handleLogin = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  const handleRegister = () => {
    setAuthModalTab('register');
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getUserInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
            
            {/* Authentication Section */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.profile_picture} alt={user.full_name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getUserInitials(user.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        {!hasCompletedOnboarding && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium leading-none">{user.full_name}</p>
                            {user.verified && <Badge className="text-xs bg-green-100 text-green-800">Verified</Badge>}
                          </div>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          <Badge variant="outline" className="text-xs w-fit">
                            {USER_TYPE_LABELS[user.user_type]}
                          </Badge>
                          {!hasCompletedOnboarding && (
                            <Badge variant="destructive" className="text-xs w-fit">
                              Complete Setup Required
                            </Badge>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Impact Stats */}
                      <div className="p-2">
                        <div className="text-xs font-medium mb-2">Your Impact</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-bold text-green-700">{user.profile.contribution_stats.trees_planted}</div>
                            <div className="text-green-600">Trees</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-bold text-blue-700">{user.profile.contribution_stats.hectares_restored}</div>
                            <div className="text-blue-600">Hectares</div>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {!hasCompletedOnboarding && (
                        <>
                          <DropdownMenuItem onClick={() => setOnboardingOpen(true)} className="text-orange-600 focus:text-orange-600">
                            <Settings className="mr-2 h-4 w-4" />
                            Complete Setup
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile Settings
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleLogin}>
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleRegister}
                      className="bg-gradient-royal text-primary-foreground hover:opacity-90"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Join AEGIS
                    </Button>
                  </div>
                )}
              </>
            )}
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
              
              {/* Mobile Authentication */}
              <div className="px-3 py-2 border-t border-border">
                {!isLoading && (
                  <>
                    {isAuthenticated && user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.profile_picture} alt={user.full_name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {getUserInitials(user.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.full_name}</div>
                            <div className="text-xs text-muted-foreground">{USER_TYPE_LABELS[user.user_type]}</div>
                          </div>
                        </div>
                        
                        {!hasCompletedOnboarding && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setOnboardingOpen(true);
                              setIsOpen(false);
                            }}
                            className="w-full bg-orange-500 text-white hover:bg-orange-600"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Complete Setup
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            handleLogin();
                            setIsOpen(false);
                          }}
                          className="w-full"
                        >
                          Sign In
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            handleRegister();
                            setIsOpen(false);
                          }}
                          className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Join AEGIS
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
        onSuccess={handleAuthSuccess}
      />

      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </nav>
  );
};

export default Navigation;
