import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CapabilityCard from "@/components/CapabilityCard";
import { Brain } from "lucide-react";

const whiteHouseHero = "https://res.cloudinary.com/dqataciy5/image/upload/v1766554226/White_House_2642x826_1_ck6dkk.png";
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766554875/Main_3_mgq0be.png";
const tabletImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766554969/Main_4_moupgm.png";
const mobileImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766585947/Gradient_1_mebclo.png";
const bannerImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766566342/Frame_1707482985_1_d51ujw.png";

const Index = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Pivotal Thinking",
      description: "Generating strategic intelligence to understand transitions, shocks, inflection points across geopolitics, technology, economics, climate and society.",
      buttonText: "ALL PIVOTAL THINKING",
      buttonLink: "/capabilities/pivotal-thinking",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-start">
        <div 
          className="absolute inset-0 bg-cover bg-top md:hidden"
          style={{ 
            backgroundImage: `url(${mobileImage})`,
            height: '100vh',
            backgroundPosition: 'top center'
          }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(27, 49, 91, 0.7), rgba(27, 49, 91, 0.9))'
            }}
          />
        </div>
        
        <div className="relative z-10 container-custom section-padding pt-16 pb-12 md:pt-24 md:pb-24">
          <div className="max-w-2xl">
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
      <section className="relative min-h-[60vh] py-32 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${bannerImage})`,
          }}
        />
        <div className="relative z-10 w-full">
          <div className="container-custom section-padding">
            <div className="text-left max-w-4xl">
              <span className="inline-block bg-primary px-4 py-1 text-xs text-primary-foreground uppercase tracking-wider mb-6">
                Our Latest Pivotal Thinking
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-left">
                <span className="md:hidden block">
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>America the Merchant Power,</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>The National Security</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Strategy 2025</span>
                </span>
                <span className="hidden md:block max-w-2xl">
                  America the Merchant Power,<br />
                  The National Security Strategy 2025
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
      <section className="py-24 bg-gray-light">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-16 font-bold">
            Our Capabilities
          </h2>
          
          <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
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
