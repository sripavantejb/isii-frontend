import { Link } from "react-router-dom";

interface PersonCardProps {
  name: string;
  title: string;
  image?: string;
  slug?: string;
}

const PersonCard = ({ name, title, image, slug }: PersonCardProps) => {
  const CardContent = () => (
    <div className="bg-white flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105">
      {/* Square Headshot */}
      <div className="w-full aspect-square mb-4 overflow-hidden bg-muted">
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
      <h3 className="font-serif text-xl md:text-2xl text-primary font-bold mb-2">{name}</h3>
      
      {/* Title */}
      <p className="text-sm md:text-base text-muted-foreground">
        {title}
      </p>
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
