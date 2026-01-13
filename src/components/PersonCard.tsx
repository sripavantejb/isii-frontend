import { Link } from "react-router-dom";

interface PersonCardProps {
  name: string;
  title: string;
  image?: string;
  slug?: string;
}

const PersonCard = ({ name, title, image, slug }: PersonCardProps) => {
  const CardContent = () => (
    <div className="bg-white flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 h-full p-4 md:p-6">
      {/* Square Headshot */}
      <div className="w-full aspect-square mb-5 md:mb-6 overflow-hidden bg-muted flex-shrink-0">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground/40 text-xs">photo</span>
          </div>
        )}
      </div>
      
      {/* Name */}
      <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-primary font-bold mb-3 md:mb-4 flex-shrink-0">{name}</h3>
      
      {/* Title - Show all lines with fixed min-height */}
      <div className="text-sm md:text-base text-muted-foreground min-h-[80px] flex flex-col justify-start">
        {title.split('\n').map((line, index) => (
          <p key={index} className={index > 0 ? 'mt-1' : ''}>{line}</p>
        ))}
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link to={`/about/people/${slug}`} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default PersonCard;
