import Layout from "@/components/Layout";

// Placeholder for Earth image - update with actual Cloudinary URL or image path
// The image should show Earth from space with Europe, Africa, and Asia visible
const earthImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1769086628/9d79d5d0-c58c-4ef0-9ea9-030fcc716cd6_er6gdv.jpg";

const SecuringSovereignty = () => {
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
                Securing Sovereignty
              </h1>
            </div>
          </div>

          {/* Main Layout: Earth Image Left (1/3) + Content Right (2/3) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch mt-6">
            {/* Left Side - Earth Image (1/3 width) */}
            <div className="md:col-span-4">
              <img 
                src={earthImage}
                alt="Earth from space showing Europe, Africa, and Asia"
                className="w-full h-auto object-cover rounded-lg"
                style={{ maxHeight: '600px' }}
              />
            </div>

            {/* Right Side - Content (2/3 width) */}
            <div className="md:col-span-8">
              <div className="space-y-6">
                {/* Main Topic */}
                <h2 className="font-sans text-xl md:text-2xl font-bold text-black">
                  Securing and Advancing Sovereignty in the New Era of Digital and Physical Colonisation
                </h2>

                {/* Core Question */}
                <div className="space-y-2">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Core question:
                  </p>
                  <p className="font-sans text-base md:text-lg text-black leading-relaxed">
                    How does the nation protect itself from subordination and build the capabilities and alliances to shape the global order?
                  </p>
                </div>

                {/* Focus of Strategic Counsel */}
                <div className="space-y-3">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    We provide strategic counsel on the agenda for:
                  </p>
                  <ul className="space-y-2.5 font-sans text-base md:text-lg text-black leading-relaxed" style={{ listStyleType: 'square', paddingLeft: '1.5rem' }}>
                    <li>AI sovereignty, retaining autonomy and avoiding cognitive capture</li>
                    <li>Energy, resource, space, cyber, and critical-infrastructure security</li>
                    <li>Resilient supply chains and financial sovereignty</li>
                    <li>The alliance web to defend position, buy scale, and advance national agenda</li>
                    <li>Leading in foundational technologies and commanding strategic resources and information ecosystems</li>
                    <li>Building a new multilateralism</li>
                  </ul>
                </div>

                {/* Why this is imperative */}
                <div className="space-y-2">
                  <p className="font-sans text-base md:text-lg font-bold text-black">
                    Why this is imperative:
                  </p>
                  <p className="font-sans text-base md:text-lg text-black leading-relaxed">
                    Sovereignty today is at threat from allies, rivals and technology platforms.
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

export default SecuringSovereignty;

