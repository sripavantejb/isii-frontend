import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Accent line */}
      <div className="h-1" style={{ backgroundColor: '#d6795a' }} />
      
      <div className="container-custom section-padding py-12 relative">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Logo on the left */}
          <div className="flex-shrink-0 z-10">
            <Logo variant="light" />
          </div>
          
          {/* Copyright on the right */}
          <div className="flex-shrink-0 z-10">
            <p className="text-sm text-primary-foreground/60">
              © 2025 ISII. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Mobile Layout - Centered */}
        <div className="md:hidden flex flex-col items-center">
          {/* Logo centered at top */}
          <div className="mb-6">
            <Logo variant="light" />
          </div>
          
          {/* Copyright centered at bottom */}
          <p className="text-sm text-primary-foreground/60">
            © 2025 ISII. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
