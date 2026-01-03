import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { articlesAPI, uploadAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import DragDropUpload from '@/components/admin/DragDropUpload';
import { cn } from '@/lib/utils';

const ArticleForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    imageUrl: '',
    pdfUrl: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (isEdit) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setFetching(true);
      const article = await articlesAPI.getById(id!);
      setFormData({
        title: article.title,
        date: article.date,
        imageUrl: article.imageUrl,
        pdfUrl: article.pdfUrl,
      });
      setImagePreview(article.imageUrl);
      
      // Parse existing date string to Date object
      if (article.date) {
        try {
          const parsedDate = parse(article.date, 'MMMM yyyy', new Date());
          if (!isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate);
          }
        } catch (error) {
          console.error('Failed to parse date:', error);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch article');
      navigate('/admin');
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(formData.imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      let pdfUrl = formData.pdfUrl;

      // Upload files if new ones are selected
      if (imageFile || pdfFile) {
        console.log('📤 Uploading files to S3...', {
          hasImage: !!imageFile,
          hasPdf: !!pdfFile,
        });
        
        const uploadResult = await uploadAPI.uploadMultiple(
          imageFile || undefined,
          pdfFile || undefined
        );

        console.log('✅ Upload result:', uploadResult);

        if (uploadResult.imageUrl) {
          imageUrl = uploadResult.imageUrl;
          console.log('📷 Image URL:', imageUrl);
        }
        if (uploadResult.pdfUrl) {
          pdfUrl = uploadResult.pdfUrl;
          console.log('📄 PDF URL:', pdfUrl);
        }
      }

      // Validate we have URLs before saving
      if (!imageUrl || !pdfUrl) {
        console.error('❌ Missing URLs:', { imageUrl, pdfUrl });
        toast.error('Please upload both image and PDF files');
        setLoading(false);
        return;
      }

      // Format date from selectedDate or use formData.date
      let formattedDate = formData.date;
      if (selectedDate) {
        formattedDate = format(selectedDate, 'MMMM yyyy');
      }

      // Save article
      const articleData = {
        title: formData.title,
        date: formattedDate,
        imageUrl,
        pdfUrl,
      };

      console.log('💾 Saving article with data:', {
        title: articleData.title,
        date: articleData.date,
        hasImageUrl: !!articleData.imageUrl,
        hasPdfUrl: !!articleData.pdfUrl,
      });

      if (isEdit) {
        await articlesAPI.update(id!, articleData);
        toast.success('Article updated successfully');
      } else {
        await articlesAPI.create(articleData);
        toast.success('Article created successfully');
      }

      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F3F5F7' }}>
            <p style={{ color: '#1b315b' }}>Loading...</p>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen" style={{ backgroundColor: '#F3F5F7' }}>
          <div className="container-custom section-padding py-10">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="mb-4"
                style={{ color: '#1b315b' }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" style={{ color: '#1b315b' }}>
                {isEdit ? 'Edit Article' : 'Create New Article'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 p-4 md:p-6 lg:p-8 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              <div className="space-y-2">
                <Label htmlFor="title" style={{ color: '#1b315b' }}>
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Article title"
                  style={{ borderColor: '#1b315b' }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" style={{ color: '#1b315b' }}>
                  Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                      style={{ borderColor: '#1b315b', color: '#1b315b' }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'MMMM yyyy') : <span>Pick a month and year</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) {
                          setFormData({ ...formData, date: format(date, 'MMMM yyyy') });
                        }
                      }}
                      captionLayout="dropdown-buttons"
                      fromYear={2020}
                      toYear={2030}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <DragDropUpload
                accept="image/jpeg,image/jpg,image/png"
                maxSize={5}
                label="Article Image *"
                value={imageFile}
                onChange={handleImageChange}
                previewUrl={imagePreview}
              />

              <DragDropUpload
                accept="application/pdf"
                maxSize={10}
                label="PDF Document *"
                value={pdfFile}
                onChange={setPdfFile}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 w-full sm:w-auto"
                  style={{ backgroundColor: '#1b315b', color: '#ffffff' }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  className="w-full sm:w-auto"
                  style={{ borderColor: '#1b315b', color: '#1b315b' }}
                >
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

export default ArticleForm;

