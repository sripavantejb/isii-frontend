import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  const leftColumnLinks = [
    { label: "Home", path: "/" },
    { label: "Mission and Purpose", path: "/about/mission" },
    { label: "People", path: "/about/people" },
    { label: "Contact Us", path: "mailto:lesley.whittle@forcegood.org", isExternal: true },
    { label: "Privacy Policy", path: "/privacy-policy" },
  ];

  const rightColumnLinks = [
    { label: "Pivotal Thinking", path: "/capabilities/pivotal-thinking" },
    // { label: "Perspectives", path: "/capabilities/perspectives" },
    { label: "Strategic Counsel", path: "/capabilities/strategic-counsel" },
    { label: "Programmes & Interventions", path: "/capabilities/programmes" },
    { label: "Projects and Intervention", path: "/capabilities/projects-and-intervention" },
    { label: "Press & News", path: "/press-and-news" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative">
      <div className="container-custom section-padding pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="hidden md:block">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-shrink-0 flex flex-col">
              <Logo variant="light" />
              <p className="text-sm text-white mt-3 font-sans font-bold">The Institute for Strategic Intelligence and Intervention is an initiative of the F4G Group.</p>
            </div>
            
            <div className="flex gap-16 flex-1 justify-end">
              <div className="flex flex-col gap-4">
                {leftColumnLinks.map((link) => 
                  link.isExternal ? (
                    <a key={link.path} href={link.path} className="text-sm text-white hover:text-white/80 transition-colors no-underline">{link.label}</a>
                  ) : (
                    <Link key={link.path} to={link.path} className="text-sm text-white hover:text-white/80 transition-colors no-underline">{link.label}</Link>
                  )
                )}
              </div>
              <div className="flex flex-col gap-4">
                {rightColumnLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="text-sm text-white hover:text-white/80 transition-colors no-underline">{link.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mb-6"></div>
          <div className="flex justify-center">
            <p className="text-sm text-white/60">© 2026 ISII. All Rights Reserved.</p>
          </div>
        </div>
        
        <div className="md:hidden">
          <div className="mb-6 flex flex-col">
            <Logo variant="light" />
            <p className="text-sm text-white mt-3 font-sans font-bold">The Institute for Strategic Intelligence and Intervention is an initiative of the F4G Group.</p>
          </div>
          <div className="flex gap-8 sm:gap-12 mb-6">
            <div className="flex flex-col gap-3 sm:gap-4 flex-1">
              {leftColumnLinks.map((link) => 
                link.isExternal ? (
                  <a key={link.path} href={link.path} className="text-sm text-white hover:text-white/80 transition-colors no-underline">{link.label}</a>
                ) : (
                  <Link key={link.path} to={link.path} className="text-sm text-white hover:text-white/80 transition-colors no-underline">{link.label}</Link>
                )
              )}
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 flex-1">
              {rightColumnLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white hover:text-white/80 transition-colors no-underline">{link.label}</Link>
              ))}
            </div>
          </div>
          <div className="border-t border-white/20 w-full mb-6"></div>
          <p className="text-sm text-white/60 text-center">© 2025 ISII. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
