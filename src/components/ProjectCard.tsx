import { Link } from "react-router-dom";

interface ProjectCardProps {
  number: number;
  title: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
}

const ProjectCard = ({ number, title, description, buttonLink = "#", buttonText = "Learn More" }: ProjectCardProps) => {
  return (
    <Link
      to={buttonLink}
      className="block rounded-lg p-8 md:p-10 relative shadow-sm flex flex-col h-full no-underline transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:-translate-y-1"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Title and Description - inline bold title with regular description */}
        <p className="text-base md:text-lg leading-relaxed font-sans" style={{ color: '#040750' }}>
          <span className="font-bold">{title}</span> {description}
        </p>
        {/* Visual indicator for clickability */}
        <div className="mt-4 text-sm font-medium" style={{ color: '#040750' }}>
          {buttonText} →
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

