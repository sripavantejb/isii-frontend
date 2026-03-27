interface NewsCardProps {
  image: string;
  title: string;
  description: string;
  articleURL: string;
}

const NewsCard = ({
  image,
  title,
  description,
  articleURL,
}: NewsCardProps) => {
  return (
    <article className="flex h-full flex-col">
      <div className="aspect-[16/10] shrink-0 overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      <div className="pt-5">
        <h3
          className="overflow-hidden text-[16px] font-semibold leading-[1.4] text-[#1B1B1B] md:text-[20px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </h3>
        <p
          className="overflow-hidden pt-4 text-[12px] leading-[1.65] text-[#414141] md:text-[16px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 9,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
        <a
          href={articleURL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-fit pt-5 text-[16px] font-semibold leading-none text-primary underline underline-offset-8 decoration-[1px] transition-colors hover:text-primary/80"
        >
          Read More
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
