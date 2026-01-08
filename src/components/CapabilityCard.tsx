import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CapabilityCardProps {
  icon?: LucideIcon;
  image?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CapabilityCard = ({ icon: Icon, image, title, description, buttonText, buttonLink }: CapabilityCardProps) => {
  return (
    <Link
      to={buttonLink}
      className="block bg-card border border-border overflow-hidden group animate-fade-in h-full flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 rounded-none no-underline"
      style={{ backgroundColor: '#f1f1f1' }}
    >
      {/* Full-width image at top with aspect ratio matching ArticleCard */}
      {image ? (
        <div className="aspect-[16/9] bg-muted overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : Icon ? (
        <div className="aspect-[16/9] bg-muted overflow-hidden flex-shrink-0 flex items-center justify-center">
          <Icon className="w-16 h-16 text-primary" strokeWidth={2} fill="none" />
        </div>
      ) : null}
      
      {/* Content section with padding matching ArticleCard */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title - bold dark blue */}
        <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-4 leading-snug">
          {title}
          
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
          {description}
        </p>
        
        {/* Button at bottom - styled as button but card is already clickable */}
        <div className="mt-auto">
          <div className="w-full rounded-none font-sans font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            {buttonText}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CapabilityCard;
