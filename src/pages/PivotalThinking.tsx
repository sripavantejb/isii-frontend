import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { articlesAPI } from "@/services/api";
import pivotalHero from "@/assets/pivotal-thinking-hero.jpg";
import ArticleLoader from "@/components/ArticleLoader";
import { ArrowRight } from "lucide-react";

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
          <p className="text-primary-foreground/70 text-xl md:text-2xl font-bold mb-2 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            ISII Labs
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
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

      {/* Article Cards Section */}
      <section className="pt-8 pb-24 bg-background">
        <div className="container-custom section-padding">
          {loading ? (
            <ArticleLoader count={6} columns={3} variant="public" />
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles available yet.</p>
            </div>
          ) : (
            <>
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
              {/* Content Library Link */}
              <div className="mt-12">
                <Link 
                  to="/capabilities/pivotal-thinking/content-library"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                >
                  Content Library <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PivotalThinking;
