import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CrownBioregions from "./pages/CrownBioregions";
import KenyaAccord from "./pages/KenyaAccord";
import RoyalLegacy from "./pages/RoyalLegacy";
import ServiceIndex from "./pages/ServiceIndex";
import JoinPact from "./pages/JoinPact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
