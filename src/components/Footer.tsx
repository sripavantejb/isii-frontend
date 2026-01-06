import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  const leftColumnLinks = [
    { label: "Home", path: "/" },
    { label: "Mission", path: "/about/mission" },
    { label: "People", path: "/about/people" },
    { label: "Contact Us", path: "mailto:test@gmail.com", isExternal: true },
  ];

  const rightColumnLinks = [
    { label: "Pivotal Thinking", path: "/capabilities/pivotal-thinking" },
    { label: "Strategic Counsel", path: "/capabilities/strategic-counsel" },
    { label: "Systemic Investments", path: "/capabilities/systemic-intervention" },
    { label: "Experience", path: "/capabilities/experience" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Accent line */}
      <div className="h-1" style={{ backgroundColor: '#d6795a' }} />
      
      <div className="container-custom section-padding py-12 relative">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-start justify-between mb-8">
            {/* Logo on the left */}
            <div className="flex-shrink-0 z-10 flex flex-col">
              <Logo variant="light" />
              <p className="text-xs text-white mt-1 font-sans">Part of Force For Good Group</p>
            </div>
            
            {/* Navigation Links - 3-3 Layout - Centered */}
            <div className="flex gap-16 z-10 absolute left-1/2 transform -translate-x-1/2">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {leftColumnLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {rightColumnLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Spacer to balance layout */}
            <div className="flex-shrink-0 w-[120px]"></div>
          </div>
          
          {/* Copyright */}
          <div className="flex justify-end">
            <p className="text-sm text-primary-foreground/60">
              © 2026 ISII. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Mobile Layout - Centered */}
        <div className="md:hidden flex flex-col items-center">
          {/* Logo centered at top */}
          <div className="mb-8 flex flex-col items-center">
            <Logo variant="light" />
            <p className="text-xs text-white mt-1 font-sans">Part of Force For Good Group</p>
          </div>
          
          {/* Navigation Links - Stacked */}
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Left Column Links */}
            <div className="flex flex-col items-center gap-4">
              {leftColumnLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Right Column Links */}
            <div className="flex flex-col items-center gap-4">
              {rightColumnLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Copyright centered at bottom */}
          <p className="text-sm text-primary-foreground/60">
            © 2026 ISII. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
