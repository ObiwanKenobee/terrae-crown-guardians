import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CrownBioregions from "@/components/CrownBioregions";
import KenyaAccord from "@/components/KenyaAccord";
import RoyalLegacy from "@/components/RoyalLegacy";
import ServiceIndex from "@/components/ServiceIndex";
import JoinPact from "@/components/JoinPact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CrownBioregions />
      <KenyaAccord />
      <RoyalLegacy />
      <ServiceIndex />
      <JoinPact />
    </div>
  );
};

export default Index;
