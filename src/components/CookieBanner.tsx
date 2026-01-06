import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie_consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy text-white border-t border-navy shadow-lg">
      <div className="container-custom section-padding py-4 md:py-6">
        <div className="flex flex-col gap-4">
          {/* Text Content */}
          <div>
            <p className="text-sm md:text-base text-white leading-relaxed">
              This website uses cookies to ensure you receive the best experience. By clicking "Accept" you are agreeing to our cookie policy. You can change your cookie setting at any time and read how we use them in our{" "}
              <Link 
                to="/privacy-policy" 
                className="text-white underline hover:text-white/80 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={handleAccept}
              className="whitespace-nowrap text-white border-white hover:bg-white/10 hover:border-white/80"
            >
              Accept
            </Button>
            <Link 
              to="/privacy-policy"
              className="text-sm text-white underline hover:text-white/80 transition-colors whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

