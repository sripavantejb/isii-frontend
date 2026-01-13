import Layout from "@/components/Layout";
import ParticipationBanner from "@/components/ParticipationBanner";

// Strategic Counsel banner images (mobile / desktop)
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295396/Strategic_Counsel_7_j3ou44.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295398/1_3_h04dcl.png";

// Placeholder for the dark spherical globe/maze image - update with actual Cloudinary URL or image path
// The image should show a dark spherical object with intricate maze/labyrinth pattern
const globeImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767878872/67_3_n4pky9.png";

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
            backgroundColor: '#001429',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        >
          <div className="absolute inset-0 flex items-center">
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
            backgroundColor: '#001429',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl md:text-2xl lg:text-3xl font-bold">
                Experience
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - White Background */}
      <section className="min-h-screen bg-white pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="container-custom section-padding">
          {/* Grid Layout: Image aligns with Experience heading, Text aligns with navbar */}
          <div className="grid md:grid-cols-12 gap-0 items-stretch">
            {/* Left Side - Globe Image (aligns with Experience heading start) */}
            <div className="hidden md:flex md:col-span-4 items-start">
              <img 
                src={globeImage}
                alt="Dark spherical object with intricate maze pattern"
                className="w-full object-contain"
                style={{ maxHeight: '80%', marginTop: '-1rem' }}
              />
            </div>

            {/* Right Side - Content (aligns with navbar end) */}
            <div className="md:col-span-8" style={{ marginLeft: '-1rem' }}>
              <div className="space-y-4">
                {/* Main Heading */}
                <h2 className="font-sans text-xl md:text-2xl font-bold text-primary">
                  Projects and Intervention Areas
                </h2>

                {/* Projects List */}
                <ul className="space-y-2 font-sans text-base md:text-lg text-black leading-relaxed" style={{ listStyleType: 'square', paddingLeft: '1.5rem' }}>
                  {projects.map((project, index) => (
                    <li key={index}>
                      <span className="font-bold">{project.title}</span> {project.description}
                    </li>
                  ))}
                </ul>
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

export default Experience;
