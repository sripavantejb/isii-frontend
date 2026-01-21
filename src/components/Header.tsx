import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import SearchComponent from "@/components/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface HeaderProps {
  variant?: "transparent" | "solid";
}

const Header = ({ variant = "solid" }: HeaderProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const navItems = [
    { label: "Home", path: "/" },
    { 
      label: "About Us", 
      path: "/about/mission",
      dropdown: [
        { label: "Mission", path: "/about/mission" },
        { label: "People", path: "/about/people" },
      ]
    },
    { 
      label: "Capabilities", 
      path: "/capabilities/pivotal-thinking",
      dropdown: [
        { label: "Pivotal Thinking", path: "/capabilities/pivotal-thinking" },
        { label: "Strategic Counsel", path: "/capabilities/strategic-counsel" },
        { label: "Programmes", path: "/capabilities/programmes" },
        { label: "Projects and Intervention", path: "/capabilities/experience" },
      ]
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isAboutUsActive = () => {
    return location.pathname.startsWith("/about");
  };

  const bgClass = variant === "transparent" 
    ? "bg-white" 
    : "bg-white";

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Main header */}
      <div className={`${bgClass} py-4 border-b border-border`}>
        <div className="container-custom section-padding flex items-center justify-between">
          <Link to="/">
            <Logo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.path}>
                  <DropdownMenuTrigger className={`flex items-center gap-1 text-sm text-foreground font-semibold transition-colors no-underline hover:no-underline border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0 bg-transparent hover:bg-transparent focus:bg-transparent ${(item.label === "About Us" ? isAboutUsActive() : isActive(item.path)) ? "text-foreground font-medium" : ""}`}>
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.path} asChild className="focus:bg-transparent hover:bg-transparent focus:text-foreground">
                        <Link to={subItem.path} className="cursor-pointer text-foreground no-underline font-semibold">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm text-foreground font-semibold transition-colors no-underline hover:no-underline ${isActive(item.path) ? "text-foreground font-medium" : ""}`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Button variant="default" size="sm" asChild className="bg-transparent border-0 shadow-none px-0 text-foreground hover:bg-transparent hover:text-foreground font-semibold text-sm tracking-normal">
              <a href="mailto:lesley.whittle@forcegood.org">Contact Us</a>
            </Button>
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground hover:text-foreground/80 transition-colors p-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="container-custom section-padding py-4 flex flex-col">
              {navItems.map((item, index) => (
                item.dropdown ? (
                  <Collapsible 
                    key={item.path} 
                    open={item.label === "About Us" ? aboutUsOpen : capabilitiesOpen} 
                    onOpenChange={item.label === "About Us" ? setAboutUsOpen : setCapabilitiesOpen}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-primary font-semibold transition-colors border-b border-border no-underline hover:no-underline">
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${(item.label === "About Us" ? aboutUsOpen : capabilitiesOpen) ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block py-3 text-primary transition-colors no-underline hover:no-underline font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`py-3 text-primary font-semibold transition-colors ${index === navItems.length - 1 ? '' : 'border-b border-border'} no-underline hover:no-underline ${isActive(item.path) ? "text-primary font-medium" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              {/* Search for Mobile */}
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-3 text-primary font-semibold transition-colors border-t border-border text-left"
              >
                Search
              </button>
              {/* Contact Us for Mobile */}
              <a
                href="mailto:lesley.whittle@forcegood.org"
                className="py-3 text-primary font-semibold transition-colors border-t border-border no-underline hover:no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>
      
      {/* Search Component */}
      <SearchComponent isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
