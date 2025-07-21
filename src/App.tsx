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
import { CorporatePartnership } from "./components/CorporatePartnership";
import { ImmersiveExperiences } from "./components/ImmersiveExperiences";
import { WildlifeDiplomacy } from "./components/WildlifeDiplomacy";
import { StartupDashboard } from "./components/StartupDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
                <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crown-bioregions" element={<CrownBioregions />} />
          <Route path="/kenya-accord" element={<KenyaAccord />} />
          <Route path="/royal-legacy" element={<RoyalLegacy />} />
          <Route path="/service-index" element={<ServiceIndex />} />
          <Route path="/join-pact" element={<JoinPact />} />
                    <Route path="/pricing" element={<Pricing />} />
          <Route path="/partnerships" element={<CorporatePartnership />} />
          <Route path="/immersive" element={<ImmersiveExperiences />} />
          <Route path="/diplomacy" element={<WildlifeDiplomacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
            </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
