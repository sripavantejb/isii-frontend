import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ArticleLoader from "@/components/ArticleLoader";
import SEOHead from "@/components/SEOHead";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { newsAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  articleURL?: string;
  articleFileUrl?: string;
  publishedAt: string;
}

const NewsDashboard = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      setLoading(true);
      const data = await newsAPI.getAll();
      setNewsItems(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setNewsToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!newsToDelete) return;

    try {
      await newsAPI.delete(newsToDelete);
      toast.success("News deleted successfully");
      setDeleteDialogOpen(false);
      setNewsToDelete(null);
      fetchNewsItems();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete news");
      setDeleteDialogOpen(false);
      setNewsToDelete(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  return (
    <ProtectedRoute>
      <SEOHead robots="noindex, nofollow" />
      <Layout>
        <div className="min-h-screen" style={{ backgroundColor: "#F3F5F7" }}>
          <div className="container-custom section-padding py-6 md:py-10">
            <AdminDashboardHeader
              activeTab="press-news"
              title="Press & News Dashboard"
              description="Manage Press & News items"
              newLabel="New Item"
              onNew={() => navigate("/admin/news-articles/new")}
              onLogout={handleLogout}
            />

            {loading ? (
              <ArticleLoader count={6} columns={3} />
            ) : newsItems.length === 0 ? (
              <Card style={{ backgroundColor: "#ffffff" }}>
                <CardContent className="py-12 text-center">
                  <p className="mb-4 text-muted-foreground">No news found</p>
                  <Button
                    onClick={() => navigate("/admin/news-articles/new")}
                    className="bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white"
                  >
                    Create First News
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsItems.map((newsItem) => (
                  <Card key={newsItem._id} style={{ backgroundColor: "#ffffff" }}>
                    <CardHeader>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <img
                          src={newsItem.imageUrl}
                          alt={newsItem.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(newsItem.publishedAt), "dd MMM yyyy, h:mm a")}
                      </p>
                      <CardTitle
                        className="line-clamp-2 text-lg"
                        style={{ color: "#01002A" }}
                      >
                        {newsItem.title}
                      </CardTitle>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {newsItem.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/news-articles/edit/${newsItem._id}`)}
                          className="flex-1 border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(newsItem._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the news item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setNewsToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewsDashboard;
