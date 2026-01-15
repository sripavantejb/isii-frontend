import { Link } from "react-router-dom";

interface PersonCardProps {
  name: string;
  title: string;
  image?: string;
  slug?: string;
  roleTitle?: string;
}

const PersonCard = ({ name, title, image, slug, roleTitle }: PersonCardProps) => {
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
      <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-primary font-bold mb-2 flex-shrink-0">{name}</h3>
      
      {/* Role Title - Bold, smaller font than name */}
      {roleTitle && (
        <p className="font-serif text-sm md:text-base text-primary font-bold mb-3 md:mb-4 flex-shrink-0">{roleTitle}</p>
      )}
      
      {/* Title - Show all lines with fixed min-height */}
      <div className="text-xs md:text-sm text-muted-foreground min-h-[80px] flex flex-col justify-start w-full">
        {title.split('\n').map((line, index, array) => (
          <div key={index}>
            <p className={index > 0 ? 'mt-1' : ''}>{line}</p>
            {index < array.length - 1 && (
              <hr className="border-gray-300 my-2 w-full" />
            )}
          </div>
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
