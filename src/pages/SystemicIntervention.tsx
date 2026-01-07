import Layout from "@/components/Layout";

const heroBackground = "https://res.cloudinary.com/dqataciy5/image/upload/v1767614174/Frame_1707483135_2_ojrdb0.png";
const heroBackgroundMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1767614144/Frame_1707483125_3_d6vhau.png";

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
    heading: "Digital technologies for mass liberation, focused on the cognitive systems layer for experiences, education, entertainment",
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
              <p className="text-white/70 text-xl font-bold mb-1">
                ISII Labs
              </p>
              <h1 className="text-white font-sans text-lg font-bold">
                Systemic Interventions and Investments
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
              <p className="text-white/70 text-xl md:text-2xl font-bold mb-1">
                ISII Labs
              </p>
              <h1 className="text-white font-sans text-xl md:text-2xl lg:text-3xl font-bold">
                Systemic Interventions and Investments
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
          {/* Prioritised Label */}
          <div className="max-w-[1420px] mx-auto mb-6 md:mb-8 flex justify-start" style={{ gap: '10px' }}>
            <span 
              className="inline-flex items-center justify-center font-medium"
              style={{ 
                width: '159px',
                height: '56px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#e5e7eb',
                borderRadius: '100px',
                paddingTop: '10px',
                paddingRight: '24px',
                paddingBottom: '10px',
                paddingLeft: '24px'
              }}
            >
              Prioritised
            </span>
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
                  height: 'auto',
                  minHeight: '266px',
                  padding: '32px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex flex-col md:flex-row h-full" style={{ gap: '32px' }}>
                  {/* Image - Left side */}
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <div 
                      className="rounded-lg overflow-hidden mx-auto md:mx-0"
                      style={{ 
                        width: '100%',
                        maxWidth: '397.33px',
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
                  
                  {/* Content - Right side */}
                  <div 
                    className="flex flex-col justify-center w-full md:w-auto flex-1"
                    style={{
                      width: '100%',
                      maxWidth: '926.67px',
                      height: 'auto',
                      minHeight: '202px',
                      gap: '16px'
                    }}
                  >
                    <h2 
                      className="font-serif text-xl md:text-2xl font-bold leading-tight"
                      style={{ color: '#040750', margin: 0 }}
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
    </Layout>
  );
};

export default SystemicIntervention;

