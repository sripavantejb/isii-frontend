import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import ArticleLoader from "@/components/ArticleLoader";
import { newsAPI } from "@/services/api";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  articleURL: string;
}

const PRESS_NEWS_HERO_IMAGE =
  import.meta.env.VITE_PRESS_NEWS_BANNER_URL ||
  "https://isii-v2.s3.ap-south-1.amazonaws.com/press-new.jpeg";

const PressNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const data = await newsAPI.getAll();
        setNewsItems(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItems();
  }, []);

  return (
    <Layout>
      <section className="relative flex min-h-[180px] items-center bg-primary md:min-h-[220px]">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${PRESS_NEWS_HERO_IMAGE})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(1,0,42,0.88) 0%, rgba(1,0,42,0.62) 42%, rgba(1,0,42,0.28) 100%)",
          }}
        />
        <div className="relative z-10 w-full">
          <div className="container-custom section-padding w-full py-10 md:py-12">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              Press & News
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 md:py-14">
        <div className="container-custom section-padding">
          {loading ? (
            <ArticleLoader count={6} columns={3} variant="public" />
          ) : newsItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No news available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {newsItems.map((newsItem) => (
                <div key={newsItem._id} className="h-full">
                  <NewsCard
                    image={newsItem.imageUrl}
                    title={newsItem.title}
                    description={newsItem.description}
                    articleURL={newsItem.articleURL}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PressNews;
