import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { reportsAPI, uploadAPI } from '@/services/api';
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

const ReportForm = () => {
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
      fetchReport();
    }
  }, [id]);


  const fetchReport = async () => {
    try {
      setFetching(true);
      const report = await reportsAPI.getById(id!);
      
      // Debug logging to verify bannerImageUrl is being fetched
      console.log('📥 Fetched report data:', {
        id: report._id,
        title: report.title,
        imageUrl: report.imageUrl,
        bannerImageUrl: report.bannerImageUrl,
        hasBannerImageUrl: !!report.bannerImageUrl,
        bannerImageUrlType: typeof report.bannerImageUrl,
        bannerImageUrlLength: report.bannerImageUrl ? report.bannerImageUrl.length : 0,
      });
      
      // Ensure bannerImageUrl is preserved (don't overwrite with empty string)
      const fetchedBannerImageUrl = report.bannerImageUrl || '';
      
      setFormData({
        title: report.title,
        date: report.date,
        imageUrl: report.imageUrl,
        bannerImageUrl: fetchedBannerImageUrl,
        pdfUrl: report.pdfUrl,
      });
      setImagePreview(report.imageUrl);
      
      // Handle banner image preview - check for empty string, null, or undefined
      const bannerUrl = fetchedBannerImageUrl && typeof fetchedBannerImageUrl === 'string' && fetchedBannerImageUrl.trim() 
        ? fetchedBannerImageUrl.trim() 
        : '';
      console.log('🖼️ Setting banner image preview:', {
        original: report.bannerImageUrl,
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
      if (report.date) {
        try {
          const parsedDate = parse(report.date, 'MMMM yyyy', new Date());
          if (!isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate);
          }
        } catch (error) {
          console.error('Failed to parse date:', error);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch report');
      navigate('/admin/reports');
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

      // Validate date is provided (required field)
      if (!formattedDate || formattedDate.trim() === '') {
        console.error('❌ Missing date:', { 
          selectedDate, 
          formDataDate: formData.date, 
          formattedDate,
          selectedDateString: selectedDate ? format(selectedDate, 'MMMM yyyy') : 'undefined'
        });
        toast.error('Please select a date using the date picker');
        setLoading(false);
        return;
      }

      // Save report - preserve existing bannerImageUrl if not uploading new one
      const reportData = {
        title: formData.title,
        date: formattedDate,
        imageUrl: imageUrl || '',
        bannerImageUrl: bannerImageUrl || (isEdit ? formData.bannerImageUrl : ''),
        pdfUrl,
      };

      console.log('💾 Saving report with data:', {
        title: reportData.title,
        date: reportData.date,
        imageUrl: reportData.imageUrl || '(empty)',
        bannerImageUrl: reportData.bannerImageUrl || '(empty)',
        pdfUrl: reportData.pdfUrl,
        hasImageUrl: !!reportData.imageUrl,
        hasBannerImageUrl: !!reportData.bannerImageUrl,
        hasPdfUrl: !!reportData.pdfUrl,
      });
      console.log('📤 Full payload:', JSON.stringify(reportData, null, 2));

      let savedReport;
      try {
        if (isEdit) {
          savedReport = await reportsAPI.update(id!, reportData);
          console.log('✅ Report updated. Response:', {
            id: savedReport._id,
            title: savedReport.title,
            bannerImageUrl: savedReport.bannerImageUrl,
            hasBannerImageUrl: !!savedReport.bannerImageUrl,
            bannerImageUrlLength: savedReport.bannerImageUrl ? savedReport.bannerImageUrl.length : 0,
          });
          
          // Verify bannerImageUrl was saved correctly
          if (reportData.bannerImageUrl && !savedReport.bannerImageUrl) {
            console.error('⚠️ WARNING: bannerImageUrl was not saved correctly!', {
              sent: reportData.bannerImageUrl,
              received: savedReport.bannerImageUrl,
            });
            toast.error('Banner image may not have been saved. Please check and try again.');
          } else if (reportData.bannerImageUrl && savedReport.bannerImageUrl) {
            console.log('✅ Banner image URL saved successfully:', savedReport.bannerImageUrl);
          }
          
          toast.success('Report updated successfully');
        } else {
          savedReport = await reportsAPI.create(reportData);
          console.log('✅ Report created. Response:', {
            id: savedReport._id,
            title: savedReport.title,
            bannerImageUrl: savedReport.bannerImageUrl,
            hasBannerImageUrl: !!savedReport.bannerImageUrl,
            bannerImageUrlLength: savedReport.bannerImageUrl ? savedReport.bannerImageUrl.length : 0,
          });
          toast.success('Report created successfully');
        }
      } catch (saveError: any) {
        console.error('❌ Error saving report:', saveError);
        console.error('   Error details:', {
          message: saveError.message,
          response: saveError.response,
          data: reportData,
        });
        throw saveError; // Re-throw to be caught by outer catch block
      }

      navigate('/admin/reports');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to save report';
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
            <LoadingSpinner text="Loading report..." size="lg" />
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
                onClick={() => navigate('/admin/reports')}
                className="mb-4 text-[#01002A] hover:text-white hover:bg-[#01002A]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" style={{ color: '#01002A' }}>
                {isEdit ? 'Edit Report' : 'Create New Report'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 p-4 md:p-6 lg:p-8 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              <div className="space-y-2">
                <Label htmlFor="title" style={{ color: '#01002A' }}>
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Report title"
                  style={{ borderColor: '#01002A' }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" style={{ color: '#01002A' }}>
                  Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white",
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
                      defaultMonth={selectedDate || new Date()}
                      onSelect={(date) => {
                        console.log('📅 Calendar onSelect called:', date);
                        if (date) {
                          const formatted = format(date, 'MMMM yyyy');
                          console.log('📅 Setting date to:', formatted);
                          setSelectedDate(date);
                          setFormData({ ...formData, date: formatted });
                        }
                      }}
                      onMonthChange={(date) => {
                        // When month/year changes via dropdown, set to first day of that month
                        console.log('📅 Calendar onMonthChange called:', date);
                        if (date) {
                          const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                          const formatted = format(firstDayOfMonth, 'MMMM yyyy');
                          console.log('📅 Setting date to first day of month:', formatted);
                          setSelectedDate(firstDayOfMonth);
                          setFormData({ ...formData, date: formatted });
                        }
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
                  className="flex-1 w-full sm:w-auto bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : isEdit ? 'Update Report' : 'Create Report'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/reports')}
                  className="w-full sm:w-auto border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white"
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

export default ReportForm;
