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
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';

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
    bannerImageUrl: '',
    pdfUrl: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [bannerImagePreview, setBannerImagePreview] = useState<string>('');
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
      
      // Debug logging to verify bannerImageUrl is being fetched
      console.log('📥 Fetched article data:', {
        id: article._id,
        title: article.title,
        imageUrl: article.imageUrl,
        bannerImageUrl: article.bannerImageUrl,
        hasBannerImageUrl: !!article.bannerImageUrl,
        bannerImageUrlType: typeof article.bannerImageUrl,
        bannerImageUrlLength: article.bannerImageUrl ? article.bannerImageUrl.length : 0,
      });
      
      // Ensure bannerImageUrl is preserved (don't overwrite with empty string)
      const fetchedBannerImageUrl = article.bannerImageUrl || '';
      
      setFormData({
        title: article.title,
        date: article.date,
        imageUrl: article.imageUrl,
        bannerImageUrl: fetchedBannerImageUrl,
        pdfUrl: article.pdfUrl,
      });
      setImagePreview(article.imageUrl);
      
      // Handle banner image preview - check for empty string, null, or undefined
      const bannerUrl = fetchedBannerImageUrl && typeof fetchedBannerImageUrl === 'string' && fetchedBannerImageUrl.trim() 
        ? fetchedBannerImageUrl.trim() 
        : '';
      console.log('🖼️ Setting banner image preview:', {
        original: article.bannerImageUrl,
        fetched: fetchedBannerImageUrl,
        processed: bannerUrl,
        isEmpty: !bannerUrl,
        length: bannerUrl ? bannerUrl.length : 0,
        willSetPreview: !!bannerUrl
      });
      
      // Always set the preview, even if empty, to ensure state is updated
      setBannerImagePreview(bannerUrl);
      
      // Force a re-render by updating state again after a brief delay (handles async state updates)
      if (bannerUrl) {
        setTimeout(() => {
          console.log('🔄 Verifying banner preview is set:', bannerUrl);
          setBannerImagePreview(bannerUrl);
        }, 50);
      }
      
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

  const handleBannerImageChange = (file: File | null) => {
    setBannerImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Restore preview from formData, handling empty strings and null values
      const bannerUrl = formData.bannerImageUrl && formData.bannerImageUrl.trim() 
        ? formData.bannerImageUrl 
        : '';
      setBannerImagePreview(bannerUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      let bannerImageUrl = formData.bannerImageUrl;
      let pdfUrl = formData.pdfUrl;

      // Upload files if new ones are selected (sequential to avoid Vercel body limits)
      if (imageFile || bannerImageFile || pdfFile) {
        console.log('📤 Uploading files to S3 individually...', {
          hasImage: !!imageFile,
          hasBannerImage: !!bannerImageFile,
          hasPdf: !!pdfFile,
          currentBannerImageUrl: bannerImageUrl || '(none)',
        });

        if (imageFile) {
          const imageUpload = await uploadAPI.uploadFile(imageFile, 'image');
          imageUrl = imageUpload.url;
          console.log('📷 Image URL:', imageUrl);
        }

        if (bannerImageFile) {
          const bannerUpload = await uploadAPI.uploadFile(bannerImageFile, 'image');
          bannerImageUrl = bannerUpload.url;
          console.log('🖼️ Banner Image URL uploaded:', bannerImageUrl);
        } else {
          // Preserve existing bannerImageUrl if no new file is uploaded
          console.log('🖼️ Preserving existing banner image URL:', bannerImageUrl || '(none)');
        }

        if (pdfFile) {
          const pdfUpload = await uploadAPI.uploadFile(pdfFile, 'pdf');
          pdfUrl = pdfUpload.url;
          console.log('📄 PDF URL:', pdfUrl);
        }
      }

      // Validate we have PDF URL before saving
      if (!pdfUrl) {
        console.error('❌ Missing PDF URL:', { pdfUrl });
        toast.error('Please upload PDF file');
        setLoading(false);
        return;
      }

      // Format date from selectedDate or use formData.date
      let formattedDate = formData.date;
      if (selectedDate) {
        formattedDate = format(selectedDate, 'MMMM yyyy');
      }

      // Save article - preserve existing bannerImageUrl if not uploading new one
      const articleData = {
        title: formData.title,
        date: formattedDate,
        imageUrl: imageUrl || '',
        bannerImageUrl: bannerImageUrl || (isEdit ? formData.bannerImageUrl : ''),
        pdfUrl,
      };

      console.log('💾 Saving article with data:', {
        title: articleData.title,
        date: articleData.date,
        imageUrl: articleData.imageUrl || '(empty)',
        bannerImageUrl: articleData.bannerImageUrl || '(empty)',
        pdfUrl: articleData.pdfUrl,
        hasImageUrl: !!articleData.imageUrl,
        hasBannerImageUrl: !!articleData.bannerImageUrl,
        hasPdfUrl: !!articleData.pdfUrl,
      });
      console.log('📤 Full payload:', JSON.stringify(articleData, null, 2));

      let savedArticle;
      try {
        if (isEdit) {
          savedArticle = await articlesAPI.update(id!, articleData);
          console.log('✅ Article updated. Response:', {
            id: savedArticle._id,
            title: savedArticle.title,
            bannerImageUrl: savedArticle.bannerImageUrl,
            hasBannerImageUrl: !!savedArticle.bannerImageUrl,
            bannerImageUrlLength: savedArticle.bannerImageUrl ? savedArticle.bannerImageUrl.length : 0,
          });
          
          // Verify bannerImageUrl was saved correctly
          if (articleData.bannerImageUrl && !savedArticle.bannerImageUrl) {
            console.error('⚠️ WARNING: bannerImageUrl was not saved correctly!', {
              sent: articleData.bannerImageUrl,
              received: savedArticle.bannerImageUrl,
            });
            toast.error('Banner image may not have been saved. Please check and try again.');
          } else if (articleData.bannerImageUrl && savedArticle.bannerImageUrl) {
            console.log('✅ Banner image URL saved successfully:', savedArticle.bannerImageUrl);
          }
          
          toast.success('Article updated successfully');
        } else {
          savedArticle = await articlesAPI.create(articleData);
          console.log('✅ Article created. Response:', {
            id: savedArticle._id,
            title: savedArticle.title,
            bannerImageUrl: savedArticle.bannerImageUrl,
            hasBannerImageUrl: !!savedArticle.bannerImageUrl,
            bannerImageUrlLength: savedArticle.bannerImageUrl ? savedArticle.bannerImageUrl.length : 0,
          });
          toast.success('Article created successfully');
        }
      } catch (saveError: any) {
        console.error('❌ Error saving article:', saveError);
        console.error('   Error details:', {
          message: saveError.message,
          response: saveError.response,
          data: articleData,
        });
        throw saveError; // Re-throw to be caught by outer catch block
      }

      navigate('/admin');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to save article';
      toast.error(errorMessage);
      
      // Redirect to login if session expired
      if (errorMessage.includes('session has expired') || errorMessage.includes('Authentication required')) {
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      }
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
            <LoadingSpinner text="Loading article..." size="lg" />
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
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="mb-4 text-[#001429] hover:text-white hover:bg-[#001429]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" style={{ color: '#001429' }}>
                {isEdit ? 'Edit Article' : 'Create New Article'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 p-4 md:p-6 lg:p-8 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              <div className="space-y-2">
                <Label htmlFor="title" style={{ color: '#001429' }}>
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Article title"
                  style={{ borderColor: '#001429' }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" style={{ color: '#001429' }}>
                  Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-[#001429] text-[#001429] hover:bg-[#001429] hover:text-white",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'MMMM yyyy') : <span>Pick a month and year</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-6" align="start">
                    <style>{`
                      .rdp-dropdown {
                        height: 2.5rem;
                        border-radius: 0.375rem;
                        border: 1px solid hsl(var(--input));
                        background-color: hsl(var(--background));
                        padding: 0.5rem 1rem;
                        font-size: 0.875rem;
                        font-weight: 500;
                        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                        margin: 0;
                      }
                      .rdp-dropdown:hover {
                        background-color: hsl(var(--accent));
                        color: hsl(var(--accent-foreground));
                      }
                      .rdp-dropdown:focus {
                        outline: none;
                        ring: 2px;
                        ring-color: hsl(var(--ring));
                        ring-offset: 2px;
                      }
                      .rdp-dropdown_month {
                        min-width: 140px;
                        width: 140px;
                      }
                      .rdp-dropdown_year {
                        min-width: 100px;
                        width: 100px;
                      }
                      .rdp-caption {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 1rem;
                        padding: 0;
                        margin: 0;
                        width: 100%;
                      }
                      .rdp-caption_dropdowns {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 1rem;
                        width: 100%;
                      }
                      .rdp-month {
                        margin: 0;
                        padding: 0;
                      }
                      .rdp-months {
                        margin: 0;
                        padding: 0;
                      }
                    `}</style>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) {
                          setFormData({ ...formData, date: format(date, 'MMMM yyyy') });
                        }
                      }}
                      onMonthChange={(date) => {
                        // When month/year changes via dropdown, update the selected date
                        setSelectedDate(date);
                        setFormData({ ...formData, date: format(date, 'MMMM yyyy') });
                      }}
                      captionLayout="dropdown-buttons"
                      fromYear={1990}
                      toYear={2030}
                      initialFocus
                      classNames={{
                        months: "flex flex-col m-0 p-0",
                        month: "space-y-0 m-0 p-0",
                        caption: "flex justify-center items-center gap-4 p-0 m-0 w-full",
                        caption_label: "hidden",
                        nav: "hidden",
                        nav_button: "hidden",
                        nav_button_previous: "hidden",
                        nav_button_next: "hidden",
                        table: "hidden",
                        head_row: "hidden",
                        head_cell: "hidden",
                        row: "hidden",
                        cell: "hidden",
                        day: "hidden",
                        day_range_end: "hidden",
                        day_selected: "hidden",
                        day_today: "hidden",
                        day_outside: "hidden",
                        day_disabled: "hidden",
                        day_range_middle: "hidden",
                        day_hidden: "hidden",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <DragDropUpload
                accept="image/jpeg,image/jpg,image/png"
                maxSize={5}
                label="Pivotal Card Image"
                value={imageFile}
                onChange={handleImageChange}
                previewUrl={imagePreview}
                dimensions="16:9 aspect ratio"
              />

              <DragDropUpload
                accept="image/jpeg,image/jpg,image/png"
                maxSize={5}
                label="Featured Banner Image"
                value={bannerImageFile}
                onChange={handleBannerImageChange}
                previewUrl={bannerImagePreview}
                dimensions="3:1 aspect ratio"
              />

              <DragDropUpload
                accept="application/pdf"
                maxSize={4.5}
                label="PDF Document *"
                value={pdfFile}
                onChange={setPdfFile}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 w-full sm:w-auto bg-[#001429] text-white hover:bg-[#001429]/90 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  className="w-full sm:w-auto border-[#001429] text-[#001429] hover:bg-[#001429] hover:text-white"
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

