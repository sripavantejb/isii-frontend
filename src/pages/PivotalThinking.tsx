import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import article4 from "@/assets/article-4.jpg";
import article5 from "@/assets/article-5.jpg";
import article6 from "@/assets/article-6.jpg";
import pivotalHero from "@/assets/pivotal-thinking-hero.jpg";

const PivotalThinking = () => {
  const articles = [
    {
      image: article1,
      date: "December 2025",
      title: "America the Merchant Power, The National Security Strategy 2025",
      link: "#",
    },
    {
      image: article2,
      date: "November 2025",
      title: "The Tech-Leveraged Empire: Strategic Limits of U.S. Power",
      link: "#",
    },
    {
      image: article3,
      date: "October 2025",
      title: "America's New Golden Age or a Gilded One?",
      link: "#",
    },
    {
      image: article4,
      date: "September 2025",
      title: "The World Investment Plan: Leveraging Capital Markets for a Peaceful Transition to the Information Era",
      link: "#",
    },
    {
      image: article5,
      date: "August 2025",
      title: "Turbulent Times: A Framework for Navigating Global Crisis Through Conscious Transformation",
      link: "#",
    },
    {
      image: article6,
      date: "July 2025",
      title: "Project 2025, Trump, and the Remaking of the World",
      link: "#",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-primary">
        <div className="container-custom section-padding">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4 animate-fade-in">
            <Link to="/capabilities/pivotal-thinking" className="hover:text-primary-foreground">
              Capabilities
            </Link>
            <span>/</span>
            <span className="text-primary-foreground">Pivotal Thinking</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Pivotal Thinking
          </h1>
          
          <p className="text-primary-foreground/80 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Generating strategic intelligence to understand transitions, shocks, and inflection points across geopolitics, technology, economics, climate and society.
          </p>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative py-36 md:py-18">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pivotalHero})` }}
        />
      </section>

      {/* Content Library */}
      <section id="content-library" className="py-24 bg-background">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-2xl md:text-3xl text-primary mb-12 animate-fade-in">
            Content Library
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={article.title} className="h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <ArticleCard {...article} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PivotalThinking;
