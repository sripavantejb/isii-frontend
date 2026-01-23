import Layout from "@/components/Layout";

// Cloudinary URLs for banner images - same as Mission page
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295137/Our_Mission_1_hkd0kr.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295139/3_1_ancnmk.png";

// Cloudinary URLs for globe images
const globeImage1 = "https://res.cloudinary.com/dqataciy5/image/upload/v1769084674/1_4_vknuef.png";
const globeImage2 = "https://res.cloudinary.com/dqataciy5/image/upload/v1769084675/2_4_mdspn1.png";
const globeImage3 = "https://res.cloudinary.com/dqataciy5/image/upload/v1769084678/image_2_zfw9mn.png";

const Context = () => {
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
                Context
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
                Context
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="pt-16 pb-16 md:pb-20 bg-background">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {/* Globe image on the left */}
            <div className="flex justify-center md:justify-start">
              <img 
                src={globeImage1} 
                alt="Globe" 
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            
            {/* Content on the right */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                Context
              </h2>
              
              <ol className="font-serif text-base text-foreground leading-relaxed animate-fade-in space-y-4 list-decimal list-outside pl-6" style={{ willChange: "opacity, transform" }}>
                <li><strong>The world has entered a civilisational transition to a new era</strong>, dismantling the world's political, economic and social architecture in the process</li>
                <li><strong>The transition changes the global flows</strong> of capital, data, energy, climate and people, accelerating fragmentation and exposing vulnerabilities</li>
                <li><strong>A new imperial competition has begun</strong> enabled by traditional military-economic-technological means</li>
                <li><strong>A new form of colonisation is rapidly emerging</strong> using AI-enabled technology and information platforms - the colonisation of the mind</li>
                <li><strong>America and China have the technology to be colonisers</strong>, and the rest of the world, including their own populations, are set to lose agency</li>
                <li><strong>America's strategy aims at great power and wealth</strong>, deprioritising multilateralism and leadership of the world system</li>
                <li><strong>Finance, economic and trading systems are tools of competition</strong>, allowing for rivals to be weakened and allies to be made to comply</li>
                <li><strong>Delivering national growth and prosperity is the minimum requirement</strong> for domestic power, but is not sufficient to guarantee it in the face of foreign threats, extreme politics and mass migration</li>
                <li><strong>New strategies are required for national and international security</strong> leveraging alliances, technology and investment capital flows to forge defences and address shared issues</li>
                <li><strong>The transition, fraught with danger, is also a time of great opportunity</strong> for power and wealth and for creating a better world that raises</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Distinctiveness Section */}
      <section className="pt-16 pb-16 md:pb-20 bg-muted">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {/* Globe image on the left */}
            <div className="flex justify-center md:justify-start">
              <img 
                src={globeImage2} 
                alt="Globe" 
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            
            {/* Content on the right */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                Distinctiveness
              </h2>
              
              <ul className="font-serif text-base text-foreground leading-relaxed animate-fade-in space-y-4 list-disc list-outside pl-6" style={{ willChange: "opacity, transform" }}>
                <li><strong>Operates at moments of strategic consequence</strong>, where decisions determine long-term outcomes for nations, institutions, and&nbsp;enterprises</li>
                <li><strong>Provides unusual thinking and ideas</strong> on matters of critical consequence for effective response and and aims at pre-emption</li>
                <li><strong>Integrates intelligence, strategy, and intervention</strong>, creating readiness for execution</li>
                <li><strong>Focuses on system-level transitions</strong>, not discrete policy issues, projects, or sectors</li>
                <li><strong>Supports capital, solution and technology mobilisation</strong> as strategic instruments, not merely as discrete mechanisms</li>
                <li><strong>Works across sovereign, institutional, and market boundaries</strong>, enabling solutions that no single actor can deliver alone</li>
                <li><strong>Combines long-term foresight with near-term action</strong>, aligning decades-long transitions with immediate decision windows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ISII's Strategic Intervention Logic Section */}
      <section className="pt-16 pb-16 md:pb-20 bg-background">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {/* Globe image on the left */}
            <div className="flex justify-center md:justify-start">
              <img 
                src={globeImage3} 
                alt="Globe" 
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            
            {/* Content on the right */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                ISII's Strategic Intervention Logic
              </h2>
              
              <ul className="font-serif text-base text-foreground leading-relaxed animate-fade-in space-y-4 list-disc list-outside pl-6" style={{ willChange: "opacity, transform" }}>
                <li><strong>System-level transitions create moments of strategic consequence</strong> that determine long-term outcomes for nations, institutions, and societies</li>
                <li><strong>ISII generates strategic intelligence</strong> to identify these moments and the leverage points within them</li>
                <li><strong>ISII formulates sovereign-grade strategies</strong> that align political, economic, technological, and capital dimensions</li>
                <li><strong>ISII executes interventions and programmes</strong> that mobilise institutions, capital, and technology across boundaries</li>
                <li><strong>This integrated approach reshapes trajectories</strong>, enabling sovereignty, peace, prosperity, and freedom in transition to the Information Era</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Context;
