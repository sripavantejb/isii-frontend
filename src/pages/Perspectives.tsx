import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { perspectivesAPI } from "@/services/api";
import ArticleLoader from "@/components/ArticleLoader";
import { ArrowRight } from "lucide-react";
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
    const parts = dateStr.trim().toLowerCase().split(/\s+/);
    if (parts.length !== 2) return new Date(0);
    const month = months[parts[0]];
    const year = parseInt(parts[1], 10);
    if (month === undefined || isNaN(year)) return new Date(0);
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

const Perspectives = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await perspectivesAPI.getAll();
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

  return (
    <Layout>
      <section className="py-12 bg-primary relative">
        <div className="md:hidden absolute inset-0 z-0" style={{ backgroundImage: `url(https://res.cloudinary.com/dqataciy5/image/upload/v1770375937/Frame_1707483159_2_z3ycdd.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div className="hidden md:block absolute inset-0 z-0" style={{ backgroundImage: `url(https://res.cloudinary.com/dqataciy5/image/upload/v1770372554/Pivotal_Thinking_3_feszon.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div className="container-custom section-padding relative z-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 animate-fade-in">
            Perspectives
          </h1>
          <p className="text-primary-foreground/80 animate-fade-in">
            Reports and strategic insights published across geopolitics, technology, economics, climate and society.
          </p>
        </div>
      </section>

      <section className="pt-8 pb-24 bg-background">
        <div className="container-custom section-padding">
          {loading ? (
            <ArticleLoader count={6} columns={3} variant="public" />
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No perspectives available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {articles.slice(0, 6).map((article) => (
                  <div key={article._id} className="h-full">
                    <ArticleCard image={article.imageUrl} date={article.date} title={article.title} link={getMaskedFileUrl(article.pdfUrl)} />
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/capabilities/perspectives/content-library" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-lg">
                  Selected Perspectives <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Perspectives;
