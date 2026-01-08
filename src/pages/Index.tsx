import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CapabilityCard from "@/components/CapabilityCard";
import ArticleCard from "@/components/ArticleCard";
import { articlesAPI } from "@/services/api";

const bannerImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1767769831/Frame_1707482985_2_lf7hzs.png";
// Hero section images for different screen sizes
const heroImageLarge = "https://res.cloudinary.com/dqataciy5/image/upload/v1767769170/V2_xh2zpa.png"; // Large screens
const heroImageTablet = "https://res.cloudinary.com/dqataciy5/image/upload/v1767769226/V2_2_afw10k.png"; // Tablet screens
const heroImageMobileMedium = "https://res.cloudinary.com/dqataciy5/image/upload/v1767769677/V2_4_oj7una.png"; // Medium mobiles
const heroImageMobileSmall = "https://res.cloudinary.com/dqataciy5/image/upload/v1767769677/V2_4_oj7una.png"; // Small mobiles

interface Article {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  pdfUrl: string;
}

// Helper function to parse "Month YYYY" format dates
const parseDate = (dateStr: string): Date => {
  if (!dateStr || typeof dateStr !== 'string') {
    return new Date(0); // Invalid date - will be sorted to the end
  }

  try {
    const months: { [key: string]: number } = {
      'january': 0, 'february': 1, 'march': 2, 'april': 3,
      'may': 4, 'june': 5, 'july': 6, 'august': 7,
      'september': 8, 'october': 9, 'november': 10, 'december': 11
    };

    const trimmed = dateStr.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);

    if (parts.length !== 2) {
      return new Date(0); // Invalid format
    }

    const monthName = parts[0];
    const month = months[monthName];
    const year = parseInt(parts[1], 10);

    if (month === undefined || isNaN(year) || year < 1900 || year > 2100) {
      return new Date(0); // Invalid month or year
    }

    return new Date(year, month, 1);
  } catch (error) {
    return new Date(0); // Return epoch for invalid dates
  }
};

// Sort articles by date (latest first)
const sortArticlesByDate = (articles: Article[]): Article[] => {
  return [...articles].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    // Sort descending (newest first)
    // Invalid dates (epoch) will be sorted to the end
    if (dateA.getTime() === 0 && dateB.getTime() === 0) return 0;
    if (dateA.getTime() === 0) return 1; // Invalid dates go to end
    if (dateB.getTime() === 0) return -1; // Valid dates come first

    return dateB.getTime() - dateA.getTime();
  });
};

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesAPI.getAll();
        // Sort articles by date (latest first) as a fallback
        const sortedArticles = sortArticlesByDate(data);
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const capabilities = [
    {
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767762856/835eebcd-2fca-4b77-810e-cd5ed443293a_zjmxv6.jpg",
      title: "Pivotal Thinking",
      description: "Generating strategic intelligence to understand transitions, shocks, inflection points across geopolitics, technology, economics, climate and society.",
      buttonText: "All Pivotal Thinking",
      buttonLink: "/capabilities/pivotal-thinking",
    },
    {
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767769363/4_quwrrz.png",
      title: "Strategic Counsel",
      description: "Supporting governments, blocs and institutions as they navigate structural change.",
      buttonText: "See Our Mandates",
      buttonLink: "/capabilities/strategic-counsel",
    },
    {
      image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767762861/65e9eeed-8441-41e9-a7d6-2d19643f86be_x3kheg.jpg",
      title: "Programmes",
      description: "Executing interventions to stabilise environments, mobilise capital and technology, and convert gaps into engines of prosperity.",
      buttonText: "Explore Programmes",
      buttonLink: "/capabilities/systemic-intervention",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center overflow-hidden" style={{ backgroundColor: '#040750' }}>
        {/* Small mobiles - default (below 640px) */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:hidden"
          style={{ 
            backgroundImage: `url(${heroImageMobileSmall})`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        {/* Medium mobiles - sm: (640px+) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden sm:block md:hidden"
          style={{ 
            backgroundImage: `url(${heroImageMobileMedium})`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        {/* Tablet screens - md: (768px+) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden md:block lg:hidden"
          style={{ 
            backgroundImage: `url(${heroImageTablet})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        {/* Large screens - lg: (1024px+) */}
        <div 
          className="absolute inset-0 bg-cover bg-center hidden lg:block"
          style={{ 
            backgroundImage: `url(${heroImageLarge})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 'calc(100vh - 80px)',
            width: '100%'
          }}
        />
        
        <div className="relative z-10 container-custom section-padding w-full">
          <div className="max-w-[600px]">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-accent mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              ISII
            </h1>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              Institute for Strategic Intelligence<br />
              and Intervention
            </h2>
            <p className="text-primary-foreground/90 leading-relaxed mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              The Institute for Strategic Intelligence and Intervention (ISII) aims to understand and support in shaping and responding to system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era.
            </p>
            <div className="animate-fade-in" style={{ willChange: "opacity, transform" }}>
              <Button variant="hero" size="lg" className="text-primary font-bold hover:bg-accent" asChild>
                <Link to="/about/mission">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="mt-6 md:mt-10">
        <div className="container-custom section-padding">
          <div className="relative flex items-center overflow-hidden h-[640px] md:h-auto md:min-h-[384px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${bannerImage})`,
                height: '100%',
              }}
            />
            <div className="relative z-10 w-full h-full flex items-center">
              <div className="w-full py-16 md:py-20 px-6 md:px-8">
                <div className="text-left flex flex-col" style={{ gap: '10px' }}>
                  <span className="inline-block bg-primary px-4 py-1.5 text-xs text-primary-foreground tracking-wider w-fit font-bold">
                    Our Latest Pivotal Thinking
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground text-left leading-relaxed">
                    <span className="md:hidden">
                      America the Merchant Power, The National Security Strategy 2025
                    </span>
                    <span className="hidden md:block">
                      America the Merchant Power,<br />
                      <span style={{ display: 'block', marginTop: '0.5rem' }}>The National Security Strategy 2025</span>
                    </span>
                  </h2>
                  <div className="text-left">
                    {articles.length > 0 && articles[0]?.pdfUrl ? (
                      <Button variant="outline-light" asChild>
                        <a 
                          href={articles[0].pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Read More
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline-light" asChild>
                        <Link to="/capabilities/pivotal-thinking">Read More</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pivotal Thinking Cards Section */}
      {articles.length > 1 && (
        <section className="pt-8 pb-8 md:pb-12 bg-background">
          <div className="container-custom section-padding">
            <div className="grid md:grid-cols-3 gap-8">
              {articles.slice(1, 4).map((article) => (
                <div key={article._id} className="h-full">
                  <ArticleCard 
                    image={article.imageUrl}
                    date={article.date}
                    title={article.title}
                    link={article.pdfUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programmes Section */}
      <section
        className="pt-8 md:pt-12 pb-16 md:pb-24"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="container-custom section-padding">
          <h2 className="font-serif text-3xl md:text-4xl text-primary text-center mb-4 md:mb-8 font-bold">
            Our Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability) => (
              <CapabilityCard key={capability.title} {...capability} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
