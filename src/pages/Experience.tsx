import Layout from "@/components/Layout";

// Strategic Counsel banner images (mobile / desktop)
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767768280/Strategic_Counsel_rm2e9c.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1767768646/1_pl1xvu.png";

// Placeholder for the dark spherical globe/maze image - update with actual Cloudinary URL or image path
// The image should show a dark spherical object with intricate maze/labyrinth pattern
const globeImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767770805/67_eusmx6.png";

const Experience = () => {
  const projects = [
    {
      title: "Highly sensitive state-level challenges,",
      description: "creating stabilising frameworks across security, governance, climate, and regional systems.",
    },
    {
      title: "Transition architectures,",
      description: "guiding sovereign shifts into the Information Era across major world powers.",
    },
    {
      title: "Sovereign and private capital allocation strategy,",
      description: "mass capital allocation strategies based on thematics",
    },
    {
      title: "AI and Technology strategy,",
      description: "converting development gaps into profitable, scalable engines of prosperity.",
    },
    {
      title: "Economic and industrial systems,",
      description: "strengthening national competitiveness, productivity, and long-term growth across continents.",
    },
    {
      title: "Human security and societal resilience,",
      description: "reshaping education, inclusion, and workforce adaptation for technological disruption.",
    },
  ];

  return (
    <Layout>
      {/* Hero Banner - Strategic Counsel */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Background */}
        <div
          className="block md:hidden w-full relative"
          style={{
            backgroundImage: `url(${heroImageMobile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl font-bold">
                Experience
              </h1>
            </div>
          </div>
        </div>
        {/* Desktop Background */}
        <div
          className="hidden md:block w-full relative"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl md:text-2xl lg:text-3xl font-bold">
                Experience
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - White Background */}
      <section className="min-h-screen bg-white py-8 md:py-12">
        <div className="container-custom section-padding max-w-[1400px]">
          {/* Top Header Section */}
          <div className="mb-6">
            {/* Top Left - Title */}
          </div>

          {/* Main Layout: Globe Image Left (1/3) + Content Right (2/3) */}
          <div className="flex gap-6 md:gap-8 items-stretch">
            {/* Left Side - Globe Image (1/3 width) */}
            <div className="w-1/3 flex-shrink-0 flex">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img 
                  src={globeImage}
                  alt="Dark spherical object with intricate maze pattern"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content (2/3 width) */}
            <div className="w-2/3 flex-shrink-0">
              <div className="space-y-6">
                {/* Main Heading */}
                <h2 className="font-sans text-xl md:text-2xl font-bold text-primary">
                  PROJECTS & INTERVENTION AREAS
                </h2>

                {/* Projects List */}
                <ul className="space-y-3 font-sans text-base md:text-lg text-black leading-relaxed" style={{ listStyleType: 'square', paddingLeft: '1.5rem' }}>
                  {projects.map((project, index) => (
                    <li key={index}>
                      <span className="font-bold">{project.title}</span> {project.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Red Line */}
          <div className="mt-12 border-t border-red-500"></div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
