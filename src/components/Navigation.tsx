import { useState } from "react";
import { Crown, Menu, X, Shield, Globe, Scroll, Award, Users, MapPin, DollarSign, User, LogOut, Settings, Building2, Headphones, Scale, BarChart3 } from "lucide-react";
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
    { name: "Pricing", href: "/pricing", icon: DollarSign },
    { name: "Partnerships", href: "/partnerships", icon: Building2 },
    { name: "Immersive", href: "/immersive", icon: Headphones },
    { name: "Diplomacy AI", href: "/diplomacy", icon: Scale },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 }
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
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-gold group-hover:scale-105 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-primary">AEGIS</span>
              <span className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Regina Terrae</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.slice(0, 6).map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 ${
                  location.pathname === item.href 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
            
            {/* More Menu for remaining items */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {navItems.slice(6).map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.href}
                      className="flex items-center space-x-2 w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
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
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="sm" onClick={handleLogin} className="text-xs sm:text-sm px-2 sm:px-3">
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleRegister}
                      className="bg-gradient-royal text-primary-foreground hover:opacity-90 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <Shield className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Join AEGIS</span>
                      <span className="sm:hidden">Join</span>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Tablet Navigation - Condensed */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {navItems.slice(0, 4).map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 ${
                  location.pathname === item.href 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{item.name.split(' ')[0]}</span>
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs font-medium">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navItems.slice(4).map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.href}
                      className="flex items-center space-x-2 w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Authentication Section for tablet */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profile_picture} alt={user.full_name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                            {getUserInitials(user.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        {!hasCompletedOnboarding && (
                          <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64" align="end">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.full_name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={handleLogin} className="text-xs px-2">
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleRegister}
                      className="bg-gradient-royal text-primary-foreground hover:opacity-90 text-xs px-2"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Join
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
              className="text-foreground p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg max-h-[80vh] overflow-y-auto">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 min-h-[48px] ${
                    location.pathname === item.href 
                      ? 'text-primary bg-primary/10 border border-primary/20' 
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-base">{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Authentication */}
              <div className="px-4 py-4 border-t border-border bg-muted/30 rounded-lg mt-4">
                {!isLoading && (
                  <>
                    {isAuthenticated && user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.profile_picture} alt={user.full_name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getUserInitials(user.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-base">{user.full_name}</div>
                            <div className="text-sm text-muted-foreground">{USER_TYPE_LABELS[user.user_type]}</div>
                          </div>
                        </div>
                        
                        {!hasCompletedOnboarding && (
                          <Button
                            size="default"
                            onClick={() => {
                              setOnboardingOpen(true);
                              setIsOpen(false);
                            }}
                            className="w-full bg-orange-500 text-white hover:bg-orange-600 min-h-[44px]"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Complete Setup
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="default"
                          onClick={handleLogout}
                          className="w-full text-red-600 border-red-200 hover:bg-red-50 min-h-[44px]"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          size="default" 
                          onClick={() => {
                            handleLogin();
                            setIsOpen(false);
                          }}
                          className="w-full min-h-[44px]"
                        >
                          Sign In
                        </Button>
                        <Button 
                          size="default" 
                          onClick={() => {
                            handleRegister();
                            setIsOpen(false);
                          }}
                          className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90 min-h-[44px]"
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
