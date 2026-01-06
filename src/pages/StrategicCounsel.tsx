import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MandateCard from "@/components/MandateCard";

// Cloudinary URLs for images
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767614174/Frame_1707483135_2_ojrdb0.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1767614144/Frame_1707483125_3_d6vhau.png";
const mandateImage1 = "https://res.cloudinary.com/dqataciy5/image/upload/v1767362594/Rectangle_3463579_zpi2mc.png";
const mandateImage2 = "https://res.cloudinary.com/dqataciy5/image/upload/v1767362661/Rectangle_3463579_1_d7dslx.png";
const mandateImage3 = "https://res.cloudinary.com/dqataciy5/image/upload/v1767362666/Rectangle_3463579_2_pabgfw.png";

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
      buttonLink: "#",
    },
    {
      image: mandateImage3,
      title: (
        <>
          <span className="font-bold">Strategy and mobilisation</span> for the transition to the Information Era
        </>
      ),
      description: "",
      buttonLink: "#",
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
              <p className="text-white/70 text-xl font-bold mb-1">
                ISII Labs
              </p>
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
              <p className="text-white/70 text-xl md:text-2xl font-bold mb-1">
                ISII Labs
              </p>
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

