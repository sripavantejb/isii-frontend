import Layout from "@/components/Layout";

// Placeholder for Earth image - update with actual Cloudinary URL or image path
// The image should show Earth from space with Europe, Africa, and Asia visible
const earthImage = "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80";

const MobilisingTransition = () => {
  return (
    <Layout>
      {/* Main Content Section - White Background */}
      <section className="min-h-screen bg-white py-8 md:py-12">
        <div className="container-custom section-padding max-w-[1400px]">
          {/* Top Header Section */}
          <div className="flex justify-between items-start mb-4">
            {/* Top Left */}
            <div className="flex-1">
              <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary">
                Mobilising Transition
              </h1>
            </div>
          </div>

          {/* Main Layout: Earth Image Left (1/3) + Content Right (2/3) */}
          <div className="flex gap-6 md:gap-8 items-stretch mt-6">
            {/* Left Side - Earth Image (1/3 width) */}
            <div className="w-1/3 flex-shrink-0 flex">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img 
                  src={earthImage}
                  alt="Earth from space showing Europe, Africa, and Asia"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content (2/3 width) */}
            <div className="w-2/3 flex-shrink-0">
              <div className="space-y-6">
                {/* Main Topic */}
                <h2 className="font-sans text-xl md:text-2xl font-bold text-black">
                  3. Designing the National Transition Strategy for the Information Era
                </h2>

                {/* Core Question */}
                <div className="space-y-2">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Core question:
                  </p>
                  <p className="font-sans text-base md:text-lg text-black leading-relaxed">
                    How does the nation rebuild its systems - technology, energy, infrastructure, finance, institutions - to function and lead in the Information Age?
                  </p>
                </div>

                {/* Focus of Strategic Counsel */}
                <div className="space-y-3">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Focus of strategic counsel:
                  </p>
                  <ul className="space-y-2.5 font-sans text-base md:text-lg text-black leading-relaxed" style={{ listStyleType: 'square', paddingLeft: '1.5rem' }}>
                    <li>Transitioning from industrial to information-era systems</li>
                    <li>AI and breakthrough technologies strategy (19 core techs)</li>
                    <li>AI strategy for value, growth, and development</li>
                    <li>Industrial transition for all sectors</li>
                    <li>Energy, supply chains, and national infrastructure security</li>
                    <li>Adapting institutions for the transition</li>
                  </ul>
                </div>

                {/* Why this is imperative */}
                <div className="space-y-2">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Why this is imperative:
                  </p>
                  <p className="font-sans text-base md:text-lg text-black leading-relaxed">
                    Each nation stands to lose every political, social and economic power structure and delivery system in transition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MobilisingTransition;

