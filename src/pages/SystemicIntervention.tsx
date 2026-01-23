import Layout from "@/components/Layout";
import ParticipationBanner from "@/components/ParticipationBanner";

const heroBackground = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295236/Systemic_Interventions_and_Investments_2_mbzgbc.png";
const heroBackgroundMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295238/2_2_tqljlo.png";

// Card data array
const interventionCards = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1769153348/d6748c4d-3deb-467e-9c54-856f765c9fbc_qar1fs.jpg",
    alt: "Mass Financial Inclusion",
    heading: "Mass Financial Inclusion",
    description: "Focused on the transition of low income to middle income populations through the internationalisation of mass inclusion through direct services, intermediation of the financial systems layer, and the roll-out of technological platforms for mass inclusion and provision"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767763690/7dc36b61-2f91-44de-a627-87adedcbe979_we1o4y.jpg",
    alt: "Digital Technologies for Unlocking Human Performance",
    heading: "Digital Technologies for Unlocking Human Performance",
    description: "Focused on technologies for mass adoption of education, experiences, and higher levels of human performance, using multiple technologies to liberate minds and raise human consciousness, combining eastern and western definitions of enlightenment"
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
                  {/* Image - Left side - Smaller square */}
                  <div className="flex-shrink-0 w-full md:w-[220px]" style={{ maxWidth: '220px' }}>
                    <div
                      className="rounded-lg overflow-hidden"
                      style={{
                        width: '100%',
                        aspectRatio: '1 / 1', // square image container
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
              Prioritised Shared Programs
            </h2>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex items-start" style={{ gap: '1em' }}>
              <div className="flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <img
                  src="https://res.cloudinary.com/dqataciy5/image/upload/v1769080679/8_q9sc80.png"
                  alt="The Transition Project"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0, textAlign: 'left' }}>
                  The Transition Project: Transitioning Nations and Blocs of Nations to the Information Era Collaborating on A.l. and Technologies of the Future
                </p>
              </div>
            </div>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex items-center" style={{ gap: '1em' }}>
              <div className="flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <img
                  src="https://res.cloudinary.com/dqataciy5/image/upload/v1769080694/7_nowhdb.png"
                  alt="The National Sovereignty Security Programme"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0, textAlign: 'left' }}>
                  The National Sovereignty Security Programme: Guarding and Protecting Sovereignty Across All Domains
                </p>
              </div>
            </div>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex items-start" style={{ gap: '1em' }}>
              <div className="flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <img
                  src="https://res.cloudinary.com/dqataciy5/image/upload/v1769080705/9_l3nieb.png"
                  alt="The Prosperity Initiative, The World Investment Plan"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0, textAlign: 'left' }}>
                  The Prosperity Initiative, The World Investment Plan: Building Engines of Enterprise, Growth and Shared Prosperity Leading to a Global Investment Boom by Turning Needs into Opportunities
                </p>
              </div>
            </div>
          </div>
          <div className="border-b border-border py-4 md:py-6">
            <div className="flex items-start" style={{ gap: '1em' }}>
              <div className="flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <img
                  src="https://res.cloudinary.com/dqataciy5/image/upload/v1769080782/10_chuwsh.png"
                  alt="Rethinking the World Order and Multilateralism"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0, textAlign: 'left' }}>
                  Rethinking the World Order and Multilateralism: Redesigning the world system using principles from complex adaptive and antifragile systems, realism, resilience, natural and constitutional law, and human security
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border py-4 md:py-6">
            <div className="flex items-start" style={{ gap: '1em' }}>
              <div className="flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <img
                  src="https://res.cloudinary.com/dqataciy5/image/upload/v1769080785/11_zcan9r.png"
                  alt="Mobilizing Local Mission Impossible Forces"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold" style={{ margin: 0, textAlign: 'left' }}>
                  Mobilising Local Mission Impossible Forces: Tackling Society's Toughest Challenges with Bold Solutions Mobilized by Local Task Forces
                </p>
              </div>
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

