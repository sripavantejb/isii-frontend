import Layout from "@/components/Layout";
import ParticipationBanner from "@/components/ParticipationBanner";

const heroBackground = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295236/Systemic_Interventions_and_Investments_2_mbzgbc.png";
const heroBackgroundMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295238/2_2_tqljlo.png";

// Card data array
const interventionCards = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767763688/ead4e33e-a90d-4395-bdbb-145bd9cf8f70_ldxss9.jpg",
    alt: "Mass Financial Inclusion",
    heading: "Mass financial (inclusion) services, focused on the financial systems layer, internationalisation of mass inclusion",
    description: "A.I. enabled growth (development) bank through the roll-up of NBFCs to build a global financial institution through targeted acquisitions and partnerships beginning in India to roll out of mass financial inclusion platforms and solutions",
    path: "Path: India → Global South → Global North"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767763690/7dc36b61-2f91-44de-a627-87adedcbe979_we1o4y.jpg",
    alt: "Digital Technologies for Mass Liberation",
    heading: "Digital technologies focused on the cognitive systems layer, unlocking human potential through experiences, education, enlightenment",
    description: "Delivering mass education, experiences and enlightenment to liberate minds and raise human consciousness, the enlightenment of the 21st century combining eastern and western definitions",
    path: "Path: Narrow → Broad → Open"
  }
];

const SystemicIntervention = () => {
  return (
    <Layout>
      <style>{`
        @media (min-width: 1440px) {
          .intervention-card {
            height: 266px !important;
            width: 1420px !important;
          }
        }
      `}</style>
      {/* Hero Section - Small Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Background - shown only on screens smaller than md (768px) */}
        <div 
          className="block md:hidden w-full relative"
          style={{ 
            backgroundImage: `url(${heroBackgroundMobile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl font-bold">
                Programmes
              </h1>
            </div>
          </div>
        </div>
        {/* Desktop Background - shown only on md screens and larger (768px+) */}
        <div 
          className="hidden md:block w-full relative"
          style={{ 
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl md:text-2xl lg:text-3xl font-bold">
                Programmes
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pt-8 md:pt-10 pb-16 md:pb-20 relative" style={{ backgroundColor: '#F3F5F7' }}>
        {/* Pink vertical strip on the left */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 md:w-2"
          style={{ backgroundColor: '#f8d7da' }}
        />
        
        <div className="container-custom section-padding">
          {/* Prioritised Programmes Heading */}
          <div className="max-w-[1420px] mx-auto mb-6 md:mb-8">
            <h2 className="font-sans text-xl md:text-2xl lg:text-3xl text-primary leading-relaxed font-bold">
              Prioritised Programmes
            </h2>
          </div>

          {/* Cards Container */}
          <div className="max-w-[1420px] mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {interventionCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg border border-gray-200 mx-auto"
                style={{
                  width: '100%',
                  maxWidth: '1420px',
                  padding: '32px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex flex-col md:flex-row items-start" style={{ gap: '32px' }}>
                  {/* Image - Left side - Fixed dimensions */}
                  <div className="flex-shrink-0 w-full md:w-[397.33px]">
                    <div 
                      className="rounded-lg overflow-hidden"
                      style={{ 
                        width: '100%',
                        height: '202px'
                      }}
                    >
                      <img 
                        src={card.image} 
                        alt={card.alt}
                        className="w-full h-full rounded-lg"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  
                  {/* Content - Right side - Flexible width */}
                  <div 
                    className="flex flex-col flex-1 w-full md:w-auto"
                    style={{
                      gap: '16px'
                    }}
                  >
                    <h2 
                      className="font-serif text-xl md:text-2xl font-bold leading-tight"
                      style={{ color: '#001429', margin: 0 }}
                    >
                      {card.heading}
                    </h2>
                    <p 
                      className="leading-relaxed text-base"
                      style={{ color: '#4a4a4a', fontWeight: 400, margin: 0 }}
                    >
                      {card.description}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: '#4a4a4a', fontWeight: 500, margin: 0 }}
                    >
                      {card.path}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Programmes Section */}
      <section className="pt-0 pb-2 md:pb-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-custom section-padding">
          <div className="border-b border-border py-4 md:py-6 pt-8 md:pt-12">
            <h2 className="font-sans text-xl md:text-2xl lg:text-3xl text-primary leading-relaxed font-bold">
              Pipeline Programmes
            </h2>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex" style={{ gap: '0.5em' }}>
              <span className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold flex-shrink-0">1.</span>
              <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0 }}>
                The National Transition Project: Transitioning the Nation to the Information Era
              </p>
            </div>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex" style={{ gap: '0.5em' }}>
              <span className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold flex-shrink-0">2.</span>
              <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0 }}>
                The Prosperity Initiative: Building Engines of Enterprise, Growth and Share
              </p>
            </div>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex" style={{ gap: '0.5em' }}>
              <span className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold flex-shrink-0">3.</span>
              <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0 }}>
                The National Sovereignty Security Programme: Guarding and Protecting Sovereignty Across All Domains
              </p>
            </div>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex" style={{ gap: '0.5em' }}>
              <span className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold flex-shrink-0">4.</span>
              <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0 }}>
                The World Investment Plan: Creating a Global Investment Boom by Turning Needs into Opportunities via Systems of Enterprise, Growth and Shared Prosperity
              </p>
            </div>
          </div>
          <div className="border-t border-border py-4 md:py-6">
            <div className="flex" style={{ gap: '0.5em' }}>
              <span className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold flex-shrink-0">5.</span>
              <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0 }}>
                Intractable Problems: Tackling Society's Toughest Challenges Requiring Bold, Cross-Sector, System-Level Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Banner */}
      <ParticipationBanner />
    </Layout>
  );
};

export default SystemicIntervention;

