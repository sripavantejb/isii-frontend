import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { perspectivesAPI, uploadAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parse } from 'date-fns';
import { CalendarIcon, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import DragDropUpload from '@/components/admin/DragDropUpload';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';

const ReportForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const [formData, setFormData] = useState({ title: '', date: '', imageUrl: '', bannerImageUrl: '', pdfUrl: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [bannerImagePreview, setBannerImagePreview] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (isEdit) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setFetching(true);
      const item = await perspectivesAPI.getById(id!);
      setFormData({ title: item.title, date: item.date, imageUrl: item.imageUrl, bannerImageUrl: item.bannerImageUrl || '', pdfUrl: item.pdfUrl });
      setImagePreview(item.imageUrl);
      setBannerImagePreview(item.bannerImageUrl || '');
      if (item.date) {
        const parsedDate = parse(item.date, 'MMMM yyyy', new Date());
        if (!isNaN(parsedDate.getTime())) setSelectedDate(parsedDate);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch perspective');
      navigate('/admin/reports');
    } finally {
      setFetching(false);
    }
  };
  
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : formData.imageUrl);
  };

  const handleBannerImageChange = (file: File | null) => {
    setBannerImageFile(file);
    setBannerImagePreview(file ? URL.createObjectURL(file) : formData.bannerImageUrl);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.imageUrl;
      let bannerImageUrl = formData.bannerImageUrl;
      let pdfUrl = formData.pdfUrl;

      if (imageFile) imageUrl = (await uploadAPI.uploadFile(imageFile, 'image')).url;
      if (bannerImageFile) bannerImageUrl = (await uploadAPI.uploadFile(bannerImageFile, 'image')).url;
      if (pdfFile) pdfUrl = (await uploadAPI.uploadFile(pdfFile, 'pdf')).url;
      
      if (!pdfUrl) {
        toast.error('Please upload a PDF file.');
        setLoading(false);
        return;
      }

      let formattedDate = formData.date;
      if (selectedDate) formattedDate = format(selectedDate, 'MMMM yyyy');

      if (!formattedDate) {
        toast.error('Please select a date.');
        setLoading(false);
        return;
      }

      const itemData = { title: formData.title, date: formattedDate, imageUrl: imageUrl || '', bannerImageUrl: bannerImageUrl || '', pdfUrl };

      if (isEdit) {
        await perspectivesAPI.update(id!, itemData);
        toast.success(`Perspective updated successfully`);
      } else {
        await perspectivesAPI.create(itemData);
        toast.success(`Perspective created successfully`);
      }
      navigate('/admin/reports');
    } catch (error: any) {
      toast.error(error.message || `Failed to save perspective`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ProtectedRoute>
        <SEOHead robots="noindex, nofollow" />
        <Layout>
          <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F3F5F7' }}>
            <LoadingSpinner text="Loading perspective..." size="lg" />
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <SEOHead robots="noindex, nofollow" />
      <Layout>
        <div className="min-h-screen" style={{ backgroundColor: '#F3F5F7' }}>
          <div className="container-custom section-padding py-10">
            <div className="mb-8">
              <Button variant="ghost" onClick={() => navigate('/admin/reports')} className="mb-4 text-[#01002A] hover:text-white hover:bg-[#01002A]">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
              </Button>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" style={{ color: '#01002A' }}>
                {isEdit ? 'Edit Report' : 'New Report'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 p-4 md:p-6 lg:p-8 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              <div className="space-y-2">
                <Label htmlFor="title" style={{ color: '#01002A' }}>Title *</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Perspective title" style={{ borderColor: '#01002A' }}/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" style={{ color: '#01002A' }}>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white", !selectedDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'MMMM yyyy') : <span>Pick a month and year</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} captionLayout="dropdown-buttons" fromYear={1990} toYear={2030} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <DragDropUpload accept="image/jpeg,image/jpg,image/png" maxSize={5} label="Card Image" value={imageFile} onChange={handleImageChange} previewUrl={imagePreview} dimensions="16:9 aspect ratio" />
              <DragDropUpload accept="image/jpeg,image/jpg,image/png" maxSize={5} label="Featured Banner Image" value={bannerImageFile} onChange={handleBannerImageChange} previewUrl={bannerImagePreview} dimensions="3:1 aspect ratio" />
              <DragDropUpload accept="application/pdf" maxSize={4.5} label="PDF Document *" value={pdfFile} onChange={setPdfFile} />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1 w-full sm:w-auto bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white">
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : isEdit ? 'Update Perspective' : 'Create Perspective'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/reports')} className="w-full sm:w-auto border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ReportForm;