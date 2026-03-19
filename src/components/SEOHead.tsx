import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SEO_CONFIG } from "@/seoConfig";

interface SEOHeadProps {
  robots?: string;
}

const normalizePath = (pathname: string) => {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

const SEOHead = ({ robots }: SEOHeadProps) => {
  const location = useLocation();
  const path = normalizePath(location.pathname);
  const seo = SEO_CONFIG[path];

  const canonicalPath = seo?.canonicalPath || path;
  const canonical =
    seo && typeof window !== "undefined"
      ? `${window.location.origin}${canonicalPath}`
      : undefined;

  if (!seo && !robots) {
    return null;
  }

  return (
    <Helmet>
      {seo?.title ? <title>{seo.title}</title> : null}
      {seo?.description ? (
        <meta name="description" content={seo.description} />
      ) : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {robots ? <meta name="robots" content={robots} /> : null}
    </Helmet>
  );
};

export default SEOHead;

