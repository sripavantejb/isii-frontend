import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
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
  
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { 
      label: "Capabilities", 
      path: "/capabilities",
      dropdown: [
        { label: "Pivotal Thinking", path: "/capabilities/pivotal-thinking" },
        { label: "Strategic Counsel", path: "/capabilities/strategic-counsel" },
        { label: "Systemic Intervention", path: "/capabilities/systemic-intervention" },
      ]
    },
    { label: "Engage", path: "/engage" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const bgClass = variant === "transparent" 
    ? "bg-primary" 
    : "bg-primary";

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top bar */}
      <div className="text-primary-foreground text-xs py-1" style={{ backgroundColor: '#224077' }}>
        <div className="container-custom section-padding flex justify-end">
          <span className="text-primary-foreground/80">
            Need to get in touch with us?{" "}
            <Link to="/engage" className="no-underline">
              Contact us here
            </Link>
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className={`${bgClass} py-2`}>
        <div className="container-custom section-padding flex items-center justify-between">
          <Link to="/">
            <Logo variant="light" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.path}>
                  <DropdownMenuTrigger className={`flex items-center gap-1 text-sm text-primary-foreground/80 transition-colors no-underline hover:no-underline border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0 bg-transparent hover:bg-transparent focus:bg-transparent ${isActive(item.path) ? "text-primary-foreground font-medium" : ""}`}>
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.path} asChild className="focus:bg-transparent hover:bg-transparent focus:text-foreground/80">
                        <Link to={subItem.path} className="cursor-pointer text-foreground/80 no-underline">
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
                  className={`text-sm text-primary-foreground/80 transition-colors no-underline hover:no-underline ${isActive(item.path) ? "text-primary-foreground font-medium" : ""}`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Button variant="outline-light" size="sm" asChild>
              <Link to="/engage">Contact us</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/20">
            <nav className="container-custom section-padding py-4 flex flex-col">
              {navItems.map((item) => (
                item.dropdown ? (
                  <Collapsible 
                    key={item.path} 
                    open={capabilitiesOpen} 
                    onOpenChange={setCapabilitiesOpen}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-primary-foreground/80 transition-colors border-b border-primary-foreground/10 no-underline hover:no-underline">
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${capabilitiesOpen ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block py-3 text-primary-foreground/70 transition-colors no-underline hover:no-underline"
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
                    className={`py-3 text-primary-foreground/80 transition-colors border-b border-primary-foreground/10 no-underline hover:no-underline ${isActive(item.path) ? "text-primary-foreground font-medium" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
