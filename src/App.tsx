import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import Index from "./pages/Index";
import About from "./pages/About";
import Mission from "./pages/Mission";
import People from "./pages/People";
import Context from "./pages/Context";
import PersonProfile from "./pages/PersonProfile";
import PivotalThinking from "./pages/PivotalThinking";
import PressNews from "./pages/PressNews";
import ContentLibrary from "./pages/ContentLibrary";
import Perspectives from "./pages/Perspectives";
import PerspectivesLibrary from "./pages/PerspectivesLibrary";
import StrategicCounsel from "./pages/StrategicCounsel";
import GrowthAndProsperity from "./pages/GrowthAndProsperity";
import SecuringSovereignty from "./pages/SecuringSovereignty";
import MobilisingTransition from "./pages/MobilisingTransition";
import SystemicIntervention from "./pages/SystemicIntervention";
import Experience from "./pages/Experience";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NewsDashboard from "./pages/admin/NewsDashboard";
import ReportsDashboard from "./pages/admin/ReportsDashboard"; // New
import ArticleForm from "./pages/admin/ArticleForm";
import NewsForm from "./pages/admin/NewsForm";
import ReportForm from "./pages/admin/ReportForm"; // New

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SEOHead />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/people" element={<People />} />
            <Route path="/about/context" element={<Context />} />
            <Route path="/about/people/:slug" element={<PersonProfile />} />
            <Route path="/capabilities/pivotal-thinking" element={<PivotalThinking />} />
            <Route path="/press-and-news" element={<PressNews />} />
            <Route path="/capabilities/pivotal-thinking/content-library" element={<ContentLibrary />} />
            <Route path="/capabilities/perspectives" element={<Perspectives />} />
            <Route path="/capabilities/perspectives/content-library" element={<PerspectivesLibrary />} />
            <Route path="/capabilities/strategic-counsel" element={<StrategicCounsel />} />
            <Route path="/capabilities/strategic-counsel/growth-and-prosperity" element={<GrowthAndProsperity />} />
            <Route path="/capabilities/strategic-counsel/securing-sovereignty" element={<SecuringSovereignty />} />
            <Route path="/capabilities/strategic-counsel/mobilising-transition" element={<MobilisingTransition />} />
            <Route path="/capabilities/programmes" element={<SystemicIntervention />} />
            <Route path="/capabilities/projects-and-intervention" element={<Experience />} />
            <Route
              path="/capabilities/experience"
              element={<Navigate to="/capabilities/projects-and-intervention" replace />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            
            {/* Pivotal Thinking Admin */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/articles/new" element={<ArticleForm />} />
            <Route path="/admin/articles/edit/:id" element={<ArticleForm />} />

            {/* Press & News Admin */}
            <Route path="/admin/news-articles" element={<NewsDashboard />} />
            <Route path="/admin/news-articles/new" element={<NewsForm />} />
            <Route path="/admin/news-articles/edit/:id" element={<NewsForm />} />
            <Route path="/admin/news" element={<Navigate to="/admin/news-articles" replace />} />
            <Route path="/admin/news/new" element={<Navigate to="/admin/news-articles/new" replace />} />
            <Route path="/admin/news/edit/:id" element={<Navigate to="/admin/news-articles" replace />} />

            {/* Perspectives (Reports) Admin */}
            <Route path="/admin/reports" element={<ReportsDashboard />} />
            <Route path="/admin/reports/new" element={<ReportForm />} />
            <Route path="/admin/reports/edit/:id" element={<ReportForm />} />

            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
