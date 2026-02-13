import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Mission from "./pages/Mission";
import People from "./pages/People";
import Context from "./pages/Context";
import PersonProfile from "./pages/PersonProfile";
import PivotalThinking from "./pages/PivotalThinking";
import ContentLibrary from "./pages/ContentLibrary";
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
import ArticleForm from "./pages/admin/ArticleForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/people" element={<People />} />
            <Route path="/about/context" element={<Context />} />
            <Route path="/about/people/:slug" element={<PersonProfile />} />
            <Route path="/capabilities/pivotal-thinking" element={<PivotalThinking />} />
            <Route path="/capabilities/pivotal-thinking/content-library" element={<ContentLibrary />} />
            <Route path="/capabilities/strategic-counsel" element={<StrategicCounsel />} />
            <Route path="/capabilities/strategic-counsel/growth-and-prosperity" element={<GrowthAndProsperity />} />
            <Route path="/capabilities/strategic-counsel/securing-sovereignty" element={<SecuringSovereignty />} />
            <Route path="/capabilities/strategic-counsel/mobilising-transition" element={<MobilisingTransition />} />
            <Route path="/capabilities/programmes" element={<SystemicIntervention />} />
            <Route path="/capabilities/experience" element={<Experience />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/articles/new" element={<ArticleForm />} />
            <Route path="/admin/articles/edit/:id" element={<ArticleForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
