import { Scroll, Mic, Globe, Book, Music, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoyalLegacy = () => {
  const legacyItems = [
    {
      icon: Mic,
      title: "Elder Voices",
      description: "Sacred stories from Maasai, Kikuyu, and Aboriginal custodians",
      type: "Audio",
      items: "1,247 recordings"
    },
    {
      icon: Globe,
      title: "Governance Wisdom",
      description: "Indigenous systems of ecological stewardship and justice",
      type: "Protocols",
      items: "89 frameworks"
    },
    {
      icon: Book,
      title: "Royal Conservation",
      description: "Monarchic contributions to environmental protection worldwide",
      type: "Archives",
      items: "156 documents"
    },
    {
      icon: Music,
      title: "Cultural Heritage",
      description: "Songs, ceremonies, and traditions of land connection",
      type: "Multimedia",
      items: "743 artifacts"
    }
  ];

  return (
    <section id="legacy" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Scroll className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Royal Legacy Ledger
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An immutable archive of ancestral knowledge, indigenous governance systems, and monarchic 
            contributions to environmental protection—designed for cultural dignity and ecological succession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {legacyItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-earth transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-forest rounded-full w-16 h-16 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gold">{item.type}</div>
                  <div className="text-2xl font-bold text-primary">{item.items}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-primary mb-4">
            Preserving Wisdom for Future Generations
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Every story, every protocol, every song is secured on the blockchain—ensuring that the wisdom 
            of our ancestors guides the stewardship of tomorrow's guardians.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-royal text-primary-foreground hover:opacity-90">
              <Camera className="mr-2 h-5 w-5" />
              Contribute Knowledge
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Book className="mr-2 h-5 w-5" />
              Explore Archive
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoyalLegacy;