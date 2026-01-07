interface EngagementCardProps {
  title: string;
  description: string;
}

const EngagementCard = ({ title, description }: EngagementCardProps) => {
  return (
    <div className="bg-card p-6 border-l-4 border-l-accent border-t border-r border-b border-border animate-fade-in transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1">
      <h3 className="font-serif text-xl font-bold text-primary mb-3">{title}</h3>
      
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default EngagementCard;


// Systemic Intervention and Strategic Investment => ISII Labs 