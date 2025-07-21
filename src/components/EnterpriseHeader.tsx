import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Crown, 
  Menu, 
  X, 
  Search, 
  Globe, 
  Shield, 
  Users, 
  Award,
  BarChart3,
  Settings,
  Monitor,
  Server,
  Code,
  Database,
  MapPin,
  Scroll,
  DollarSign,
  Building2,
  Headphones,
  Scale,
  User,
  LogOut,
  Bell,
  Languages,
  ChevronDown,
  Leaf,
  Earth,
  Heart,
  Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

export function EnterpriseHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    {
      title: "Protect Earth's Crown",
      icon: Globe,
      href: "/crown-bioregions",
      submenu: [
        { title: "Crown Bioregions", href: "/crown-bioregions", icon: Globe, description: "Explore sacred ecosystems" },
        { title: "Interactive Map", href: "/crown-bioregions#map", icon: MapPin, description: "Global bioregion explorer" },
        { title: "Conservation Projects", href: "/crown-bioregions#projects", icon: Leaf, description: "Active restoration efforts" }
      ]
    },
    {
      title: "About Us",
      icon: Shield,
      href: "/about",
      submenu: [
        { title: "Our Mission", href: "/about#mission", icon: Shield, description: "Planetary regeneration vision" },
        { title: "Leadership Team", href: "/about#team", icon: Users, description: "Meet our global leaders" },
        { title: "Impact Reports", href: "/about#impact", icon: BarChart3, description: "Transparency & results" },
        { title: "Tech & Governance", href: "/about#tech", icon: Settings, description: "Ethical AI & protocols" }
      ]
    },
    {
      title: "The Kenya Accord",
      icon: Award,
      href: "/kenya-accord",
      submenu: [
        { title: "Flagship Projects", href: "/kenya-accord", icon: Award, description: "Live project updates" },
        { title: "Community Impact", href: "/kenya-accord#community", icon: Users, description: "Local partnerships" },
        { title: "Wildlife Diplomacy", href: "/diplomacy", icon: Scale, description: "AI conflict resolution" }
      ]
    },
    {
      title: "Join the Pact",
      icon: Users,
      href: "/join-pact",
      submenu: [
        { title: "Become a Steward", href: "/join-pact", icon: Users, description: "Individual conservation" },
        { title: "Corporate Partnerships", href: "/partnerships", icon: Building2, description: "Enterprise solutions" },
        { title: "Pricing Plans", href: "/pricing", icon: DollarSign, description: "Flexible memberships" },
        { title: "Community Programs", href: "/join-pact#programs", icon: Heart, description: "Youth & education" }
      ]
    },
    {
      title: "Regal Legacy Ledger",
      icon: Scroll,
      href: "/royal-legacy",
      submenu: [
        { title: "Cultural Heritage", href: "/royal-legacy", icon: Scroll, description: "Ancestral wisdom" },
        { title: "Indigenous Knowledge", href: "/royal-legacy#indigenous", icon: Users, description: "Traditional practices" },
        { title: "Blockchain Records", href: "/royal-legacy#blockchain", icon: Shield, description: "Immutable heritage" }
      ]
    },
    {
      title: "Service Index",
      icon: BarChart3,
      href: "/service-index",
      submenu: [
        { title: "Global Leaderboard", href: "/service-index", icon: BarChart3, description: "Impact rankings" },
        { title: "User Dashboard", href: "/dashboard", icon: User, description: "Personal metrics" },
        { title: "Frontend Dashboard", href: "/dashboard/frontend", icon: Monitor, description: "UI/UX monitoring" },
        { title: "Backend Dashboard", href: "/dashboard/backend", icon: Server, description: "System performance" },
        { title: "API Dashboard", href: "/dashboard/api", icon: Code, description: "API analytics" },
        { title: "Database Dashboard", href: "/dashboard/database", icon: Database, description: "Data management" },
        { title: "Impact Metrics", href: "/service-index#metrics", icon: Target, description: "Real-time data" }
      ]
    }
  ];

  const technologyNavItems = [
    { title: "Immersive Experiences", href: "/immersive", icon: Headphones, description: "VR/AR conservation" },
    { title: "AI Diplomacy", href: "/diplomacy", icon: Scale, description: "Conflict resolution" },
    { title: "Blockchain Transparency", href: "/dashboard#blockchain", icon: Shield, description: "Trust & verification" },
    { title: "Corporate Platform", href: "/partnerships", icon: Building2, description: "Enterprise solutions" }
  ];

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-green-700 group-hover:text-green-600 transition-colors" />
                <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight">
                  AEGIS
                </h1>
                <p className="text-xs text-green-600 font-medium tracking-wider uppercase hidden sm:block">
                  Regina Terrae
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {/* Full desktop navigation with all items */}
              {mainNavItems.map((item) => (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-2">
                    <DropdownMenuLabel className="flex items-center text-green-700">
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.title}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.href} asChild>
                        <Link 
                          to={subItem.href}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50 cursor-pointer"
                        >
                          <subItem.icon className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{subItem.title}</p>
                            <p className="text-sm text-gray-600">{subItem.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              {/* Technology Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">Technology</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-2">
                  <DropdownMenuLabel className="flex items-center text-purple-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Technology & Innovation
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {technologyNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link 
                        to={item.href}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer"
                      >
                        <item.icon className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Tablet Navigation - Condensed */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              {mainNavItems.slice(0, 4).map((item) => (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 px-2 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-xs font-medium">{item.title.split(' ')[0]}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72 p-2">
                    <DropdownMenuLabel className="flex items-center text-green-700">
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.title}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.href} asChild>
                        <Link
                          to={subItem.href}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-green-50 cursor-pointer"
                        >
                          <subItem.icon className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{subItem.title}</p>
                            <p className="text-xs text-gray-600">{subItem.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 px-2 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="text-xs font-medium">More</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-2">
                  <DropdownMenuLabel className="flex items-center text-purple-700">
                    <Settings className="h-4 w-4 mr-2" />
                    More Options
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mainNavItems.slice(4).map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 cursor-pointer"
                      >
                        <item.icon className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-gray-900 text-sm">{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {technologyNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                      >
                        <item.icon className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-gray-900 text-sm">{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Hidden on mobile, icon only on tablet */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-green-600"
              >
                <Search className="h-4 w-4" />
                <span className="text-sm hidden lg:inline">Search</span>
              </Button>

              {/* Language Selector - Icon only on tablet */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Languages className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Español</DropdownMenuItem>
                  <DropdownMenuItem>Français</DropdownMenuItem>
                  <DropdownMenuItem>Swahili</DropdownMenuItem>
                  <DropdownMenuItem>中文</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications - Hidden on mobile */}
              <Button variant="ghost" size="sm" className="relative hidden sm:flex">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 text-xs bg-red-500 text-white border-white flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {/* User Menu or Auth */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url} alt={user.full_name} />
                        <AvatarFallback>{user.full_name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                        <p className="text-xs text-gray-600 capitalize">{user.user_type?.replace('_', ' ')}</p>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard#impact" className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Impact Metrics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard#settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAuthModalOpen(true)}
                    className="hidden sm:flex text-xs sm:text-sm px-2 sm:px-3"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setAuthModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <span className="hidden sm:inline">Join the Pact</span>
                    <span className="sm:hidden">Join</span>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-green-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t bg-white/95 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bioregions, projects, impact reports..."
                  className="pl-10 pr-4 py-2 w-full"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t bg-white/98 backdrop-blur-lg max-h-[85vh] overflow-y-auto shadow-lg">
            <div className="px-4 pt-6 pb-8 space-y-3">
              {mainNavItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-4 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-4 flex-shrink-0" />
                    <span className="truncate font-semibold">{item.title}</span>
                  </Link>
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="flex items-start px-4 py-3 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <subItem.icon className="h-4 w-4 mr-3 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{subItem.title}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{subItem.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="space-y-1">
                  {technologyNavItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="pt-4 border-t">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      setAuthModalOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    Join the Pact
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Sticky Navigation Bar */}
      {isScrolled && (
        <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-green-50/90 backdrop-blur-lg border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <Link to="/dashboard" className="flex items-center space-x-1 text-green-700 hover:text-green-900">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/news" className="flex items-center space-x-1 text-green-700 hover:text-green-900">
                  <Bell className="h-4 w-4" />
                  <span>News & Events</span>
                </Link>
                <div className="flex items-center space-x-1 text-green-700">
                  <Earth className="h-4 w-4" />
                  <span>132K tons CO₂ offset</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700">
                  <Leaf className="h-4 w-4" />
                  <span>2.4K hectares restored</span>
                </div>
              </div>

              {/* Compact metrics for tablet */}
              <div className="hidden md:flex lg:hidden items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1 text-green-700">
                  <Earth className="h-3 w-3" />
                  <span>132K CO₂</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700">
                  <Leaf className="h-3 w-3" />
                  <span>2.4K hectares</span>
                </div>
              </div>

              {/* Mobile metrics */}
              <div className="md:hidden flex items-center space-x-2 text-xs">
                <div className="flex items-center text-green-700">
                  <Earth className="h-3 w-3 mr-1" />
                  <span>132K</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Leaf className="h-3 w-3 mr-1" />
                  <span>2.4K</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button size="sm" variant="outline" className="text-green-700 border-green-300 text-xs sm:text-sm px-2 sm:px-3">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Explore Map</span>
                  <span className="sm:hidden">Map</span>
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3">
                  <span className="hidden sm:inline">Donate Now</span>
                  <span className="sm:hidden">Donate</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Sacred bioregion landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-blue-900/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 font-serif leading-tight">
            Join the Sacred Duty to
            <span className="block text-green-300 mt-2">Regenerate Earth</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-green-100 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
            Protect Earth's Crown – Contribute to the regeneration of our planet's most sacred ecosystems through AI, blockchain, and indigenous wisdom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="sm:hidden">Explore Bioregions</span>
              <span className="hidden sm:inline">Explore the Bioregions</span>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="sm:hidden">Become Steward</span>
              <span className="hidden sm:inline">Become a Steward</span>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto hidden sm:flex">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Learn More
            </Button>
          </div>

          {/* Interactive Mini Globe */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
              </div>
            </div>
            <p className="text-white text-sm mb-2">Live Global Impact</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-green-300">89</p>
                <p className="text-xs text-green-100">Species Protected</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-blue-300">23</p>
                <p className="text-xs text-blue-100">Communities Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => setAuthModalOpen(false)}
      />
    </>
  );
}
