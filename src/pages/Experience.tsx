import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

// Hero banner images
const heroBackgroundDesktop = "https://res.cloudinary.com/dqataciy5/image/upload/v1767614174/Frame_1707483135_2_ojrdb0.png";
const heroBackgroundMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1767614144/Frame_1707483125_3_d6vhau.png";

const Experience = () => {
  const projects = [
    {
      number: 1,
      title: "Highly sensitive state-level challenges,",
      description: "creating stabilising frameworks across security, governance, climate, and regional systems.",
      buttonLink: "/about",
      buttonText: "SEE OUR MANDATES",
    },
    {
      number: 2,
      title: "Transition architectures,",
      description: "guiding sovereign shifts into the Information Era across major world powers.",
      buttonLink: "/capabilities/strategic-counsel",
      buttonText: "SEE OUR MANDATES",
    },
    {
      number: 3,
      title: "Sovereign and private capital allocation strategy,",
      description: "mass capital allocation strategies based on thematics",
      buttonLink: "/capabilities/systemic-intervention",
      buttonText: "EXPLORE CAPABILITIES",
    },
    {
      number: 4,
      title: "AI and Technology strategy,",
      description: "converting development gaps into profitable, scalable engines of prosperity.",
      buttonLink: "/capabilities/systemic-intervention",
      buttonText: "EXPLORE CAPABILITIES",
    },
    {
      number: 5,
      title: "Economic & industrial systems,",
      description: "strengthening national competitiveness, productivity, and long-term growth across continents.",
      buttonLink: "/capabilities/strategic-counsel",
      buttonText: "SEE OUR MANDATES",
    },
    {
      number: 6,
      title: "Human security and societal resilience,",
      description: "reshaping education, inclusion, and workforce adaptation for technological disruption.",
      buttonLink: "/capabilities/pivotal-thinking",
      buttonText: "EXPLORE CAPABILITIES",
    },
  ];

  return (
    <Layout>
      {/* Banner Section */}
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
              <h1 className="text-white font-sans text-2xl font-bold">
                Experience
              </h1>
            </div>
          </div>
        </div>
        {/* Desktop Background - shown only on md screens and larger (768px+) */}
        <div 
          className="hidden md:block w-full relative"
          style={{ 
            backgroundImage: `url(${heroBackgroundDesktop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-2xl md:text-3xl lg:text-4xl font-bold">
                Experience
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pt-10 pb-24" style={{ backgroundColor: '#F3F5F7' }}>
        <div className="container-custom section-padding">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary mb-6 md:mb-10 font-extrabold">
            Portfolio of Projects & Interventions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.number}
                number={project.number}
                title={project.title}
                description={project.description}
                buttonLink={project.buttonLink}
                buttonText={project.buttonText}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;

