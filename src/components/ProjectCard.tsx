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
      <div className="pt-16 md:pt-20 flex flex-col flex-grow">
        {/* Title and Description - inline bold title with regular description */}
        <p className="text-base md:text-lg leading-relaxed font-sans" style={{ color: '#1b315b' }}>
          <span className="font-bold">{title}</span> {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;

