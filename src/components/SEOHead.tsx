import { useEffect } from 'react';

interface SEOHeadProps {
  robots?: string;
  title?: string;
  description?: string;
  ogUrl?: string;
  twitterUrl?: string;
}

const SEOHead = ({ robots, title, description, ogUrl, twitterUrl }: SEOHeadProps) => {
  useEffect(() => {
    // Handle robots meta tag
    if (robots) {
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', robots);
    }

    // Handle title
    if (title) {
      document.title = title;
    }

    // Handle description meta tag
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', description);
    }

    // Handle og:url meta tag
    if (ogUrl) {
      let ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (!ogUrlMeta) {
        ogUrlMeta = document.createElement('meta');
        ogUrlMeta.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrlMeta);
      }
      ogUrlMeta.setAttribute('content', ogUrl);
    }

    // Handle twitter:url meta tag
    if (twitterUrl) {
      let twitterUrlMeta = document.querySelector('meta[name="twitter:url"]');
      if (!twitterUrlMeta) {
        twitterUrlMeta = document.createElement('meta');
        twitterUrlMeta.setAttribute('name', 'twitter:url');
        document.head.appendChild(twitterUrlMeta);
      }
      twitterUrlMeta.setAttribute('content', twitterUrl);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove the meta tags on cleanup to avoid flickering
      // The next page will set its own values
    };
  }, [robots, title, description, ogUrl, twitterUrl]);

  return null;
};

export default SEOHead;

