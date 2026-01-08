import Layout from "@/components/Layout";
import PersonCard from "@/components/PersonCard";

const About = () => {
  const people = [
    {
      category: "Economic & Climate Transition",
      name: "Phoebe Koundouri",
      title: "Prof School of Economics & Director Research, Athens University; Director, AE4RIA",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1766565203/unnamed_nnjx6n.png",
      drawingOn: [
        "SDSN network of 1,700 members in 144 countries",
        "200 multi-disciplinary sustainability scholars"
      ],
    },
    {
      category: "Peace and Social Transition",
      name: "Garry Jacobs",
      title: "President, CEO, World Academy of Art & Science; Chairman, World University Consortium",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767780415/8d971de5-d8da-4906-aacb-363f751d5f1f_sabdiq.png",
      drawingOn: [
        "800 leading scientists and scholars",
        "5 key programmes of peaceful social change"
      ],
    },
    {
      category: "Global Transition Architecture",
      name: "Ketan Patel",
      title: "Chair, Force for Good; CEO, Greater Pacific Capital; Former Head, Strategic Group, Goldman Sachs",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1766565195/unnamed_1_ih4miy.png",
      drawingOn: [
        "100 leading financial institutions strategies",
        "125 leading technology company strategies"
      ],
    },
    {
      category: "Media & Technology Transition",
      name: "Jon Miller",
      title: "CEO of Integrated Media, Former Chairman and CEO of AOL; NewsCorp Online Media Group",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1766565190/unnamed_2_jkokbt.png",
      drawingOn: [
        "Major mass mobilisation platforms",
        "Leading new media platforms"
      ],
    },
    {
      category: "Tech Security Transition",
      name: "Glenn Gaffney",
      title: "Former Director, Science and Technology, CIA; EVP, IQT; Founder NobleReach",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1766565187/unnamed_3_vjxsqa.png",
      drawingOn: [
        "Major US science and technology labs and experts",
        "International network of science and tech expertise"
      ],
    },
    {
      category: "Development Transition",
      name: "Shaurya Doval",
      title: "Founder India Foundation, Zeus Capital, Morgan Stanley, GE",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1766565185/unnamed_lwetam.jpg",
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {people.map((person) => (
              <div key={person.name} className="flex">
                <PersonCard {...person} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
