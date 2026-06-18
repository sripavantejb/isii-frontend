import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { perspectivesAPI } from "@/services/api"; // Use perspectivesAPI
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMaskedFileUrl } from "@/lib/fileUrls";

interface Article {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  bannerImageUrl?: string;
  pdfUrl: string;
}

const parseDate = (dateStr: string): Date => {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  try {
    const months: { [key: string]: number } = { 'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5, 'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11 };
    const trimmed = dateStr.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    if (parts.length !== 2) return new Date(0);
    const month = months[parts[0]];
    const year = parseInt(parts[1], 10);
    if (month === undefined || isNaN(year) || year < 1900 || year > 2100) return new Date(0);
    return new Date(year, month, 1);
  } catch { return new Date(0); }
};

const sortArticlesByDate = (articles: Article[]): Article[] => {
  return [...articles].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

const extractYear = (dateStr: string): string | null => {
  if (!dateStr || typeof dateStr !== 'string') return null;
  try {
    const trimmed = dateStr.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length !== 2) return null;
    const year = parseInt(parts[1], 10);
    if (isNaN(year) || year < 1900 || year > 2100) return null;
    return year.toString();
  } catch { return null; }
};

const getUniqueYears = (articles: Article[]): string[] => {
  const years = new Set<string>();
  articles.forEach(article => {
    const year = extractYear(article.date);
    if (year) years.add(year);
  });
  return Array.from(years).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
};

const PerspectivesLibrary = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await perspectivesAPI.getAll(); // Use perspectivesAPI
        const sortedArticles = sortArticlesByDate(data);
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Failed to fetch perspectives:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const uniqueYears = getUniqueYears(articles);
  const filteredArticles = selectedYear === 'all'
    ? articles
    : articles.filter(article => extractYear(article.date) === selectedYear);

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container-custom section-padding">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Selected Perspectives
            </h1>
            <div className="w-full md:w-auto md:min-w-[120px]">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-[120px]"><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {uniqueYears.map((year) => (<SelectItem key={year} value={year}>{year}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><LoadingSpinner text="Loading..." /></div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{selectedYear === 'all' ? 'No perspectives available yet.' : `No perspectives found for ${selectedYear}.`}</p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredArticles.map((article, index) => (
                <div key={article._id} className={`py-6 ${index < filteredArticles.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="mb-2"><p className="text-xs italic text-muted-foreground">{article.date}</p></div>
                  <div className="mb-3">
                    <a href={getMaskedFileUrl(article.pdfUrl)} target="_blank" rel="noopener noreferrer" className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight hover:text-primary/80 transition-colors no-underline hover:underline">
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

export default PerspectivesLibrary;
