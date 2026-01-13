import Layout from "@/components/Layout";
import PersonCard from "@/components/PersonCard";

const About = () => {
  const people = [
    {
      category: "Peace and Social Transition",
      name: "Garry Jacobs",
      title: "Advisory Council, Member",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874515/image_23_vvib3c.png",
      drawingOn: [
        "800 leading scientists and scholars",
        "5 key programmes of peaceful social change"
      ],
    },
    {
      category: "Global Transition Architecture",
      name: "Ketan Patel",
      title: "Chairman, and Advisory Council Chair",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874523/image_17_ib3vam.png",
      drawingOn: [
        "100 leading financial institutions strategies",
        "125 leading technology company strategies"
      ],
    },
    {
      category: "Media & Technology Transition",
      name: "Jon Miller",
      title: "Advisory Council, Member",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_20_jqhgll.png",
      drawingOn: [
        "Major mass mobilisation platforms",
        "Leading new media platforms"
      ],
    },
    {
      category: "Tech Security Transition",
      name: "Glenn Gaffney",
      title: "Senior Innovation Fellow, NobleReach Foundation",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768293957/Glenn_jogrhw.jpg",
      drawingOn: [
        "Major US science and technology labs and experts",
        "International network of science and tech expertise"
      ],
    },
    {
      category: "Development Transition",
      name: "Shaurya Doval",
      title: "Co-founder, India Foundation\nDirector, India Foundation\nSenior Team Member, Greater Pacific Capital\nFounder and Managing Director, Torch Investments",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874516/image_26_b0ilzr.png",
      drawingOn: [
        "Development and social economics work",
        "Asia and Middle East network"
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16" style={{ backgroundColor: '#f2f5f7' }}>
        <div className="container-custom section-padding">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            About Us
          </h1>
          <p className="font-serif text-base text-foreground animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Our Mission
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="pt-16 pb-24 bg-background">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Mission Statement
          </h2>
          
          <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
            The Institute for Strategic Intelligence and Intervention (ISII) aims to understand and support in shaping and responding to system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era.
          </p>
        </div>
      </section>

      {/* People Section */}
      <section className="py-24 bg-muted">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-12 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            People
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.map((person) => {
              // Generate slug from name
              const slug = person.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <PersonCard 
                  key={person.name}
                  name={person.name}
                  title={person.title}
                  image={person.image}
                  slug={slug}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
