import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  number: number;
  title: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
}

const ProjectCard = ({ number, title, description, buttonLink = "#", buttonText = "LEARN MORE" }: ProjectCardProps) => {
  return (
    <div style={{ backgroundColor: '#ffffff' }} className="rounded-lg p-8 md:p-10 relative shadow-sm flex flex-col h-full">
      {/* Numbered circle with border outline in top-left */}
      <div 
        className="absolute top-8 left-8 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl border-2"
        style={{ 
          borderColor: '#1b315b',
          color: '#1b315b',
          backgroundColor: 'transparent'
        }}
      >
        {number}
      </div>
      
      {/* Content */}
      <div className="pt-20 md:pt-24 flex flex-col flex-grow">
        {/* Title - bold navy */}
        <h3 className="font-sans text-xl md:text-2xl font-bold mb-3 leading-tight" style={{ color: '#1b315b' }}>
          {title}
        </h3>
        
        {/* Description - regular weight navy */}
        <p className="text-base md:text-lg leading-relaxed font-sans font-normal mb-6 flex-1" style={{ color: '#1b315b' }}>
          {description}
        </p>
        
        {/* Button at bottom */}
        <div className="mt-auto">
          <Button variant="default" className="w-full rounded-md font-sans font-medium text-sm md:text-base uppercase" asChild>
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

