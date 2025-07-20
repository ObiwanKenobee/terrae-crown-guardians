import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CrownBioregions from "@/components/CrownBioregions";
import { RegionalTargeting } from "@/components/RegionalTargeting";
import KenyaAccord from "@/components/KenyaAccord";
import RoyalLegacy from "@/components/RoyalLegacy";
import ServiceIndex from "@/components/ServiceIndex";
import JoinPact from "@/components/JoinPact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <RegionalTargeting />
        </div>
      </section>
      <CrownBioregions />
      <KenyaAccord />
      <RoyalLegacy />
      <ServiceIndex />
      <JoinPact />
    </div>
  );
};

export default Index;
