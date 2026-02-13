import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { reportsAPI } from '@/services/api';
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
import AdminDashboardTabs from '@/components/admin/AdminDashboardTabs';

interface Report {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  bannerImageUrl?: string;
  pdfUrl: string;
}

const ReportsDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const parseDate = (dateStr: string): Date => {
    if (!dateStr || typeof dateStr !== 'string') return new Date(0);
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

      const month = months[parts[0]];
      const year = parseInt(parts[1], 10);
      if (month === undefined || isNaN(year) || year < 1900 || year > 2100) return new Date(0);

      return new Date(year, month, 1);
    } catch {
      return new Date(0);
    }
  };

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

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportsAPI.getAll();
      setReports(sortByDate(data));
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setReportToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reportToDelete) return;

    try {
      await reportsAPI.delete(reportToDelete);
      toast.success('Report deleted successfully');
      setDeleteDialogOpen(false);
      setReportToDelete(null);
      fetchReports();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete report');
      setDeleteDialogOpen(false);
      setReportToDelete(null);
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
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#01002A' }}>
                  Perspectives Dashboard
                </h1>
                <p className="text-sm" style={{ color: '#01002A' }}>
                  Manage Perspectives reports
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <AdminDashboardTabs activeTab="perspectives" />
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full sm:w-auto border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <Button
                onClick={() => navigate('/admin/reports/new')}
                className="w-full sm:w-auto bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </div>

            {loading ? (
              <ArticleLoader count={6} columns={3} />
            ) : reports.length === 0 ? (
              <Card style={{ backgroundColor: '#ffffff' }}>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No reports found</p>
                  <Button
                    onClick={() => navigate('/admin/reports/new')}
                    className="bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Report
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <Card key={report._id} style={{ backgroundColor: '#ffffff' }}>
                    <CardHeader>
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="text-lg line-clamp-2" style={{ color: '#01002A' }}>
                        {report.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/reports/edit/${report._id}`)}
                          className="flex-1 border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(report._id)}>
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
                This action cannot be undone. This will permanently delete the report.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setReportToDelete(null)}>Cancel</AlertDialogCancel>
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

export default ReportsDashboard;
