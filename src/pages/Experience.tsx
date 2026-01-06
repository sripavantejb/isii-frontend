import Layout from "@/components/Layout";

// Placeholder for the dark spherical globe/maze image - update with actual Cloudinary URL or image path
// The image should show a dark spherical object with intricate maze/labyrinth pattern
const globeImage = "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80";

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
      {/* Main Content Section - White Background */}
      <section className="min-h-screen bg-white py-8 md:py-12">
        <div className="container-custom section-padding max-w-[1400px]">
          {/* Top Header Section */}
          <div className="mb-6">
            {/* Top Left - Title */}
            <div>
              <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary underline decoration-primary decoration-1 underline-offset-2">
                Experience
              </h1>
            </div>
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
