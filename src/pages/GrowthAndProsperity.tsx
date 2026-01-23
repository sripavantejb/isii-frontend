import Layout from "@/components/Layout";

// Placeholder for Earth image - update with actual Cloudinary URL or image path
// The image should show Earth from space with Europe, Africa, and Asia visible
const earthImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1769086588/d192a568-c9df-4990-8b1b-c880eed01c20_ra0gc8.jpg";

const GrowthAndProsperity = () => {
  return (
    <Layout>
      {/* Main Content Section - White Background */}
      <section className="min-h-screen bg-white py-8 md:py-12">
        <div className="container-custom section-padding">
          {/* Top Header Section */}
          <div className="flex justify-between items-start mb-4">
            {/* Top Left */}
            <div className="flex-1">
              <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary">
                Growth and Prosperity
              </h1>
            </div>
          </div>

          {/* Main Layout: Earth Image Left (1/3) + Content Right (2/3) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch mt-6">
            {/* Left Side - Earth Image (1/3 width) */}
            <div className="h-full overflow-hidden md:col-span-4">
              <img 
                src={earthImage}
                alt="Earth from space showing Europe, Africa, and Asia"
                className="w-full h-full object-cover rounded-lg"
                style={{ objectPosition: 'center 38%' }}
              />
            </div>

            {/* Right Side - Content (2/3 width) */}
            <div className="h-full md:col-span-8">
              <div className="h-full space-y-6">
                {/* Main Topic */}
                <h2 className="font-sans text-xl md:text-2xl font-bold text-black">
                   Building Growth, Prosperity, and Systems of Enterprise and Global Thematic Capital Allocation
                </h2>

                {/* Core Question */}
                <div className="space-y-2">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Core question:
                  </p>
                  <p className="font-sans text-base md:text-lg text-black leading-relaxed">
                    How does the nation renew its economic engine, broaden prosperity, and create a system of enterprise for prosperity at home and abroad?
                  </p>
                </div>

                {/* Focus of Strategic Counsel */}
                <div className="space-y-3">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    We provide strategic counsel on the agenda for:
                  </p>
                  <ul className="space-y-2.5 font-sans text-base md:text-lg text-black leading-relaxed" style={{ listStyleType: 'square', paddingLeft: '1.5rem' }}>
                    <li>A vision and mission that can galvanise the public</li>
                    <li>A 100-day plan of 100 initiatives to drive national prosperity</li>
                    <li>Transition of mass populations to middle-class prosperity</li>
                    <li>Democratised finance and capital mobilisation</li>
                    <li>Entrepreneurism and SME ecosystem development</li>
                    <li>Modern industrial and resources strategy</li>
                    <li>Human, social and environmental capital and security</li>
                    <li>A World Investment Plan to drive domestic & international growth and prosperity</li>
                  </ul>
                </div>

                {/* Why this is imperative */}
                <div className="space-y-2">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Why this is imperative:
                  </p>
                  <p className="font-sans text-base md:text-lg text-black leading-relaxed">
                    Nations that do not deliver growth and prosperity cannot delivery stability or preserve their freedoms.
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

export default GrowthAndProsperity;

