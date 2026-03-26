import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { perspectivesAPI } from '@/services/api'; // Use perspectives API
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
import { Edit, Plus, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ArticleLoader from '@/components/ArticleLoader';
import SEOHead from '@/components/SEOHead';
import AdminDashboardHeader from '@/components/admin/AdminDashboardHeader';

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
      const months: { [key: string]: number } = { 'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5, 'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11 };
      const trimmed = dateStr.trim().toLowerCase();
      const parts = trimmed.split(/\s+/);
      if (parts.length !== 2) return new Date(0);
      const monthName = parts[0];
      const month = months[monthName];
      const year = parseInt(parts[1], 10);
      if (month === undefined || isNaN(year) || year < 1900 || year > 2100) return new Date(0);
      return new Date(year, month, 1);
    } catch (error) { return new Date(0); }
  };

  const sortReportsByDate = (reports: Report[]): Report[] => {
    return [...reports].sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await perspectivesAPI.getAll();
      const sortedReports = sortReportsByDate(data);
      setReports(sortedReports);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch perspectives');
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
      await perspectivesAPI.delete(reportToDelete);
      toast.success('Perspective deleted successfully');
      setDeleteDialogOpen(false);
      setReportToDelete(null);
      fetchReports();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete perspective');
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
            <AdminDashboardHeader
              activeTab="perspectives"
              title="Perspectives Dashboard"
              description="Manage Perspectives"
              newLabel="New Report"
              onNew={() => navigate('/admin/reports/new')}
              onLogout={handleLogout}
            />

            {loading ? (
              <ArticleLoader count={6} columns={3} />
            ) : reports.length === 0 ? (
              <Card style={{ backgroundColor: '#ffffff' }}>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No perspectives found</p>
                  <Button onClick={() => navigate('/admin/reports/new')} className="bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Perspective
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <Card key={report._id} style={{ backgroundColor: '#ffffff' }}>
                    <CardHeader>
                      <div className="aspect-video overflow-hidden rounded-lg mb-4"><img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover"/></div>
                      <CardTitle className="text-lg line-clamp-2" style={{ color: '#01002A' }}>{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/admin/reports/edit/${report._id}`)} className="flex-1 border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white">
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
              <AlertDialogDescription>This action cannot be undone. This will permanently delete the perspective.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setReportToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
