const ParticipationBanner = () => {
  const iconUrl = "https://res.cloudinary.com/dqataciy5/image/upload/v1767882344/Frame_1707483199_ywq4kx.png";

  return (
    <div className="w-full flex justify-center bg-background py-6">
      <div 
        className="inline-flex items-center"
        style={{
          border: '1px solid #e5e7eb', // Light gray border
          borderRadius: '0',
          backgroundColor: '#ffffff',
          padding: '24px',
          gap: '16px',
        }}
      >
        <img 
          src={iconUrl}
          alt="Participation icon"
          className="flex-shrink-0"
          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
        />
        <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-normal">
          Participation is open for nations, blocs, institutions and major enterprises.{' '}
          <a 
            href="mailto:lesley.whittle@forcegood.org" 
            className="font-bold underline text-foreground hover:text-primary transition-colors"
            style={{ color: 'inherit' }}
          >
            Contact us
          </a>
          {' '}to learn more.
        </p>
      </div>
    </div>
  );
};

export default ParticipationBanner;

