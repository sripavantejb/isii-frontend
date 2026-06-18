import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import ArticleLoader from "@/components/ArticleLoader";
import { newsAPI } from "@/services/api";
import { getMaskedFileUrl } from "@/lib/fileUrls";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  articleURL?: string;
  articleFileUrl?: string;
  publishedAt: string;
}

const PRESS_NEWS_HERO_IMAGE =
  import.meta.env.VITE_PRESS_NEWS_BANNER_URL ||
  "https://isii-v2.s3.ap-south-1.amazonaws.com/images/ChatGPT+Image+Mar+25%2C+2026%2C+10_49_16+PM+(1)+(1).png";

const getNewsItemArticleUrl = (newsItem: NewsItem) =>
  getMaskedFileUrl(newsItem.articleURL || "") ||
  getMaskedFileUrl(newsItem.articleFileUrl || "") ||
  "#";

const PressNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const data = await newsAPI.getAll();
        const sortedNewsItems = [...data].sort((firstItem, secondItem) => {
          const firstTimestamp = new Date(firstItem.publishedAt).getTime();
          const secondTimestamp = new Date(secondItem.publishedAt).getTime();
          return secondTimestamp - firstTimestamp;
        });
        setNewsItems(sortedNewsItems);
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
      <section className="relative flex min-h-[180px] items-center bg-primary py-12">
        <img
          src={PRESS_NEWS_HERO_IMAGE}
          alt="Press & News banner"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(1,0,42,0.58) 0%, rgba(1,0,42,0.32) 42%, rgba(1,0,42,0.12) 100%)",
          }}
        />
        <div className="relative z-10 w-full">
          <div className="container-custom section-padding w-full">
            <h1 className="mb-4 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
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
                    articleURL={getNewsItemArticleUrl(newsItem)}
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
