import { useEffect } from 'react';

interface SEOHeadProps {
  robots?: string;
  title?: string;
  description?: string;
}

const SEOHead = ({ robots, title, description }: SEOHeadProps) => {
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

    // Cleanup function
    return () => {
      // Note: We don't remove the meta tags on cleanup to avoid flickering
      // The next page will set its own values
    };
  }, [robots, title, description]);

  return null;
};

export default SEOHead;

