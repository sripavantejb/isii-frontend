import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { reportsAPI } from "@/services/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Extract year from date string (e.g., "December 2025" -> "2025")
const extractYear = (dateStr: string): string | null => {
  if (!dateStr || typeof dateStr !== "string") {
    return null;
  }

  try {
    const trimmed = dateStr.trim();
    const parts = trimmed.split(/\s+/);
    if (parts.length !== 2) return null;

    const year = parseInt(parts[1], 10);
    if (isNaN(year) || year < 1900 || year > 2100) return null;

    return year.toString();
  } catch {
    return null;
  }
};

// Get unique years from items, sorted descending
const getUniqueYears = (items: Report[]): string[] => {
  const years = new Set<string>();

  items.forEach((item) => {
    const year = extractYear(item.date);
    if (year) years.add(year);
  });

  return Array.from(years).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
};

const PerspectivesContentLibrary = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("all");

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

  const uniqueYears = getUniqueYears(reports);

  const filteredReports =
    selectedYear === "all"
      ? reports
      : reports.filter((report) => extractYear(report.date) === selectedYear);

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

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner text="Loading..." />
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {selectedYear === "all"
                  ? "No reports available yet."
                  : `No reports found for ${selectedYear}.`}
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredReports.map((report, index) => (
                <div
                  key={report._id}
                  className={`py-6 ${
                    index < filteredReports.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="mb-2">
                    <p className="text-xs italic text-muted-foreground">{report.date}</p>
                  </div>
                  <div className="mb-3">
                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight hover:text-primary/80 transition-colors no-underline hover:underline"
                    >
                      {report.title}
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

export default PerspectivesContentLibrary;
