import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MandateCard from "@/components/MandateCard";

// Cloudinary URLs for images
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767768280/Strategic_Counsel_rm2e9c.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1767768646/1_pl1xvu.png";
const mandateImage1 = "https://res.cloudinary.com/dqataciy5/image/upload/v1767763191/45b069aa-f21e-4757-a97f-429e4850d21a_wggjd4.png";
const mandateImage2 = "https://res.cloudinary.com/dqataciy5/image/upload/v1767769363/4_quwrrz.png";
const mandateImage3 = "https://res.cloudinary.com/dqataciy5/image/upload/v1767763200/e83f258e-eafe-4cd0-ac50-c1b2ede86f8a_tjst81.png";

const StrategicCounsel = () => {
  const mandates = [
    {
      image: mandateImage1,
      title: (
        <>
          <span className="font-bold">Growth and prosperity</span>, and capital allocation for global themes
        </>
      ),
      description: "",
      buttonLink: "/capabilities/strategic-counsel/growth-and-prosperity",
    },
    {
      image: mandateImage2,
      title: (
        <>
          <span className="font-bold">Sovereignty, AI, strategic technologies,</span> and strategic international coalitions
        </>
      ),
      description: "",
      buttonLink: "/capabilities/strategic-counsel/securing-sovereignty",
    },
    {
      image: mandateImage3,
      title: (
        <>
          <span className="font-bold">Strategy and mobilisation</span> for the transition to the Information Era
        </>
      ),
      description: "",
      buttonLink: "/capabilities/strategic-counsel/mobilising-transition",
    },
  ];

  const problems = [
    "Transition the Nation to the Information Era (The National Transition Project)",
    "Build Engines of Enterprise, Growth and Share (The Prosperity Initiative)",
    "Guard and Protect Sovereignty Across All Domains (The National Sovereignty Security Programme)",
    "Create a Global Investment Boom by Turning Needs Into Opportunities via Systems of Enterprise, Growth and Shared Prosperity (The World Investment Plan)",
  ];

  return (
    <Layout>
      {/* Hero Section */}
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
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl font-bold">
                Strategic Counsel
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
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-sans text-xl md:text-2xl lg:text-3xl font-bold">
                Strategic Counsel
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Strategic Mandates Section */}
      <section className="pt-10 md:pt-11 pb-8" style={{ backgroundColor: '#F3F5F7' }}>
        <div className="container-custom section-padding">
          <h2 className="font-sans text-lg md:text-xl text-primary mb-4 md:mb-8 font-bold">
            Targeted Strategic Mandates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {mandates.map((mandate, index) => (
              <MandateCard key={index} {...mandate} />
            ))}
          </div>
        </div>
      </section>

      {/* Intractable Problems Section */}
      <section className="pt-0 pb-6 md:pb-12" style={{ backgroundColor: '#F3F5F7' }}>
        <div className="container-custom section-padding">
          <div className="border-t border-b border-border py-4 md:py-6">
            <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold">
              Intractable Problems
            </p>
          </div>
          {problems.map((problem, index) => (
            <div key={index} className={`border-t ${index === problems.length - 1 ? '' : 'border-b'} border-border py-4 md:py-6`}>
              <p className="font-sans text-lg md:text-xl text-primary leading-relaxed font-bold">
                {problem}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default StrategicCounsel;

