import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Mail, 
  Lock, 
  User,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Crown,
  Globe,
  Fingerprint,
  Smartphone,
  Chrome,
  Facebook,
  Twitter,
  Apple,
  Github
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { LoginCredentials, RegisterData, MFAVerification, UserType, Language, USER_TYPE_LABELS, LANGUAGE_OPTIONS } from "@/types/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onSuccess?: () => void;
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login', onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [mfaSessionId, setMfaSessionId] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'auth' | 'mfa' | 'user_type'>('auth');
  
  // Login form state
  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember_me: false
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    full_name: '',
    user_type: 'individual_steward',
    language: 'en',
    terms_accepted: false,
    privacy_accepted: false
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  
  // MFA state
  const [mfaData, setMfaData] = useState<MFAVerification>({
    method: 'sms',
    code: ''
  });

  const { login, register, verifyMFA, socialLogin, blockchainLogin, sendMFACode, isLoading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      if (!loginData.email || !loginData.password) {
        toast({
          title: "Missing Information",
          description: "Please enter both email and password",
          variant: "destructive"
        });
        return;
      }

      const response = await login(loginData);
      
      if (response.success && !response.requires_mfa) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in."
        });
        onSuccess?.();
        onClose();
      } else if (response.requires_mfa) {
        setRequiresMFA(true);
        setMfaSessionId(response.session_id || '');
        setCurrentStep('mfa');
        toast({
          title: "Verification Required",
          description: "Please complete multi-factor authentication."
        });
      } else {
        toast({
          title: "Login Failed",
          description: response.error_message || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async () => {
    try {
      if (!registerData.email || !registerData.password || !registerData.full_name) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      if (registerData.password !== confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match",
          variant: "destructive"
        });
        return;
      }

      if (!registerData.terms_accepted || !registerData.privacy_accepted) {
        toast({
          title: "Terms Required",
          description: "Please accept the terms and privacy policy",
          variant: "destructive"
        });
        return;
      }

      const response = await register(registerData);
      
      if (response.success) {
        if (response.requires_verification) {
          toast({
            title: "Registration Successful",
            description: "Please check your email for verification instructions.",
          });
        } else {
          toast({
            title: "Welcome to AEGIS!",
            description: "Your account has been created successfully."
          });
        }
        onSuccess?.();
        onClose();
      } else {
        toast({
          title: "Registration Failed",
          description: response.error_message || "Registration failed",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleMFAVerification = async () => {
    try {
      if (!mfaData.code && mfaData.method !== 'biometric') {
        toast({
          title: "Verification Code Required",
          description: "Please enter the verification code",
          variant: "destructive"
        });
        return;
      }

      const response = await verifyMFA(mfaData, mfaSessionId);
      
      if (response.success) {
        toast({
          title: "Verification Successful",
          description: "Welcome to AEGIS!"
        });
        onSuccess?.();
        onClose();
      } else {
        toast({
          title: "Verification Failed",
          description: response.error_message || "Invalid verification code",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Verification failed",
        variant: "destructive"
      });
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const response = await socialLogin(provider);
      
      if (response.success) {
        toast({
          title: "Login Successful",
          description: `Welcome! You've been logged in with ${provider}.`
        });
        onSuccess?.();
        onClose();
      } else {
        toast({
          title: "Login Failed",
          description: response.error_message || `${provider} login failed`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${provider} login failed`,
        variant: "destructive"
      });
    }
  };

  const handleSendMFACode = async () => {
    try {
      const contact = mfaData.method === 'sms' ? loginData.email : loginData.email; // In real app, get phone number
      const response = await sendMFACode(mfaData.method, contact);
      
      if (response.success) {
        toast({
          title: "Code Sent",
          description: response.message
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code",
        variant: "destructive"
      });
    }
  };

  const resetModal = () => {
    setCurrentStep('auth');
    setRequiresMFA(false);
    setMfaSessionId('');
    setLoginData({ email: '', password: '', remember_me: false });
    setRegisterData({
      email: '',
      password: '',
      full_name: '',
      user_type: 'individual_steward',
      language: 'en',
      terms_accepted: false,
      privacy_accepted: false
    });
    setConfirmPassword('');
    setMfaData({ method: 'sms', code: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const socialProviders = [
    { id: 'google', name: 'Google', icon: <Chrome className="h-4 w-4" />, color: 'bg-red-500' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook className="h-4 w-4" />, color: 'bg-blue-600' },
    { id: 'apple', name: 'Apple', icon: <Apple className="h-4 w-4" />, color: 'bg-black' },
    { id: 'github', name: 'GitHub', icon: <Github className="h-4 w-4" />, color: 'bg-gray-800' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-primary" />
            {currentStep === 'mfa' ? 'Verification Required' : 'Welcome to AEGIS'}
          </DialogTitle>
        </DialogHeader>

        {/* MFA Step */}
        {currentStep === 'mfa' && (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multi-Factor Authentication</h3>
              <p className="text-muted-foreground text-sm">
                Please verify your identity to complete login
              </p>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="mfa_method">Verification Method</Label>
                  <Select 
                    value={mfaData.method} 
                    onValueChange={(value: 'sms' | 'email' | 'authenticator' | 'biometric') => 
                      setMfaData(prev => ({ ...prev, method: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          SMS Code
                        </div>
                      </SelectItem>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Code
                        </div>
                      </SelectItem>
                      <SelectItem value="biometric">
                        <div className="flex items-center gap-2">
                          <Fingerprint className="h-4 w-4" />
                          Biometric
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {mfaData.method !== 'biometric' && (
                  <>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSendMFACode}
                        disabled={isLoading}
                      >
                        Send Code
                      </Button>
                      <Badge variant="outline" className="text-xs">
                        Code expires in 5 minutes
                      </Badge>
                    </div>

                    <div>
                      <Label htmlFor="mfa_code">Verification Code</Label>
                      <Input
                        id="mfa_code"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={mfaData.code}
                        onChange={(e) => setMfaData(prev => ({ ...prev, code: e.target.value }))}
                        maxLength={6}
                      />
                    </div>
                  </>
                )}

                {mfaData.method === 'biometric' && (
                  <div className="text-center py-8">
                    <Fingerprint className="mx-auto h-16 w-16 text-primary mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Please use your device's biometric authentication
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleMFAVerification}
                  disabled={isLoading || (!mfaData.code && mfaData.method !== 'biometric')}
                  className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Verify & Continue
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Login/Register Step */}
        {currentStep === 'auth' && (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Join AEGIS</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Welcome Back</h3>
                <p className="text-muted-foreground text-sm">
                  Continue your regenerative journey
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="login_email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login_email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login_password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login_password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember_me"
                      checked={loginData.remember_me}
                      onCheckedChange={(checked) => 
                        setLoginData(prev => ({ ...prev, remember_me: checked as boolean }))
                      }
                    />
                    <Label htmlFor="remember_me" className="text-sm">Remember me</Label>
                  </div>
                  <Button variant="link" size="sm" className="text-primary p-0">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Demo credentials hint */}
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">
                    Demo: Use <strong>demo@aegis.org</strong> with any password
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Join the Movement</h3>
                <p className="text-muted-foreground text-sm">
                  Become a guardian of Earth's crown bioregions
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="register_name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register_name"
                      type="text"
                      placeholder="Your full name"
                      value={registerData.full_name}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register_email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register_email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user_type">I am a</Label>
                    <Select 
                      value={registerData.user_type} 
                      onValueChange={(value: UserType) => 
                        setRegisterData(prev => ({ ...prev, user_type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(USER_TYPE_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={registerData.language} 
                      onValueChange={(value: Language) => 
                        setRegisterData(prev => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(LANGUAGE_OPTIONS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="register_password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register_password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm_password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms_accepted"
                      checked={registerData.terms_accepted}
                      onCheckedChange={(checked) => 
                        setRegisterData(prev => ({ ...prev, terms_accepted: checked as boolean }))
                      }
                    />
                    <Label htmlFor="terms_accepted" className="text-sm leading-relaxed">
                      I agree to the <Button variant="link" className="p-0 h-auto text-primary text-sm">Terms of Service</Button>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy_accepted"
                      checked={registerData.privacy_accepted}
                      onCheckedChange={(checked) => 
                        setRegisterData(prev => ({ ...prev, privacy_accepted: checked as boolean }))
                      }
                    />
                    <Label htmlFor="privacy_accepted" className="text-sm leading-relaxed">
                      I agree to the <Button variant="link" className="p-0 h-auto text-primary text-sm">Privacy Policy</Button>
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Join AEGIS'
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Social Login Options */}
        {currentStep === 'auth' && (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {socialProviders.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSocialLogin(provider.id)}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {provider.icon}
                  {provider.name}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSocialLogin('blockchain')}
              disabled={isLoading}
              className="w-full flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Connect Blockchain Wallet
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
