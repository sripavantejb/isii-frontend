import Layout from "@/components/Layout";

// Cloudinary URLs for banner images - update these with actual image URLs
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766340034/Gemini_Generated_Image_uiosyuuiosyuuios_iky1pj.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1766340034/Gemini_Generated_Image_uiosyuuiosyuuios_iky1pj.png";

const Mission = () => {
  return (
    <Layout>
      {/* Hero Section - Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Background - shown only on screens smaller than md (768px) */}
        <div 
          className="block md:hidden w-full relative"
          style={{ 
            backgroundImage: `url(${heroImageMobile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl font-bold">
                Our Mission
              </h1>
            </div>
          </div>
        </div>
        {/* Desktop Background - shown only on md screens and larger (768px+) */}
        <div 
          className="hidden md:block w-full relative"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl font-bold">
                Our Mission
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="pt-16 pb-24 bg-background">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Mission Statement
          </h2>
          
          <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
            The Institute for Strategic Intelligence and Intervention (ISII) exists to understand and shape the system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;

