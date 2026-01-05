import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CapabilityCard from "@/components/CapabilityCard";
import { Brain, Shield, TrendingUp } from "lucide-react";

const bannerImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766566342/Frame_1707482985_1_d51ujw.png";
// Hero section images for different screen sizes
const heroImageLarge = "https://res.cloudinary.com/dqataciy5/image/upload/v1767613670/Main_8_aqwndf.png"; // Large screens
const heroImageTablet = "https://res.cloudinary.com/dqataciy5/image/upload/v1767613686/Main_9_ntohbn.png"; // Tablet screens
const heroImageMobileMedium = "https://res.cloudinary.com/dqataciy5/image/upload/v1767613703/Main_11_bak61u.png"; // Medium mobiles
const heroImageMobileSmall = "https://res.cloudinary.com/dqataciy5/image/upload/v1767613701/Main_10_dytk39.png"; // Small mobiles

const Index = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Pivotal Thinking",
      description: "Generating strategic intelligence to understand transitions, shocks, inflection points across geopolitics, technology, economics, climate and society.",
      buttonText: "ALL PIVOTAL THINKING",
      buttonLink: "/capabilities/pivotal-thinking",
    },
    {
      icon: Shield,
      title: "Strategic Counsel",
      description: "Supporting governments, blocs and institutions as they navigate structural change.",
      buttonText: "SEE OUR MANDATES",
      buttonLink: "/capabilities/strategic-counsel",
    },
    {
      icon: TrendingUp,
      title: "Systemic Intervention and Strategic Investment",
      description: "Executing interventions to stabilise environments, mobilise capital and technology, and convert gaps into engines of prosperity.",
      buttonText: "EXPLORE CAPABILITIES",
      buttonLink: "/capabilities/systemic-intervention",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center overflow-hidden">
        {/* Small mobiles - default (below 640px) */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:hidden"
          style={{ 
            backgroundImage: `url(${heroImageMobileSmall})`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        {/* Medium mobiles - sm: (640px+) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden sm:block md:hidden"
          style={{ 
            backgroundImage: `url(${heroImageMobileMedium})`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        {/* Tablet screens - md: (768px+) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block lg:hidden"
          style={{ 
            backgroundImage: `url(${heroImageTablet})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        {/* Large screens - lg: (1024px+) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden lg:block"
          style={{ 
            backgroundImage: `url(${heroImageLarge})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        
        <div className="relative z-10 container-custom section-padding w-full">
          <div className="max-w-[600px]">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-accent mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              ISII
            </h1>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              Institute for Strategic Intelligence<br />
              and Intervention
            </h2>
            <p className="text-primary-foreground/90 leading-relaxed mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              The Institute for Strategic Intelligence and Intervention (ISII) exists to understand and shape the system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era.
            </p>
            <div className="animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <Button variant="hero" size="lg" className="text-primary" asChild>
                <Link to="/about">About us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="relative flex items-center overflow-hidden h-[640px] md:h-auto md:min-h-[384px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${bannerImage})`,
            height: '100%',
          }}
        />
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container-custom section-padding w-full py-16 md:py-20">
            <div className="text-left flex flex-col" style={{ gap: '10px' }}>
              <span className="inline-block bg-primary px-4 py-1.5 text-xs text-primary-foreground uppercase tracking-wider w-fit font-bold">
                Our Latest Pivotal Thinking
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground text-left leading-relaxed">
                <span className="md:hidden">
                  America the Merchant Power, The National Security Strategy 2025
                </span>
                <span className="hidden md:block">
                  America the Merchant Power,<br />
                  <span style={{ display: 'block', marginTop: '0.5rem' }}>The National Security Strategy 2025</span>
                </span>
              </h2>
              <div className="text-left">
                <Button variant="outline-light" asChild>
                  <Link to="/capabilities/pivotal-thinking">Read More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="pt-8 pb-24 bg-gray-light">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-4 md:mb-16 font-bold">
            Our Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability) => (
              <CapabilityCard key={capability.title} {...capability} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
