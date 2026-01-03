import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { articlesAPI } from "@/services/api";
import pivotalHero from "@/assets/pivotal-thinking-hero.jpg";
import ArticleLoader from "@/components/ArticleLoader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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

const PivotalThinking = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesAPI.getAll();
        // Sort articles by date (latest first) as a fallback
        const sortedArticles = sortArticlesByDate(data);
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
                <ArticleLoader count={6} columns={3} variant="public" />
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
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                Content Library
              </h2>
              {loading ? (
                <LoadingSpinner text="Loading..." />
              ) : articles.length === 0 ? (
                <p className="text-muted-foreground">No articles available yet.</p>
              ) : articles.slice(6).length === 0 ? (
                <p className="text-muted-foreground">No additional articles.</p>
              ) : (
                <div className="max-h-[600px] overflow-y-scroll pr-2 transition-shadow duration-300 hover:shadow-lg rounded-lg p-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1b315b #f3f5f7' }}>
                  <style>{`
                    div::-webkit-scrollbar {
                      width: 4px;
                    }
                    div::-webkit-scrollbar-track {
                      background: #f3f5f7;
                      border-radius: 2px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: #1b315b;
                      border-radius: 2px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: #0f1f3d;
                    }
                  `}</style>
                  <ol className="space-y-4">
                    {articles.slice(6).map((article, index) => (
                      <li key={article._id} className="animate-fade-in" style={{ willChange: "opacity, transform" }}>
                        <a 
                          href={article.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary/80 transition-colors"
                        >
                          {index + 1}. {article.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PivotalThinking;
