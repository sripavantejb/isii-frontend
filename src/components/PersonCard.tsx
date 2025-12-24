interface PersonCardProps {
  category: string;
  name: string;
  title: string;
  description: string;
  drawingOn?: string[];
  image?: string;
}

const PersonCard = ({ category, name, title, description, drawingOn, image }: PersonCardProps) => {
  return (
    <div className="relative pt-20">
      {/* Photo - half above, half inside */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-card bg-muted">
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
      </div>

      {/* Card Content */}
      <div className="bg-card pt-20 pb-6 px-6 border-l-4 border-t border-r border-b border-border animate-fade-in h-full flex flex-col" style={{ borderLeftColor: '#d6795a' }}>
        <p className="text-xs text-accent font-medium uppercase tracking-wider mb-3">
          {category}
        </p>
        
        <h3 className="font-serif text-xl text-primary mb-2">{name}</h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          {title}
        </p>
        
        <p className="text-sm text-accent mb-4">
          {description}
        </p>
        
        {drawingOn && drawingOn.length > 0 && (
          <div className="mt-auto">
            <p className="text-xs text-muted-foreground font-medium mb-2">Drawing on:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              {drawingOn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
