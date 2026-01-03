import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CapabilityCard from "@/components/CapabilityCard";
import { Brain, Shield, TrendingUp } from "lucide-react";

const whiteHouseHero = "https://res.cloudinary.com/dqataciy5/image/upload/v1766554226/White_House_2642x826_1_ck6dkk.png";
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767439020/Main_6_vn2com.png";
const tabletImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766554969/Main_4_moupgm.png";
const mobileImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767439020/Main_6_vn2com.png";
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
    {
      icon: Shield,
      title: "Strategic Counsel",
      description: "Supporting governments, blocs and institutions as they navigate structural change.",
      buttonText: "SEE OUR MANDATES",
      buttonLink: "#",
    },
    {
      icon: TrendingUp,
      title: "Systemic Intervention and Strategic Investment",
      description: "Executing interventions to stabilise environments, mobilise capital and technology, and convert gaps into engines of prosperity.",
      buttonText: "EXPLORE CAPABILITIES",
      buttonLink: "#",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-top md:hidden"
          style={{ 
            backgroundImage: `url(${mobileImage})`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            minHeight: '100vh',
            width: '100%'
          }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-10 container-custom section-padding w-full">
          <div>
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
            <div className="text-left">
              <span className="inline-block bg-primary px-4 py-1 text-xs text-primary-foreground uppercase tracking-wider mb-6">
                Our Latest Pivotal Thinking
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-left leading-relaxed">
                <span className="md:hidden block">
                  <span style={{ display: 'block' }}>America the Merchant Power,</span>
                  <span style={{ display: 'block' }}>The National Security</span>
                  <span style={{ display: 'block' }}>Strategy 2025</span>
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
      <section className="py-24 bg-gray-light">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-16 font-bold">
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
