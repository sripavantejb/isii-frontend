interface ProjectCardProps {
  number: number;
  title: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
}

const ProjectCard = ({ number, title, description, buttonLink = "#", buttonText = "Learn More" }: ProjectCardProps) => {
  return (
    <div style={{ backgroundColor: '#ffffff' }} className="rounded-lg p-8 md:p-10 relative shadow-sm flex flex-col h-full">
      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Title and Description - inline bold title with regular description */}
        <p className="text-base md:text-lg leading-relaxed font-sans" style={{ color: '#040750' }}>
          <span className="font-bold">{title}</span> {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;

