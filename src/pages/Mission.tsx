import Layout from "@/components/Layout";

// Cloudinary URLs for banner images - update these with actual image URLs
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1770372479/Our_Mission_2_ag9sgv.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1770373042/3_2_ndtwij.png";

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
                Mission and Purpose
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
                Mission and Purpose
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Purpose */}
      <section className="pt-16 pb-12 md:pb-15 bg-background">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Mission
          </h2>
          
          <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
            To generate the strategic intelligence and foresight required to understand, anticipate, and respond to system-level transitions, major events, and points of strategic consequence affecting the future of nations, regions, and global institutions and enterprises.
          </p>
          
          <div className="border-t border-gray-300 my-6 md:my-8"></div>
          
          <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-6 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Purpose
          </h2>
          
          <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in mb-4" style={{ willChange: "opacity, transform" }}>
            To enable high-stakes decision-making at moments of strategic consequence through strategic intelligence and intervention planning for
          </p>
          <ul className="font-serif text-base text-foreground leading-relaxed animate-fade-in list-disc list-inside space-y-4" style={{ willChange: "opacity, transform" }}>
            <li>Prosperity and wealth creation and in a time of large-scale disruptive change</li>
            <li>Sovereignty and agency amid geopolitical, technological and economic challenges.</li>
            <li>Systemic change to the information age securing peace, prosperity, and freedom in the transition</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;

