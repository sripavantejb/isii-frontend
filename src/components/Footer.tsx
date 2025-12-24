import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  const footerLinks = [
    { label: "About Us", path: "/about" },
    { label: "Capabilities", path: "/capabilities/pivotal-thinking" },
    { label: "Engage", path: "/engage" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Accent line */}
      <div className="h-1" style={{ backgroundColor: '#d6795a' }} />
      
      <div className="container-custom section-padding py-12">
        <div className="flex items-center justify-between relative">
          {/* Logo on the left */}
          <div className="flex-shrink-0 z-10">
            <Logo variant="light" />
          </div>
          
          {/* Navigation links in the center */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors no-underline hover:no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Copyright on the right */}
          <div className="flex-shrink-0 z-10">
            <p className="text-sm text-primary-foreground/60">
              © 2025 ISII. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Mobile navigation - centered below */}
        <nav className="md:hidden flex items-center justify-center gap-8 mt-8">
          {footerLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
