import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { articlesAPI } from "@/services/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  bannerImageUrl?: string;
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

// Extract year from date string (e.g., "December 2025" -> "2025")
const extractYear = (dateStr: string): string | null => {
  if (!dateStr || typeof dateStr !== 'string') {
    return null;
  }

  try {
    const trimmed = dateStr.trim();
    const parts = trimmed.split(/\s+/);

    if (parts.length !== 2) {
      return null;
    }

    const year = parseInt(parts[1], 10);
    if (isNaN(year) || year < 1900 || year > 2100) {
      return null;
    }

    return year.toString();
  } catch (error) {
    return null;
  }
};

// Get unique years from articles, sorted descending
const getUniqueYears = (articles: Article[]): string[] => {
  const years = new Set<string>();
  
  articles.forEach(article => {
    const year = extractYear(article.date);
    if (year) {
      years.add(year);
    }
  });

  return Array.from(years).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
};

const ContentLibrary = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesAPI.getAll();
        // Sort articles by date (latest first)
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

  // Get unique years for the filter dropdown
  const uniqueYears = getUniqueYears(articles);

  // Filter articles based on selected year
  const filteredArticles = selectedYear === 'all'
    ? articles
    : articles.filter(article => {
        const year = extractYear(article.date);
        return year === selectedYear;
      });

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container-custom section-padding">
          {/* Header with Title and Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Selected Pivotal Thinking
            </h1>
            <div className="w-full md:w-auto md:min-w-[120px]">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-[120px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Article List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner text="Loading..." />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {selectedYear === 'all' 
                  ? 'No articles available yet.'
                  : `No articles found for ${selectedYear}.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredArticles.map((article, index) => (
                <div
                  key={article._id}
                  className={`py-6 ${
                    index < filteredArticles.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="mb-2">
                    <p className="text-xs italic text-muted-foreground">
                      {article.date}
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href={article.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight hover:text-primary/80 transition-colors no-underline hover:underline"
                    >
                      {article.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ContentLibrary;

