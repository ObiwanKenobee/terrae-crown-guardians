import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CrownBioregions from "./pages/CrownBioregions";
import KenyaAccord from "./pages/KenyaAccord";
import RoyalLegacy from "./pages/RoyalLegacy";
import ServiceIndex from "./pages/ServiceIndex";
import JoinPact from "./pages/JoinPact";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import { CorporatePartnership } from "./components/CorporatePartnership";
import { ImmersiveExperiences } from "./components/ImmersiveExperiences";
import { WildlifeDiplomacy } from "./components/WildlifeDiplomacy";
import { StartupDashboard } from "./components/StartupDashboard";
import { EnterpriseLayout } from "./components/EnterpriseLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterpriseLayout showHero={true}><Index /></EnterpriseLayout>} />
          <Route path="/crown-bioregions" element={<EnterpriseLayout><CrownBioregions /></EnterpriseLayout>} />
          <Route path="/kenya-accord" element={<EnterpriseLayout><KenyaAccord /></EnterpriseLayout>} />
          <Route path="/royal-legacy" element={<EnterpriseLayout><RoyalLegacy /></EnterpriseLayout>} />
          <Route path="/service-index" element={<EnterpriseLayout><ServiceIndex /></EnterpriseLayout>} />
          <Route path="/join-pact" element={<EnterpriseLayout><JoinPact /></EnterpriseLayout>} />
          <Route path="/pricing" element={<EnterpriseLayout><Pricing /></EnterpriseLayout>} />
          <Route path="/partnerships" element={<EnterpriseLayout><CorporatePartnership /></EnterpriseLayout>} />
          <Route path="/immersive" element={<EnterpriseLayout><ImmersiveExperiences /></EnterpriseLayout>} />
          <Route path="/diplomacy" element={<EnterpriseLayout><WildlifeDiplomacy /></EnterpriseLayout>} />
          <Route path="/dashboard" element={<EnterpriseLayout><StartupDashboard /></EnterpriseLayout>} />
          <Route path="/about" element={<EnterpriseLayout><About /></EnterpriseLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<EnterpriseLayout><NotFound /></EnterpriseLayout>} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
