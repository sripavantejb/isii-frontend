import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import SEOHead from "@/components/SEOHead";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const canonical =
    location.pathname.startsWith("/admin")
      ? undefined
      : `https://www.isii.global${location.pathname === "/" ? "/" : location.pathname}`;

  return (
    <div className="min-h-screen flex flex-col">
      {canonical ? <SEOHead canonical={canonical} /> : null}
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
