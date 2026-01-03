import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  image: string;
  date: string;
  title: string;
  link: string;
}

const ArticleCard = ({ image, date, title, link }: ArticleCardProps) => {
  // Truncate title to 60 characters
  const truncatedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;

  return (
    <div className="bg-card border border-border overflow-hidden group animate-fade-in h-full flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className="aspect-[16/9] bg-muted overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs italic text-muted-foreground mb-2">{date}</p>
        <h3 className="font-serif text-sm font-bold text-primary mb-4 leading-snug flex-grow line-clamp-3">
          {truncatedTitle}
        </h3>
        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-auto"
          >
            Read more <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
