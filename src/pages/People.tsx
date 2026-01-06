import Layout from "@/components/Layout";
import PersonCard from "@/components/PersonCard";

// Cloudinary URLs for banner images - update these with actual image URLs
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766340034/Gemini_Generated_Image_uiosyuuiosyuuios_iky1pj.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1766340034/Gemini_Generated_Image_uiosyuuiosyuuios_iky1pj.png";

const People = () => {
  const people = [
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
      category: "Peace and Social Transition",
      name: "Garry Jacobs",
      title: "President, CEO, World Academy of Art & Science; Chairman, World University Consortium",
      drawingOn: [
        "800 leading scientists and scholars",
        "5 key programmes of peaceful social change"
      ],
    },
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
      {/* Hero Section - Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Background - shown only on screens smaller than md (768px) */}
        <div 
          className="block md:hidden w-full relative"
          style={{ 
            backgroundImage: `url(${heroImageMobile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl font-bold">
                People
              </h1>
            </div>
          </div>
        </div>
        {/* Desktop Background - shown only on md screens and larger (768px+) */}
        <div 
          className="hidden md:block w-full relative"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl font-bold">
                People
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* People Section */}
      <section className="py-24 bg-muted">
        <div className="container-custom section-padding">
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

export default People;

