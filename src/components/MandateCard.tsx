import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MandateCardProps {
  image: string;
  title: string | ReactNode;
  description: string;
  buttonLink?: string;
}

const MandateCard = ({ image, title, description, buttonLink = "#" }: MandateCardProps) => {
  // Get string version of title for alt text
  const titleText = typeof title === 'string' ? title : 'Mandate card';
  
  return (
    <Link
      to={buttonLink}
      className="block bg-card border border-border rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 no-underline"
    >
      {/* Image at top */}
      <div className="aspect-[16/9] bg-muted overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={titleText}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        {/* Title - bold dark blue */}
        <h3 className="font-sans text-base md:text-lg text-primary mb-4 md:mb-6 leading-tight">
          {title}
        </h3>
        
        {/* Description - only show if provided */}
        {description && (
          <p className="text-muted-foreground text-sm flex-1 mb-4 md:mb-6 leading-relaxed font-sans">
            {description}
          </p>
        )}
        
        {/* Button at bottom - dark blue with white text - styled as button but card is already clickable */}
        <div className="mt-auto">
          <div className="w-full rounded-md font-sans font-medium text-sm md:text-base bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Know More
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MandateCard;

