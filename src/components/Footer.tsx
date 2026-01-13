import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  const leftColumnLinks = [
    { label: "Home", path: "/" },
    { label: "Mission", path: "/about/mission" },
    { label: "People", path: "/about/people" },
    { label: "Contact Us", path: "mailto:lesley.whittle@forcegood.org", isExternal: true },
  ];

  const rightColumnLinks = [
    { label: "Pivotal Thinking", path: "/capabilities/pivotal-thinking" },
    { label: "Strategic Counsel", path: "/capabilities/strategic-counsel" },
    { label: "Programmes", path: "/capabilities/programmes" },
    { label: "Experience", path: "/capabilities/experience" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Accent line */}
      <div className="h-1" style={{ backgroundColor: '#d6795a' }} />
      
      <div className="container-custom section-padding py-12">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-start justify-between mb-8">
            {/* Logo on the left */}
            <div className="flex-shrink-0 flex flex-col">
              <Logo variant="light" />
              <p className="text-sm text-white mt-3 font-sans font-bold">Part of the Force For Good Group</p>
            </div>
            
            {/* Navigation Links - Two Columns in the middle */}
            <div className="flex gap-16 flex-1 justify-end">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {leftColumnLinks.map((link) => 
                  link.isExternal ? (
                    <a
                      key={link.path}
                      href={link.path}
                      className="text-sm text-white hover:text-white/80 transition-colors no-underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-sm text-white hover:text-white/80 transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {rightColumnLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-white hover:text-white/80 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Separator Line */}
          <div className="border-t border-white/20 mb-6"></div>
          
          {/* Copyright */}
          <div className="flex justify-center">
            <p className="text-sm text-white/60">
              © 2026 ISII. All Rights Reserved.
            </p>
          </div>
        </div>
        
        {/* Mobile Layout - Centered */}
        <div className="md:hidden flex flex-col items-center">
          {/* Logo centered at top */}
          <div className="mb-8 flex flex-col items-center">
            <Logo variant="light" />
            <p className="text-sm text-white mt-3 font-sans font-bold">Part of The Force For Good Group</p>
          </div>
          
          {/* Navigation Links - Stacked */}
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Left Column Links */}
            <div className="flex flex-col items-center gap-4">
              {leftColumnLinks.map((link) => 
                link.isExternal ? (
                  <a
                    key={link.path}
                    href={link.path}
                    className="text-sm text-white hover:text-white/80 transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-white hover:text-white/80 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            
            {/* Right Column Links */}
            <div className="flex flex-col items-center gap-4">
              {rightColumnLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white hover:text-white/80 transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Separator Line */}
          <div className="border-t border-white/20 w-full mb-6"></div>
          
          {/* Copyright centered at bottom */}
          <p className="text-sm text-white/60 text-center">
            © 2025 ISII. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
