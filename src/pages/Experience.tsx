import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

// Hero banner images
const heroBackgroundDesktop = "https://res.cloudinary.com/dqataciy5/image/upload/v1767372426/Frame_1707483135_1_aa8n1n.png";
const heroBackgroundMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1767373126/Frame_1707483148_2_lb3w4k.png";

const Experience = () => {
  const projects = [
    {
      number: 1,
      title: "Highly sensitive state-level challenges,",
      description: "creating stabilising frameworks across security, governance, climate, and regional systems.",
      buttonLink: "/engage",
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
      buttonLink: "/engage",
      buttonText: "EXPLORE CAPABILITIES",
    },
  ];

  return (
    <Layout>
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Banner Image */}
        <img 
          src={heroBackgroundMobile}
          alt="Experience Banner"
          className="block md:hidden w-full h-auto"
          style={{ maxHeight: '240px', objectFit: 'contain', objectPosition: 'center' }}
        />
        {/* Desktop Banner Image */}
        <img 
          src={heroBackgroundDesktop}
          alt="Experience Banner"
          className="hidden md:block w-full h-auto"
          style={{ maxHeight: '240px', objectFit: 'contain', objectPosition: 'center' }}
        />
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

