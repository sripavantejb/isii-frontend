import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CapabilityCard = ({ icon: Icon, title, description, buttonText, buttonLink }: CapabilityCardProps) => {
  return (
    <div
      className="bg-card border border-border rounded-none shadow-sm p-4 md:p-6 flex flex-col h-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1"
      style={{ backgroundColor: '#e8e7e7' }}
    >
      {/* Icon at top center with light gray background */}
      <div className="mb-4 md:mb-6 flex justify-center">
        <div className="w-16 h-16 bg-muted rounded-none flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" strokeWidth={2} fill="none" />
        </div>
      </div>
      
      {/* Title - bold dark blue sans-serif */}
      <h3 className="font-sans text-xl font-bold text-primary mb-3 md:mb-4 text-center leading-tight">
        {title}
      </h3>
      
      {/* Description - lighter gray sans-serif */}
      <p className="text-muted-foreground text-sm flex-1 mb-4 md:mb-6 text-center leading-relaxed font-sans">
        {description}
      </p>
      
      {/* Button at bottom - dark blue with white text, uppercase */}
      <div className="mt-auto">
        <Button variant="default" className="w-full rounded-none font-sans font-medium" asChild>
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default CapabilityCard;
