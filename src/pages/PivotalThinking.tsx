import { useEffect, useState, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Force scrollbar to always be visible
  useEffect(() => {
    if (scrollContainerRef.current) {
      const element = scrollContainerRef.current;
      // Force scrollbar to be visible
      element.style.overflowY = 'scroll';
      
      // Function to keep scrollbar visible
      const keepScrollbarVisible = () => {
        if (element) {
          // Store current scroll position
          const currentScroll = element.scrollTop;
          // Temporarily scroll 1px down and back to trigger scrollbar visibility
          element.scrollTop = currentScroll + 1;
          setTimeout(() => {
            element.scrollTop = currentScroll;
          }, 10);
        }
      };
      
      // Trigger immediately
      keepScrollbarVisible();
      
      // Set up interval to keep scrollbar visible (every 500ms)
      const interval = setInterval(keepScrollbarVisible, 500);
      
      // Also trigger on mouse enter to ensure visibility
      const handleMouseEnter = () => {
        keepScrollbarVisible();
      };
      
      element.addEventListener('mouseenter', handleMouseEnter);
      
      return () => {
        clearInterval(interval);
        element.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [articles]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-primary">
        <div className="container-custom section-padding">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Pivotal Thinking
          </h1>
          
          <p className="text-primary-foreground/80 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Generating strategic intelligence to understand transitions, shocks, and inflection points across geopolitics, technology, economics, climate and society.
          </p>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative w-full overflow-hidden" style={{ maxWidth: '1920px', height: '188px', opacity: 1, margin: '0 auto' }}>
        <img 
          src={pivotalHero}
          alt="Pivotal Thinking Banner"
          style={{ width: '100%', height: '288px', maxWidth: '1920px', objectFit: 'cover', opacity: 1 }}
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
                <>
                  <style>{`
                    .content-library-scroll {
                      scrollbar-width: thin;
                      scrollbar-color: #1b315b #f3f5f7;
                      scrollbar-gutter: stable;
                    }
                    .content-library-scroll::-webkit-scrollbar {
                      width: 14px;
                      -webkit-appearance: none;
                      background: transparent;
                    }
                    .content-library-scroll::-webkit-scrollbar:vertical {
                      width: 14px;
                    }
                    .content-library-scroll::-webkit-scrollbar-track {
                      background: #f3f5f7;
                      border-radius: 7px;
                      border: 1px solid #e5e7eb;
                      -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.1);
                    }
                    .content-library-scroll::-webkit-scrollbar-thumb {
                      background-color: #1b315b;
                      border-radius: 7px;
                      border: 2px solid #f3f5f7;
                      min-height: 30px;
                      background-clip: padding-box;
                    }
                    .content-library-scroll::-webkit-scrollbar-thumb:hover {
                      background-color: #0f1f3d;
                    }
                    .content-library-scroll::-webkit-scrollbar-thumb:active {
                      background-color: #0a1629;
                    }
                    .content-library-scroll::-webkit-scrollbar-corner {
                      background: #f3f5f7;
                    }
                  `}</style>
                  <div 
                    ref={scrollContainerRef}
                    className="content-library-scroll border border-border rounded-lg p-4"
                    style={{ 
                      height: '530px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                      scrollbarGutter: 'stable',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <ol className="space-y-4 pr-2">
                      {articles.slice(6).map((article, index) => (
                        <li key={article._id} className="animate-fade-in" style={{ willChange: "opacity, transform" }}>
                          <a 
                            href={article.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary underline hover:text-primary/80 transition-colors"
                          >
                            {index + 1}. {article.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PivotalThinking;
