import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { articlesAPI } from "@/services/api";
import pivotalHero from "@/assets/pivotal-thinking-hero.jpg";

interface Article {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  pdfUrl: string;
}

const PivotalThinking = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await articlesAPI.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-primary">
        <div className="container-custom section-padding">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            <Link to="/capabilities/pivotal-thinking" className="hover:text-primary-foreground">
              Capabilities
            </Link>
            <span>/</span>
            <span className="text-primary-foreground">Pivotal Thinking</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Pivotal Thinking
          </h1>
          
          <p className="text-primary-foreground/80 animate-fade-in" style={{ willChange: "opacity, transform" }}>
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
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Article Cards */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles available yet.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {articles.slice(0, 6).map((article) => (
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
              )}
            </div>
            
            {/* Right Column - Content Library Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                Content Library
              </h2>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : articles.length === 0 ? (
                <p className="text-muted-foreground">No articles available yet.</p>
              ) : articles.slice(6).length === 0 ? (
                <p className="text-muted-foreground">No additional articles.</p>
              ) : (
                <ol className="space-y-4">
                  {articles.slice(6).map((article, index) => (
                    <li key={article._id} className="animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      <a 
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80 transition-colors"
                      >
                        {index + 7}. {article.title}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PivotalThinking;
