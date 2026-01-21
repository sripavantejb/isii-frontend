import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { articlesAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ArticleLoader from '@/components/ArticleLoader';
import SEOHead from '@/components/SEOHead';

interface Article {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  bannerImageUrl?: string;
  pdfUrl: string;
}

const Dashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

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

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articlesAPI.getAll();
      // Sort articles by date (latest first) as a fallback
      const sortedArticles = sortArticlesByDate(data);
      setArticles(sortedArticles);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      await articlesAPI.delete(articleToDelete);
      toast.success('Article deleted successfully');
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
      fetchArticles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete article');
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  return (
    <ProtectedRoute>
      <SEOHead robots="noindex, nofollow" />
      <Layout>
        <div className="min-h-screen" style={{ backgroundColor: '#F3F5F7' }}>
          <div className="container-custom section-padding py-6 md:py-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#001429' }}>
                  Admin Dashboard
                </h1>
                <p className="text-sm" style={{ color: '#001429' }}>
                  Manage Pivotal Thinking articles
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/admin/articles/new')}
                  className="w-full sm:w-auto bg-[#001429] text-white hover:bg-[#001429]/90 hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full sm:w-auto border-[#001429] text-[#001429] hover:bg-[#001429] hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {loading ? (
              <ArticleLoader count={6} columns={3} />
            ) : articles.length === 0 ? (
              <Card style={{ backgroundColor: '#ffffff' }}>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No articles found</p>
                  <Button
                    onClick={() => navigate('/admin/articles/new')}
                    className="bg-[#001429] text-white hover:bg-[#001429]/90 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Article
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article._id} style={{ backgroundColor: '#ffffff' }}>
                    <CardHeader>
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg line-clamp-2" style={{ color: '#001429' }}>
                        {article.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{article.date}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/articles/edit/${article._id}`)}
                          className="flex-1 border-[#001429] text-[#001429] hover:bg-[#001429] hover:text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(article._id)}
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
                This action cannot be undone. This will permanently delete the article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setArticleToDelete(null)}>
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

export default Dashboard;

