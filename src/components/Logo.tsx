const Logo = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  const textColor = variant === "light" ? "text-primary-foreground" : "text-primary";
  const logoImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1766555222/Frame_qsaw3j.png";
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <img 
          src={logoImage} 
          alt="ISII Logo" 
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className={`${textColor}`}>
        <div className="font-serif text-lg font-bold leading-tight">ISII</div>
        <div className="text-[10px] leading-tight tracking-wider uppercase opacity-80">
          Institute for<br />
          Strategic Intelligence<br />
          and Intervention
        </div>
      </div>
    </div>
  );
};

export default Logo;
