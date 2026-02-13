import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { reportsAPI } from "@/services/api";
import ArticleLoader from "@/components/ArticleLoader";
import { ArrowRight } from "lucide-react";

interface Report {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  bannerImageUrl?: string;
  pdfUrl: string;
}

// Helper function to parse "Month YYYY" format dates
const parseDate = (dateStr: string): Date => {
  if (!dateStr || typeof dateStr !== "string") {
    return new Date(0);
  }

  try {
    const months: { [key: string]: number } = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    };

    const trimmed = dateStr.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);

    if (parts.length !== 2) return new Date(0);

    const monthName = parts[0];
    const month = months[monthName];
    const year = parseInt(parts[1], 10);

    if (month === undefined || isNaN(year) || year < 1900 || year > 2100) {
      return new Date(0);
    }

    return new Date(year, month, 1);
  } catch {
    return new Date(0);
  }
};

// Sort items by date (latest first)
const sortByDate = (items: Report[]): Report[] => {
  return [...items].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    if (dateA.getTime() === 0 && dateB.getTime() === 0) return 0;
    if (dateA.getTime() === 0) return 1;
    if (dateB.getTime() === 0) return -1;

    return dateB.getTime() - dateA.getTime();
  });
};

const Perspectives = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportsAPI.getAll();
        const sorted = sortByDate(data);
        setReports(sorted);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-primary relative">
        {/* Mobile background image */}
        <div
          className="md:hidden absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dqataciy5/image/upload/v1770375937/Frame_1707483159_2_z3ycdd.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Desktop background image */}
        <div
          className="hidden md:block absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dqataciy5/image/upload/v1770372554/Pivotal_Thinking_3_feszon.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="container-custom section-padding relative z-10">
          <h1
            className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4 animate-fade-in"
            style={{ willChange: "opacity, transform" }}
          >
            Perspectives
          </h1>

          <p
            className="text-primary-foreground/80 animate-fade-in"
            style={{ willChange: "opacity, transform" }}
          >
            Reports and strategic insights published across geopolitics, technology, economics, climate and society.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="pt-8 pb-24 bg-background">
        <div className="container-custom section-padding">
          {loading ? (
            <ArticleLoader count={6} columns={3} variant="public" />
          ) : reports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reports available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {reports.slice(0, 6).map((report) => (
                  <div key={report._id} className="h-full">
                    <ArticleCard
                      image={report.imageUrl}
                      date={report.date}
                      title={report.title}
                      link={report.pdfUrl}
                    />
                  </div>
                ))}
              </div>

              {/* Content Library Link */}
              <div className="mt-12">
                <Link
                  to="/capabilities/perspectives/content-library"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                >
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
