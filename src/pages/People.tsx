import Layout from "@/components/Layout";
import PersonCard from "@/components/PersonCard";

// Cloudinary URLs for banner images - update these with actual image URLs
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295137/Our_Mission_1_hkd0kr.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1768295139/3_1_ancnmk.png";

const People = () => {
  const people = [
    {
      name: "Ketan Patel",
      title: "Chair, Force for Good\nCEO, Greater Pacific Capital\nFormer Head, Strategic Group, Goldman Sachs",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768300213/2062_zy5udw.png",
      slug: "ketan-patel",
      category: "Global Transition Architecture",
      drawingOn: [
        "100 leading financial institutions strategies",
        "125 leading technology company strategies"
      ],
    },
    {
      name: "Glenn Gaffney",
      title: "Former Director, Science and Technology, CIA\nEVP, IQT\nFounder NobleReach",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768293957/Glenn_jogrhw.jpg",
      slug: "glenn-gaffney",
      category: "Tech Security Transition",
      drawingOn: [
        "Major US science and technology labs and experts",
        "International network of science and tech expertise"
      ],
    },
    {
      name: "Jon Miller",
      title: "CEO of Integrated Media\nFormer Chairman and CEO of AOL\nNewsCorp Online Media Group",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_20_jqhgll.png",
      slug: "jon-miller",
      category: "Media & Technology Transition",
      drawingOn: [
        "Major mass mobilisation platforms",
        "Leading new media platforms"
      ],
    },
    {
      name: "Garry Jacobs",
      title: "President, CEO, World Academy of Art & Science\nChairman, World University Consortium",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768300215/2066_fsynfy.png",
      slug: "garry-jacobs",
      category: "Peace and Social Transition",
      drawingOn: [
        "800 leading scientists and scholars",
        "5 key programmes of peaceful social change"
      ],
    },
    {
      name: "Shaurya Doval",
      title: "Co-founder & Director, India Foundation\nSenior Team Member, GPC\nFounder and MD, Torch Investments",
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768299980/2065_2_k6cymo.png",
      slug: "shaurya-doval",
      category: "Development Transition",
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
      <section className="pt-4 md:pt-8 pb-24" style={{ backgroundColor: '#f4f5f7' }}>
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {people.map((person) => (
              <PersonCard 
                key={person.name}
                name={person.name}
                title={person.title}
                image={person.image}
                slug={person.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default People;

