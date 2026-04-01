import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, ChevronDown, ChevronUp, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import DragDropUpload from "@/components/admin/DragDropUpload";
import SEOHead from "@/components/SEOHead";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { newsAPI, uploadAPI } from "@/services/api";

const TITLE_MAX_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 750;
const HOURS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);
const MINUTES = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0")
);

type Meridiem = "AM" | "PM";

interface TimeState {
  hour: string;
  minute: string;
  period: Meridiem;
}

const getTimeStateFromDate = (date: Date): TimeState => {
  const hours = date.getHours();

  return {
    hour: String(hours % 12 || 12).padStart(2, "0"),
    minute: String(date.getMinutes()).padStart(2, "0"),
    period: hours >= 12 ? "PM" : "AM",
  };
};

const getDefaultTimeState = (): TimeState => getTimeStateFromDate(new Date());

const combineDateAndTime = (date: Date, time: TimeState) => {
  const composedDate = new Date(date);
  let hours = parseInt(time.hour, 10) % 12;

  if (time.period === "PM") {
    hours += 12;
  }

  composedDate.setHours(hours, parseInt(time.minute, 10), 0, 0);

  return composedDate;
};

const NewsForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [articleFile, setArticleFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isPublishedPickerOpen, setIsPublishedPickerOpen] = useState(false);
  const [publishedDate, setPublishedDate] = useState<Date | undefined>(undefined);
  const [publishedTime, setPublishedTime] = useState<TimeState>(getDefaultTimeState);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    articleURL: "",
    articleFileUrl: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchNewsItem();
    }
  }, [id]);

  const titleCharactersLeft = useMemo(
    () => TITLE_MAX_LENGTH - formData.title.length,
    [formData.title]
  );
  const descriptionCharactersLeft = useMemo(
    () => DESCRIPTION_MAX_LENGTH - formData.description.length,
    [formData.description]
  );
  const publishedAtPreview = useMemo(() => {
    if (!publishedDate) {
      return "";
    }

    return format(
      combineDateAndTime(publishedDate, publishedTime),
      "EEEE, dd MMM yyyy 'at' h:mm a"
    );
  }, [publishedDate, publishedTime]);
  const hasExternalArticleUrl = formData.articleURL.trim().length > 0;
  const hasUploadedArticleFile = !!articleFile || formData.articleFileUrl.trim().length > 0;

  const fetchNewsItem = async () => {
    try {
      setFetching(true);
      const item = await newsAPI.getById(id!);

      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        articleURL: item.articleURL || "",
        articleFileUrl: item.articleFileUrl || "",
      });
      setImagePreview(item.imageUrl);

      if (item.publishedAt) {
        const parsedPublishedAt = new Date(item.publishedAt);

        if (!Number.isNaN(parsedPublishedAt.getTime())) {
          setPublishedDate(parsedPublishedAt);
          setPublishedTime(getTimeStateFromDate(parsedPublishedAt));
        } else {
          setPublishedDate(undefined);
          setPublishedTime(getDefaultTimeState());
        }
      } else {
        setPublishedDate(undefined);
        setPublishedTime(getDefaultTimeState());
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch news item");
      navigate("/admin/news-articles");
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : formData.imageUrl);
  };

  const handleArticleFileChange = (file: File | null) => {
    setArticleFile(file);
    setFormData((current) => ({
      ...current,
      articleURL: file ? "" : current.articleURL,
      articleFileUrl: file ? current.articleFileUrl : "",
    }));
  };

  const updatePublishedTime = (field: keyof TimeState, value: string) => {
    setPublishedTime((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSetNow = () => {
    const now = new Date();
    setPublishedDate(now);
    setPublishedTime(getTimeStateFromDate(now));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formData.title.trim().length > TITLE_MAX_LENGTH) {
        toast.error(`Title cannot exceed ${TITLE_MAX_LENGTH} characters.`);
        setLoading(false);
        return;
      }

      if (formData.description.trim().length > DESCRIPTION_MAX_LENGTH) {
        toast.error(`Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`);
        setLoading(false);
        return;
      }

      if (!publishedDate) {
        toast.error("Please select a published date and time.");
        setLoading(false);
        return;
      }

      let imageUrl = formData.imageUrl;

      if (imageFile) {
        imageUrl = (await uploadAPI.uploadFile(imageFile, "image")).url;
      }

      if (!imageUrl) {
        toast.error("Please upload an image.");
        setLoading(false);
        return;
      }

      let uploadedArticleFileUrl = formData.articleFileUrl.trim();
      const trimmedArticleURL = formData.articleURL.trim();

      if (articleFile) {
        uploadedArticleFileUrl = (
          await uploadAPI.uploadFile(articleFile, "file", {
            uploadScope: "press-and-news",
          })
        ).url;
      }

      if (trimmedArticleURL && uploadedArticleFileUrl) {
        toast.error("Please use either an external URL or an uploaded file, not both.");
        setLoading(false);
        return;
      }

      if (!trimmedArticleURL && !uploadedArticleFileUrl) {
        toast.error("Please provide either an external URL or upload a file.");
        setLoading(false);
        return;
      }

      const finalPublishedAt = combineDateAndTime(publishedDate, publishedTime);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageUrl,
        articleURL: trimmedArticleURL,
        articleFileUrl: uploadedArticleFileUrl,
        publishedAt: finalPublishedAt.toISOString(),
      };

      if (isEdit) {
        await newsAPI.update(id!, payload);
        toast.success("News updated successfully");
      } else {
        await newsAPI.create(payload);
        toast.success("News created successfully");
      }

      navigate("/admin/news-articles");
    } catch (error: any) {
      toast.error(error.message || "Failed to save news");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ProtectedRoute>
        <SEOHead robots="noindex, nofollow" />
        <Layout>
          <div
            className="flex min-h-screen items-center justify-center"
            style={{ backgroundColor: "#F3F5F7" }}
          >
            <LoadingSpinner text="Loading news item..." size="lg" />
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <SEOHead robots="noindex, nofollow" />
      <Layout>
        <div className="min-h-screen" style={{ backgroundColor: "#F3F5F7" }}>
          <div className="container-custom section-padding py-10">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/news-articles")}
                className="mb-4 text-[#01002A] hover:bg-[#01002A] hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
              <h1
                className="font-serif text-3xl font-bold md:text-4xl"
                style={{ color: "#01002A" }}
              >
                {isEdit ? "Edit News Item" : "New News Item"}
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl space-y-6 rounded-lg bg-white p-4 md:p-6 lg:p-8"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="title" style={{ color: "#01002A" }}>
                    Title *
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {titleCharactersLeft} characters left
                  </span>
                </div>
                <Input
                  id="title"
                  value={formData.title}
                  maxLength={TITLE_MAX_LENGTH}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, title: event.target.value }))
                  }
                  required
                  placeholder="News title"
                  style={{ borderColor: "#01002A" }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="description" style={{ color: "#01002A" }}>
                    Description *
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {descriptionCharactersLeft} characters left
                  </span>
                </div>
                <Textarea
                  id="description"
                  value={formData.description}
                  maxLength={DESCRIPTION_MAX_LENGTH}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  required
                  placeholder="News description"
                  className="min-h-[140px] border-[#01002A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="articleURL" style={{ color: "#01002A" }}>
                  Article URL
                </Label>
                <Input
                  id="articleURL"
                  type="url"
                  value={formData.articleURL}
                  disabled={hasUploadedArticleFile}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      articleURL: event.target.value,
                    }))
                  }
                  placeholder="https://example.com/article"
                  style={{ borderColor: "#01002A" }}
                />
                <p className="text-xs text-muted-foreground">
                  Add an external link, or leave this empty and upload a file below.
                </p>
              </div>

              <div className="space-y-2">
                <DragDropUpload
                  accept="*/*"
                  maxSize={10}
                  label="Upload File"
                  value={articleFile}
                  onChange={handleArticleFileChange}
                  previewUrl={formData.articleFileUrl}
                  disabled={hasExternalArticleUrl}
                />
                <p className="text-xs text-muted-foreground">
                  Upload any file to Database for the Read More action. If a file is uploaded, the Article URL field gets disabled.
                </p>
              </div>

              <div className="space-y-2">
                <Label style={{ color: "#01002A" }}>
                  Published Date & Time *
                </Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPublishedPickerOpen((current) => !current)}
                    className="h-auto w-full justify-between border-[#01002A] bg-white px-4 py-3 text-left text-[#01002A] hover:bg-white hover:text-[#01002A]"
                  >
                    <span className="flex items-center gap-3">
                      <CalendarIcon className="h-4 w-4 flex-shrink-0 text-[#01002A]" />
                      <span className="flex flex-col items-start">
                        <span className="text-sm font-medium">
                          {publishedAtPreview || "Choose a date and time"}
                        </span>
                      </span>
                    </span>
                    {isPublishedPickerOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#01002A]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#01002A]" />
                    )}
                  </Button>

                  {isPublishedPickerOpen ? (
                    <div className="absolute bottom-full left-0 right-0 z-30 mb-2 overflow-hidden rounded-lg border border-[#01002A]/20 bg-white shadow-2xl">
                      <div className="grid gap-4 p-4 md:grid-cols-[1fr_220px]">
                        <div className="rounded-md border border-[#01002A]/10 bg-white p-2">
                          <Calendar
                            mode="single"
                            selected={publishedDate}
                            onSelect={setPublishedDate}
                            defaultMonth={publishedDate || new Date()}
                            className="rounded-md"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label style={{ color: "#01002A" }}>Time</Label>
                            <div className="grid grid-cols-3 gap-2">
                              <Select
                                value={publishedTime.hour}
                                onValueChange={(value) => updatePublishedTime("hour", value)}
                              >
                                <SelectTrigger className="border-[#01002A] bg-white text-[#01002A]">
                                  <SelectValue placeholder="Hour" />
                                </SelectTrigger>
                                <SelectContent>
                                  {HOURS.map((hour) => (
                                    <SelectItem key={hour} value={hour}>
                                      {hour}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Select
                                value={publishedTime.minute}
                                onValueChange={(value) => updatePublishedTime("minute", value)}
                              >
                                <SelectTrigger className="border-[#01002A] bg-white text-[#01002A]">
                                  <SelectValue placeholder="Min" />
                                </SelectTrigger>
                                <SelectContent>
                                  {MINUTES.map((minute) => (
                                    <SelectItem key={minute} value={minute}>
                                      {minute}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Select
                                value={publishedTime.period}
                                onValueChange={(value) =>
                                  updatePublishedTime("period", value as Meridiem)
                                }
                              >
                                <SelectTrigger className="border-[#01002A] bg-white text-[#01002A]">
                                  <SelectValue placeholder="AM/PM" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AM">AM</SelectItem>
                                  <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="rounded-md border border-[#01002A]/15 bg-[#F9FAFB] p-3">
                            <p className="mt-2 text-sm font-medium text-[#01002A]">
                              {publishedAtPreview || "No publishing time selected"}
                            </p>
                          </div>

                          <div className="flex items-end justify-between gap-2 pt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleSetNow}
                              className="border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white"
                            >
                              Use Now
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => setIsPublishedPickerOpen(false)}
                              className="bg-[#01002A] text-white hover:bg-[#01002A]/90"
                            >
                              Done
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">
                  The selected date and time use your current local timezone.
                </p>
              </div>

              <DragDropUpload
                accept="image/jpeg,image/jpg,image/png"
                maxSize={5}
                label="News Image *"
                value={imageFile}
                onChange={handleImageChange}
                previewUrl={imagePreview}
                dimensions="16:9 aspect ratio"
              />

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full flex-1 bg-[#01002A] text-white hover:bg-[#01002A]/90 hover:text-white sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Saving..." : isEdit ? "Update News" : "Create New Item"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/news-articles")}
                  className="w-full border-[#01002A] text-[#01002A] hover:bg-[#01002A] hover:text-white sm:w-auto"
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

export default NewsForm;
