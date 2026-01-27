import Layout from "@/components/Layout";

// Cloudinary URLs for banner images - update these with actual image URLs
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295137/Our_Mission_1_hkd0kr.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295139/3_1_ancnmk.png";

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
          
          <ul className="font-serif text-base text-foreground leading-relaxed animate-fade-in list-disc list-inside space-y-4" style={{ willChange: "opacity, transform" }}>
            <li>To enable high-stakes decision-making at moments of strategic consequence</li>
            <li>To shape and support interventions that strengthen sovereignty and agency</li>
            <li>To catalyse the mobilisation of capital, technology, and solutions in support of peace, prosperity, and freedom in the transition to the Information Era</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;

